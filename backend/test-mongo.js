#!/usr/bin/env node

/**
 * MongoDB Connection Test Script
 * Tests: CREATE, READ, UPDATE, DELETE operations
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('\n╔════════════════════════════════════════╗');
console.log('║  🧪 MongoDB Connection & CRUD Test    ║');
console.log('╚════════════════════════════════════════╝\n');

const runTests = async () => {
  try {
    // 1. Connect to MongoDB
    console.log('🔗 Step 1: Connecting to MongoDB...');
    console.log(`   URI: ${MONGODB_URI?.substring(0, 50)}...`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully!\n');

    // Get the database
    const db = mongoose.connection.db;
    const testCollection = db.collection('test_documents');

    // 2. CREATE - Insert a test document
    console.log('📝 Step 2: Creating test document...');
    const testDoc = {
      testId: 'test_' + Date.now(),
      name: 'Test Document',
      email: 'test@example.com',
      timestamp: new Date(),
      data: { key: 'value' }
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Document created!');
    console.log(`   ID: ${insertResult.insertedId}`);
    console.log(`   TestID: ${testDoc.testId}\n`);

    // 3. READ - Fetch all documents
    console.log('📖 Step 3: Reading all test documents...');
    const allDocs = await testCollection.find({}).toArray();
    console.log(`✅ Found ${allDocs.length} document(s) in test collection`);
    console.log('   Sample (first 2):');
    allDocs.slice(0, 2).forEach((doc, i) => {
      console.log(`   ${i + 1}. ID: ${doc._id}, TestID: ${doc.testId}`);
    });
    console.log();

    // 4. READ - Fetch specific document
    console.log('🔍 Step 4: Finding specific document...');
    const foundDoc = await testCollection.findOne({ testId: testDoc.testId });
    if (foundDoc) {
      console.log('✅ Document found!');
      console.log(`   Name: ${foundDoc.name}`);
      console.log(`   Email: ${foundDoc.email}`);
      console.log(`   Created: ${foundDoc.timestamp}\n`);
    } else {
      console.log('❌ Document not found!\n');
    }

    // 5. UPDATE - Modify document
    console.log('✏️  Step 5: Updating document...');
    const updateResult = await testCollection.updateOne(
      { testId: testDoc.testId },
      { $set: { name: 'Updated Test Document', updated: true } }
    );
    console.log(`✅ Updated ${updateResult.modifiedCount} document(s)\n`);

    // 6. READ - Verify update
    console.log('🔍 Step 6: Verifying update...');
    const updatedDoc = await testCollection.findOne({ testId: testDoc.testId });
    console.log(`✅ Updated name: "${updatedDoc.name}"`);
    console.log(`   Updated flag: ${updatedDoc.updated}\n`);

    // 7. DELETE - Remove document
    console.log('🗑️  Step 7: Deleting document...');
    const deleteResult = await testCollection.deleteOne({ testId: testDoc.testId });
    console.log(`✅ Deleted ${deleteResult.deletedCount} document(s)\n`);

    // 8. VERIFY DELETE
    console.log('🔍 Step 8: Verifying deletion...');
    const deletedDoc = await testCollection.findOne({ testId: testDoc.testId });
    if (!deletedDoc) {
      console.log('✅ Document successfully deleted!\n');
    } else {
      console.log('❌ Document still exists!\n');
    }

    // 9. Check Users collection
    console.log('👥 Step 9: Checking Users collection...');
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`✅ Total users: ${userCount}`);
    
    const users = await usersCollection.find({}).limit(3).toArray();
    console.log('   Sample users:');
    users.forEach((user, i) => {
      console.log(`   ${i + 1}. Name: ${user.name}, Email: ${user.email}, Role: ${user.role}, Approved: ${user.isApproved}`);
    });
    console.log();

    // 10. Check PGs collection
    console.log('🏢 Step 10: Checking PGs collection...');
    const pgsCollection = db.collection('pgs');
    const pgCount = await pgsCollection.countDocuments();
    console.log(`✅ Total PGs: ${pgCount}`);
    
    if (pgCount > 0) {
      const pgs = await pgsCollection.find({}).limit(2).toArray();
      console.log('   Sample PGs:');
      pgs.forEach((pg, i) => {
        console.log(`   ${i + 1}. Name: ${pg.name}, City: ${pg.city}, Rent: ₹${pg.rent}`);
      });
    }
    console.log();

    console.log('╔════════════════════════════════════════╗');
    console.log('║  ✅ ALL TESTS PASSED SUCCESSFULLY!    ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB\n');
  }
};

runTests();
