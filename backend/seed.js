#!/usr/bin/env node

/**
 * Seed Script - Create Superadmin User
 * Run: node seed.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import connectDB from './src/config/db.js';

dotenv.config();

const createSuperadmin = async () => {
  try {
    await connectDB();

    console.log('\n🌱 Seeding Database...\n');

    // Check if superadmin already exists
    const existingAdmin = await User.findOne({ email: 'soumaypandey1@gmail.com' });

    if (existingAdmin) {
      console.log('✅ Superadmin already exists!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // Create superadmin user
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
    console.log(`   Password: Luckey@1123`);
    console.log('\n🔐 Keep these credentials safe!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating superadmin:', error.message);
    process.exit(1);
  }
};

createSuperadmin();
