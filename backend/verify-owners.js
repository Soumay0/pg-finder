#!/usr/bin/env node

/**
 * Verification Script - Check Owner Accounts
 * Run: node verify-owners.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import connectDB from './src/config/db.js';

dotenv.config();

const verifyOwners = async () => {
  try {
    await connectDB();

    console.log('\n📋 Checking Owner Accounts...\n');

    // Get all owners
    const owners = await User.find({ role: 'owner' }).select('-password');
    
    console.log(`✅ Found ${owners.length} owner account(s):\n`);
    
    owners.forEach((owner, index) => {
      console.log(`${index + 1}. ${owner.name}`);
      console.log(`   Email: ${owner.email}`);
      console.log(`   Approved: ${owner.isApproved ? '✅ YES' : '❌ NO'}`);
      console.log(`   Created: ${new Date(owner.createdAt).toLocaleString()}`);
      console.log('');
    });

    if (owners.length === 0) {
      console.log('⚠️  No owner accounts found. Please register as owner first!\n');
    } else {
      const pending = owners.filter(o => !o.isApproved).length;
      const approved = owners.filter(o => o.isApproved).length;
      console.log(`📊 Summary: ${pending} pending, ${approved} approved\n`);
    }

    // Get superadmin
    const superadmin = await User.findOne({ role: 'superadmin'}).select('-password');
    if (superadmin) {
      console.log('✅ SuperAdmin Account:');
      console.log(`   Email: ${superadmin.email}`);
      console.log(`   Approved: ${superadmin.isApproved ? '✅ YES' : '❌ NO'}\n`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

verifyOwners();
