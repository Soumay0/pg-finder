import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminRequest from './src/models/AdminRequest.js';
import User from './src/models/User.js';

dotenv.config();

const testDB = async () => {
  try {
    console.log('\n📊 DATABASE CHECK:');
    await mongoose.connect(process.env.MONGODB_URI);

    // Check AdminRequests
    const adminRequests = await AdminRequest.find().lean();
    console.log('\n📝 AdminRequests collection (' + adminRequests.length + ' records):');
    if (adminRequests.length > 0) {
      console.log(JSON.stringify(adminRequests, null, 2));
    } else {
      console.log('❌ No admin requests found');
    }

    // Check pending users with admin/owner role
    const pendingUsers = await User.find({ 
      role: { $in: ['admin', 'owner'] }, 
      isApproved: false 
    }).lean();
    console.log('\n👥 Pending Admin/Owner Users (' + pendingUsers.length + ' records):');
    if (pendingUsers.length > 0) {
      console.log(JSON.stringify(pendingUsers, null, 2));
    } else {
      console.log('❌ No pending admin/owner users found');
    }

    // Check approved users with admin/owner role
    const approvedUsers = await User.find({ 
      role: { $in: ['admin', 'owner'] }, 
      isApproved: true 
    }).lean();
    console.log('\n✅ Approved Admin/Owner Users (' + approvedUsers.length + ' records):');
    if (approvedUsers.length > 0) {
      console.log(JSON.stringify(approvedUsers, null, 2));
    } else {
      console.log('❌ No approved admin/owner users found');
    }

    await mongoose.connection.close();
    console.log('\n✅ Database check complete');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testDB();
