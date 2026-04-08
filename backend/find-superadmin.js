import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const superadmins = await User.find({ role: 'superadmin' }).select('name email role').lean();
    console.log('\n👑 SuperAdmins in database:');
    console.log(JSON.stringify(superadmins, null, 2));
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
