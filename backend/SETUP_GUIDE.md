# 🔧 Backend Setup Guide

## ⚠️ MongoDB Atlas Credentials Issue

Your current MongoDB connection is failing with `authentication failed` error.

### ✅ Step 1: Get Your Correct Connection String

1. Visit [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Select your cluster (appears to be `cluster0`)
4. Click the **"Connect"** button
5. Choose **"Drivers"**
6. Select **"Node.js"** version
7. You'll see a connection string like:
   ```
   mongodb+srv://<username>:<password>@cluster0.z0knaee.mongodb.net/?retryWrites=true&w=majority
   ```

### ✅ Step 2: Extract Your Credentials

From the connection string above:

- Replace `<username>` with your actual MongoDB username
- Replace `<password>` with your actual MongoDB password
- Add `/pg_finder` at the end (your database name)

### ✅ Step 3: URL Encode Special Characters

If your **password** contains special characters, you must URL encode them:

| Character | Encoded |
| --------- | ------- |
| `@`       | `%40`   |
| `:`       | `%3A`   |
| `/`       | `%2F`   |
| `#`       | `%23`   |
| `?`       | `%3F`   |
| `&`       | `%26`   |

**Example**:

- Password: `Luckey@1123` → `Luckey%401123`
- Password: `Pass:word#123` → `Pass%3Aword%23123`

### ✅ Step 4: Update `.env` File

Edit `backend/.env`:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD_ENCODED@cluster0.z0knaee.mongodb.net/pg_finder?appName=Cluster0
```

### ✅ Step 5: Verify Connection

Run the verification script:

```bash
cd backend
npm run verify
```

You should see: **✅ CONNECTION SUCCESSFUL!**

### ✅ Step 6: Start Server

Once verification passes:

```bash
npm start
```

---

## 🆘 Still Having Issues?

### IP Whitelist Problem

If error mentions timeout or connection refused:

1. Go to [MongoDB Atlas Network Access](https://cloud.mongodb.com/v2/orgs)
2. Select your project
3. Click "Network Access"
4. Click "Add IP Address"
5. Add `0.0.0.0/0` (for development only)
6. Or add your specific IP address

### Wrong Credentials

- Verify you're using the correct username and password
- The password is case-sensitive
- Make sure there are no extra spaces
- Check if your account is still active in MongoDB

### Database Not Found

- Ensure database `pg_finder` exists
- If not, create it from MongoDB Atlas dashboard

---

## 📝 Your Current Configuration

**File**: `backend/.env`

**Current Status**: ❌ Connection Failed

**To Fix**:

1. Get connection string as shown above
2. Update `MONGODB_URI` in `.env`
3. Run `npm run verify` to test
4. Run `npm start` when verification succeeds

---

## 🚀 Once MongoDB Works

Your backend will be running on:

- **API Base URL**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`

Then your frontend at `http://localhost:5175/` will connect to it!
