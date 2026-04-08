import Booking from '../models/Booking.js';
import PG from '../models/PG.js';

export const createBooking = async (req, res) => {
  try {
    const { pgId, checkInDate, totalAmount } = req.body;

    if (!pgId || !checkInDate || !totalAmount) {
      return res.status(400).json({ message: 'Please provide pgId, checkInDate, and totalAmount' });
    }

    const pg = await PG.findById(pgId);
    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    const booking = await Booking.create({
      student: req.userId,
      pg: pgId,
      checkInDate,
      totalAmount,
    });

    const populatedBooking = await booking.populate('pg', 'name address').populate('student', 'name email');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.userId })
      .populate('pg', 'name address rent')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPGBookings = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.pgId);

    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    if (pg.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only view bookings for your own PG' });
    }

    const bookings = await Booking.find({ pg: req.params.pgId })
      .populate('student', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Please provide a valid status' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is owner of the PG
    const pg = await PG.findById(booking.pg);
    if (pg.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only update bookings for your own PG' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Please provide a rating between 1 and 5' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.student.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only review your own bookings' });
    }

    booking.review = {
      rating,
      comment: comment || '',
      reviewedAt: new Date(),
    };

    await booking.save();

    // Update PG rating
    const allReviews = await Booking.find({
      pg: booking.pg,
      'review.rating': { $exists: true, $ne: null },
    });

    if (allReviews.length > 0) {
      const avgRating = allReviews.reduce((sum, b) => sum + b.review.rating, 0) / allReviews.length;
      await PG.findByIdAndUpdate(booking.pg, {
        rating: avgRating,
        reviews: allReviews.length,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review added successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
