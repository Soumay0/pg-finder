#!/usr/bin/env node

/**
 * Fix Script - Delete and recreate superadmin
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import connectDB from './src/config/db.js';

dotenv.config();

const fixSuperadmin = async () => {
  try {
    await connectDB();

    console.log('\n🔧 Fixing superadmin user...\n');

    // Delete existing user
    await User.findOneAndDelete({ email: 'soumaypandey1@gmail.com' });
    console.log('🗑️  Removed existing user');

    // Create new superadmin
    const superadmin = await User.create({
      name: 'Soumaypandey',
      email: 'soumaypandey1@gmail.com',
      password: 'Luckey@1123',
      role: 'superadmin',
      isApproved: true,
      phone: '+91-9876543210',
      address: 'Bangalore, India',
      city: 'Bangalore',
      isVerified: true,
    });

    console.log('✅ Superadmin created successfully!\n');
    console.log('📋 Details:');
    console.log(`   Name: ${superadmin.name}`);
    console.log(`   Email: ${superadmin.email}`);
    console.log(`   Role: ${superadmin.role}`);
    console.log(`   Password: Luckey@1123\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

fixSuperadmin();
