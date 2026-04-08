#!/usr/bin/env node

/**
 * Simple flow test:
 * 1. Register new owner
 * 2. Approve it via superadmin
 * 3. Login and create PG
 */

import axios from 'axios';

const apiBaseUrl = 'http://localhost:9000/api';

console.log('\n╔════════════════════════════════════════╗');
console.log('║  🧪 Clean Test: New Owner + PG       ║');
console.log('╚════════════════════════════════════════╝\n');

const test = async () => {
  try {
    // Step 1: Register new owner
    console.log('📝 Step 1: Registering new owner...');
    const registerRes = await axios.post(`${apiBaseUrl}/auth/register`, {
      email: `owner_${Date.now()}@test.com`,
      password: 'TestPass@123',
      name: 'New Test Owner',
      role: 'owner'
    });
    
    const ownerId = registerRes.data.user._id;
    const ownerEmail = registerRes.data.user.email;
    const ownerPassword = 'TestPass@123';
    
    console.log(`✅ Owner registered: ${registerRes.data.user.name}`);
    console.log(`   Email: ${ownerEmail}`);
    console.log(`   IsApproved: ${registerRes.data.user.isApproved}\n`);

    // Step 2: SuperAdmin login and approve
    console.log('👑 Step 2: SuperAdmin approving owner...');
    const superadminRes = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: 'soumaypandey1@gmail.com',
      password: 'Luckey@1123'
    });
    
    const superadminToken = superadminRes.data.token;
    
    const approveRes = await axios.put(
      `${apiBaseUrl}/superadmin/admins/${ownerId}/approve`,
      {},
      { headers: { Authorization: `Bearer ${superadminToken}` } }
    );
    
    console.log(`✅ Owner approved!\n`);

    // Step 3: Owner login
    console.log(`🏢 Step 3: Owner login (${ownerEmail})...`);
    const ownerRes = await axios.post(`${apiBaseUrl}/auth/login`, {
      email: ownerEmail,
      password: ownerPassword
    });
    
    const ownerToken = ownerRes.data.token;
    console.log(`✅ Logged in as: ${ownerRes.data.user.name}`);
    console.log(`   IsApproved: ${ownerRes.data.user.isApproved}\n`);

    // Step 4: Create PG
    console.log('🏠 Step 4: Creating a PG...');
    const pgRes = await axios.post(`${apiBaseUrl}/pgs`, {
      name: 'Peace Valley Hostel',
      description: 'Beautiful natural location with great amenities',
      address: '789 Forest Road',
      city: 'Ooty',
      pincode: '643001',
      rent: 7000,
      capacity: 8,
      amenities: ['WiFi', 'Hot Water', 'Kitchen', 'Parking'],
      rules: ['No noise after 10 PM', 'No alcohol']
    }, {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });

    console.log('✅ PG Created!');
    console.log(`   Name: ${pgRes.data.data.name}`);
    console.log(`   City: ${pgRes.data.data.city}`);
    console.log(`   Rent: ₹${pgRes.data.data.rent}\n`);

    console.log('╔════════════════════════════════════════╗');
    console.log('║  ✅ SUCCESS! Everything works!        ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.response?.data?.message || error.message);
    console.log();
    process.exit(1);
  }
};

test();
