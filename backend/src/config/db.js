import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Log connection attempt (without password)
    const sanitizedUri = mongoUri.replace(/:[^:@]*@/, ':****@');
    console.log(`Attempting to connect to: ${sanitizedUri}`);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Connected Successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n📋 Troubleshooting:');
    console.error('1. Check your MongoDB Atlas credentials are correct');
    console.error('2. Ensure username and password are URL encoded (@ becomes %40)');
    console.error('3. Verify your IP is whitelisted in MongoDB Atlas');
    console.error('4. Check if the database "pg_finder" exists');
    console.error('\n🔗 MongoDB Atlas Connection Help:');
    console.error('   Go to https://cloud.mongodb.com > Your Cluster > Connect > Drivers');
    console.error('   Copy the connection string and update .env file\n');
    process.exit(1);
  }
};

export default connectDB;
