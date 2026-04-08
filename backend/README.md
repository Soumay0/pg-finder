# PG Finder Backend

Complete Node.js backend with MongoDB for the PG Finder Platform.

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:Luckey@1123@cluster0.z0knaee.mongodb.net/pg_finder?appName=Cluster0
JWT_SECRET=your-secret-key
```

### 3. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update profile (protected)

### PG Listings (`/api/pgs`)

- `GET /` - Get all PGs with filters
- `GET /:id` - Get PG details
- `POST /` - Create PG (protected, owner only)
- `PUT /:id` - Update PG (protected, owner only)
- `DELETE /:id` - Delete PG (protected, owner only)
- `GET /user/my-pgs` - Get my PGs (protected)
- `PUT /:id/verify` - Verify PG (protected, superadmin only)

### Messages (`/api/messages`)

- `GET /` - Get all messages (protected)
- `GET /thread/:userId` - Get conversation thread (protected)
- `POST /send` - Send message (protected)
- `PUT /:id/read` - Mark as read (protected)
- `DELETE /:id` - Delete message (protected)
- `GET /unread/count` - Get unread count (protected)

### Bookings (`/api/bookings`)

- `POST /` - Create booking (protected)
- `GET /my-bookings` - Get my bookings (protected)
- `GET /pg/:pgId` - Get PG bookings (protected, owner only)
- `PUT /:id/status` - Update booking status (protected, owner only)
- `PUT /:id/review` - Add review (protected, student only)

## Database Models

### User

- name, email, password (hashed)
- role: student, owner, superadmin
- phone, address, city
- profileImage, isVerified

### PG

- name, description, address, city, pincode
- rent, deposit, capacity, occupancy
- gender, amenities, images, rules
- owner (reference to User)
- verification details
- rating, reviews count

### Message

- sender, recipient (references to User)
- pgId (reference to PG)
- subject, content
- isRead, readAt
- timestamps

### Booking

- student, pg (references)
- checkInDate, checkOutDate
- status, paymentStatus
- review (rating, comment)
- totalAmount

## Authentication

Uses JWT tokens. Include token in headers:

```
Authorization: Bearer <token>
```

## CORS

Configured to allow `http://localhost:5175` (frontend)

## Notes

- Passwords are hashed using bcrypt
- JWT tokens expire in 30 days
- All protected routes require valid JWT token
- Role-based access control on certain endpoints
