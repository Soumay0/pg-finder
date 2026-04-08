import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide PG name'],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: [true, 'Please provide rent'],
      min: 0,
    },
    deposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    occupancy: {
      type: Number,
      default: 0,
      min: 0,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'both'],
      default: 'both',
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    rules: [
      {
        type: String,
        trim: true,
      },
    ],
    verification: {
      verified: {
        type: Boolean,
        default: false,
      },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
      verifiedAt: {
        type: Date,
        default: null,
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for search
pgSchema.index({ name: 'text', description: 'text', city: 'text', address: 'text' });

const PG = mongoose.model('PG', pgSchema);
export default PG;
