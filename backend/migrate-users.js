#!/usr/bin/env node

/**
 * MongoDB Data Migration Script
 * Fixes isApproved field for all users based on their role
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('\n╔════════════════════════════════════════╗');
console.log('║  🔧 MongoDB Data Migration Script     ║');
console.log('╚════════════════════════════════════════╝\n');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Step 1: Check current state
    console.log('📊 Current user states:');
    const allUsers = await usersCollection.find({}).toArray();
    console.log(`   Total: ${allUsers.length}`);
    allUsers.forEach(user => {
      console.log(`   - ${user.name} (${user.email}): role=${user.role}, isApproved=${JSON.stringify(user.isApproved)}`);
    });
    console.log();

    // Step 2: Fix owners with undefined isApproved
    console.log('🔄 Fixing owners with undefined isApproved...');
    const fixOwners = await usersCollection.updateMany(
      { role: 'owner', isApproved: { $exists: false } },
      { $set: { isApproved: false } }
    );
    console.log(`   ✅ Updated ${fixOwners.modifiedCount} owner(s)\n`);

    // Step 3: Ensure students are approved
    console.log('🔄 Ensuring students are approved...');
    const fixStudents = await usersCollection.updateMany(
      { role: 'student', isApproved: { $ne: true } },
      { $set: { isApproved: true } }
    );
    console.log(`   ✅ Updated ${fixStudents.modifiedCount} student(s)\n`);

    // Step 4: Ensure superadmin is approved
    console.log('🔄 Ensuring superadmin is approved...');
    const fixSuperadmin = await usersCollection.updateMany(
      { role: 'superadmin', isApproved: { $ne: true } },
      { $set: { isApproved: true } }
    );
    console.log(`   ✅ Updated ${fixSuperadmin.modifiedCount} superadmin(s)\n`);

    // Step 5: Verify result
    console.log('✅ Final user states:');
    const finalUsers = await usersCollection.find({}).toArray();
    finalUsers.forEach(user => {
      console.log(`   - ${user.name} (${user.email}): role=${user.role}, isApproved=${user.isApproved}`);
    });
    console.log();

    console.log('╔════════════════════════════════════════╗');
    console.log('║  ✅ MIGRATION COMPLETED!              ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB\n');
  }
};

migrate();
