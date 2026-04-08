#!/usr/bin/env node

/**
 * Full Integration Test:
 * 1. SuperAdmin login
 * 2. Approve an owner
 * 3. Owner login
 * 4. Owner creates a PG
 */

import axios from 'axios';

const apiBaseUrl = 'http://localhost:9000/api';

console.log('\n╔════════════════════════════════════════╗');
console.log('║  🧪 Full Integration Test             ║');
console.log('╚════════════════════════════════════════╝\n');

const test = async () => {
  try {
    // Step 1: SuperAdmin login
    console.log('👑 Step 1: SuperAdmin Login...');
    const superadminRes = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: 'soumaypandey1@gmail.com',
      password: 'Luckey@1123'
    });
    
    const superadminToken = superadminRes.data.token;
    console.log(`✅ Logged in as: ${superadminRes.data.user.name}`);
    console.log(`   Role: ${superadminRes.data.user.role}\n`);

    // Step 2: Get pending requests
    console.log('🔍 Step 2: Checking pending owner requests...');
    const pendingRes = await axios.get(`${apiBaseUrl}/superadmin/pending-admins`, {
      headers: { Authorization: `Bearer ${superadminToken}` }
    });
    
    console.log(`✅ Found ${pendingRes.data.count} pending owner(s)\n`);
    
    if (pendingRes.data.count === 0) {
      console.log('⏭️  No owners to approve. Creating a new owner...\n');
      
      // Create new owner
      const newOwnerRes = await axios.post(`${apiBaseUrl}/auth/register`, {
        email: 'testowner@gmail.com',
        password: 'TestOwner@123',
        name: 'Test Owner',
        role: 'owner'
      });
      
      console.log(`✅ New owner created: ${newOwnerRes.data.user.name}`);
      console.log(`   Email: testowner@gmail.com`);
      console.log(`   IsApproved: ${newOwnerRes.data.user.isApproved}\n`);
      var ownerIdToApprove = newOwnerRes.data.user._id;
      var newOwnerEmail = 'testowner@gmail.com';
      var newOwnerPassword = 'TestOwner@123';
    } else {
      var ownerIdToApprove = pendingRes.data.data[0]._id;
      var newOwnerEmail = pendingRes.data.data[0].email;
    }

    // Step 3: Approve owner
    console.log('✅ Step 3: Approving owner...');
    await axios.put(`${apiBaseUrl}/superadmin/admins/${ownerIdToApprove}/approve`, {}, {
      headers: { Authorization: `Bearer ${superadminToken}` }
    });
    console.log(`✅ Owner approved!\n`);

    // Step 4: Owner login
    console.log(`🏢 Step 4: Owner login (${newOwnerEmail})...`);
    const ownerRes = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: newOwnerEmail,
      password: newOwnerPassword || 'password123'
    });
    
    const ownerToken = ownerRes.data.token;
    console.log(`✅ Logged in as: ${ownerRes.data.user.name}`);
    console.log(`   Role: ${ownerRes.data.user.role}`);
    console.log(`   IsApproved: ${ownerRes.data.user.isApproved}\n`);

    // Step 5: Create PG
    console.log('🏠 Step 5: Creating a PG...');
    const pgRes = await axios.post(`${apiBaseUrl}/pgs`, {
      name: 'Grand Residency Hostel',
      description: 'Comfortable 4-bedroom hostel in the heart of the city',
      address: '456 Park Avenue, Koramangala',
      city: 'Bangalore',
      pincode: '560034',
      rent: 8000,
      capacity: 6,
      amenities: ['WiFi', 'Water', 'Electricity', 'Laundry'],
      rules: ['No smoking', 'No guests after 9 PM', 'Quiet hours 10 PM - 7 AM']
    }, {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });

    console.log('✅ PG Created Successfully!');
    console.log(`   ID: ${pgRes.data.data._id}`);
    console.log(`   Name: ${pgRes.data.data.name}`);
    console.log(`   City: ${pgRes.data.data.city}`);
    console.log(`   Rent: ₹${pgRes.data.data.rent}/month`);
    console.log(`   Capacity: ${pgRes.data.data.capacity}\n`);

    // Step 6: Fetch user's PGs
    console.log('📖 Step 6: Fetching user PGs...');
    const myPgsRes = await axios.get(`${apiBaseUrl}/pgs/user/my-pgs`, {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });

    console.log(`✅ Found ${myPgsRes.data.count} PG(s)\n`);
    myPgsRes.data.data.forEach((pg, i) => {
      console.log(`   ${i + 1}. ${pg.name} (${pg.city}) - ₹${pg.rent}/month`);
    });

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  ✅ FULL TEST PASSED!                 ║');
    console.log('║  MongoDB + API working perfectly!      ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error('   Message:', error.response?.data?.message || error.message);
    console.error('   Status:', error.response?.status);
    if (error.response?.data?.required) {
      console.error('   Required:', error.response.data.required);
    }
    console.log();
    process.exit(1);
  }
};

test();
