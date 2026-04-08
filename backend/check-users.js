#!/usr/bin/env node

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('\n📋 Checking users in database...\n');

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    
    console.log(`Found ${users.length} users:\n`);
    users.forEach(u => {
      console.log(`Name: ${u.name}`);
      console.log(`Email: ${u.email}`);
      console.log(`Role: ${u.role}`);
      console.log(`IsApproved: ${u.isApproved}`);
      console.log(`Has password: ${u.password ? 'YES' : 'NO'}`);
      console.log('---');
    });
  } finally {
    await mongoose.disconnect();
  }
};

check();
