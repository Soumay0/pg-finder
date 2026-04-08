#!/usr/bin/env node
import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

// Test SuperAdmin Login Flow
const testSuperAdminFlow = async () => {
  try {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('   🧪 SUPERADMIN API TEST');
    console.log('═══════════════════════════════════════════════════\n');

    // Step 1: Login as SuperAdmin
    console.log('📝 Step 1: Login as SuperAdmin...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'soumaypandey1@gmail.com',
      password: '0000',  // You'll need the actual password
    });

    if (!loginRes.data.token) {
      console.log('❌ Login failed - no token received');
      console.log('Response:', loginRes.data);
      return;
    }

    const token = loginRes.data.token;
    console.log('✅ Login successful');
    console.log(`   Token: ${token.substring(0, 20)}...`);
    console.log(`   User role: ${loginRes.data.user.role}`);

    // Step 2: Fetch pending admin requests (from User registrations)
    console.log('\n📝 Step 2: Fetch pending admin/owner requests...');
    const pendingAdminsRes = await axios.get(
      `${API_URL}/superadmin/pending-admins`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`✅ Pending admins/owners: ${pendingAdminsRes.data.count}`);
    if (pendingAdminsRes.data.data.length > 0) {
      pendingAdminsRes.data.data.forEach((req, idx) => {
        console.log(`   ${idx + 1}. ${req.name} (${req.email}) - Role: ${req.role}, Approved: ${req.isApproved}`);
      });
    } else {
      console.log('   None');
    }

    // Step 3: Fetch admin requests (from AdminRequest form)
    console.log('\n📝 Step 3: Fetch admin request forms...');
    const adminRequestsRes = await axios.get(
      `${API_URL}/admin-requests`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`✅ Total admin requests: ${adminRequestsRes.data.length}`);
    adminRequestsRes.data.forEach((req, idx) => {
      console.log(`   ${idx + 1}. ${req.name} (${req.email}) - Status: ${req.status}`);
    });

    // Step 4: Summary
    console.log('\n═══════════════════════════════════════════════════');
    console.log('   📊 SUMMARY');
    console.log('═══════════════════════════════════════════════════');
    console.log(`✅ Backend is working correctly!`);
    console.log(`   - Pending admin/owner registrations: ${pendingAdminsRes.data.count}`);
    console.log(`   - Admin request forms: ${adminRequestsRes.data.length}`);
    console.log('\nAll data is available - frontend issue likely in token handling or fetch logic');

  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
    if (error.response?.status === 401) {
      console.error('   Login failed - check email/password');
    } else if (error.response?.status === 403) {
      console.error('   Not authorized - check user role');
    }
  }
};

testSuperAdminFlow();
