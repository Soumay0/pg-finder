#!/usr/bin/env node

/**
 * MongoDB Connection Verification Script
 * Run this to verify your MongoDB Atlas credentials before starting the server
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  console.log('\n🔍 MongoDB Connection Verification\n');
  console.log('=' .repeat(50));
  
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.error('❌ MONGODB_URI not found in .env file');
    console.log('\n📝 Expected format:');
    console.log('   mongodb+srv://username:password@cluster.mongodb.net/database');
    process.exit(1);
  }

  // Sanitize for logging
  const sanitized = mongoUri.replace(/:[^:@]*@/, ':****@');
  console.log(`\n📍 Testing connection to:\n   ${sanitized}\n`);

  try {
    console.log('⏳ Connecting...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('\n✅ CONNECTION SUCCESSFUL!\n');
    console.log('Database:', conn.connection.db.databaseName);
    console.log('Host:', conn.connection.host);
    console.log('State:', conn.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    
    await mongoose.connection.close();
    console.log('\n✨ You can now start the backend server:\n   npm start\n');
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED\n');
    console.error('Error:', error.message);
    
    console.log('\n📋 Common Issues & Solutions:\n');
    
    if (error.message.includes('authentication failed')) {
      console.log('  🔐 Authentication Error:');
      console.log('     - Check username is correct');
      console.log('     - Check password is correct');
      console.log('     - Special chars must be URL encoded (@ → %40, # → %23, etc)');
      console.log('     - Example: password "Luckey@1123" → "Luckey%401123"\n');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('  🌐 Connection Error:');
      console.log('     - Check internet connection');
      console.log('     - Verify cluster hostname is correct');
      console.log('     - Check if MongoDB service is running\n');
    }
    
    if (error.message.includes('TIMEOUT') || error.message.includes('timeout')) {
      console.log('  ⏱️  Timeout Error:');
      console.log('     - Your IP might not be whitelisted in MongoDB Atlas');
      console.log('     - Go to: https://cloud.mongodb.com > Network Access');
      console.log('     - Add your current IP or 0.0.0.0/0 for development\n');
    }
    
    console.log('\n🔗 Get correct connection string:');
    console.log('   1. Visit https://cloud.mongodb.com');
    console.log('   2. Select your cluster');
    console.log('   3. Click "Connect" button');
    console.log('   4. Select "Drivers"');
    console.log('   5. Choose "Node.js" and copy the connection string');
    console.log('   6. Paste into .env MONGODB_URI variable\n');
    
    process.exit(1);
  }
};

testConnection();
