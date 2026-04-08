#!/usr/bin/env node

/**
 * API Test Script - PG Creation
 * Tests the full workflow: Login → Create PG
 */

import axios from 'axios';

const apiBaseUrl = 'http://localhost:9000/api';

console.log('\n╔════════════════════════════════════════╗');
console.log('║  🧪 API Test: PG Creation             ║');
console.log('╚════════════════════════════════════════╝\n');

const test = async () => {
  try {
    // Step 1: Login as approved owner
    console.log('🔐 Step 1: Logging in as owner...');
    const loginRes = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: 'owner2@gmail.com',
      password: 'password123'
    });
    
    const token = loginRes.data.token;
    console.log(`✅ Logged in as: ${loginRes.data.user.name}`);
    console.log(`   Role: ${loginRes.data.user.role}`);
    console.log(`   Approved: ${loginRes.data.user.isApproved}\n`);

    // Step 2: Create a PG
    console.log('🏢 Step 2: Creating a PG...');
    const pgRes = await axios.post(`${apiBaseUrl}/pgs`, {
      name: 'Test PG Hostel',
      description: 'A beautiful test hostel',
      address: '123 Main Street',
      city: 'Bangalore',
      pincode: '560001',
      rent: 5000,
      capacity: 4,
      amenities: ['WiFi', 'Water', 'Electricity'],
      rules: ['No smoking', 'Quiet hours after 10 PM']
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ PG Created Successfully!');
    console.log(`   ID: ${pgRes.data.data._id}`);
    console.log(`   Name: ${pgRes.data.data.name}`);
    console.log(`   City: ${pgRes.data.data.city}`);
    console.log(`   Rent: ₹${pgRes.data.data.rent}/month\n`);

    // Step 3: Fetch user's PGs
    console.log('📖 Step 3: Fetching user PGs...');
    const myPgsRes = await axios.get(`${apiBaseUrl}/pgs/user/my-pgs`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(`✅ Found ${myPgsRes.data.count} PG(s)`);
    myPgsRes.data.data.forEach((pg, i) => {
      console.log(`   ${i + 1}. ${pg.name} in ${pg.city} - ₹${pg.rent}/month`);
    });
    console.log();

    console.log('╔════════════════════════════════════════╗');
    console.log('║  ✅ ALL API TESTS PASSED!             ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ ERROR:');
    console.error('   Message:', error.response?.data?.message || error.message);
    if (error.response?.data?.required) {
      console.error('   Required fields:', error.response.data.required);
    }
    console.error('   Status:', error.response?.status);
    console.log();
    process.exit(1);
  }
};

test();
