import PG from '../models/PG.js';

export const getAllPGs = async (req, res) => {
  try {
    const { city, gender, minRent, maxRent, search } = req.query;
    const filters = { isActive: true };

    if (city) filters.city = new RegExp(city, 'i');
    if (gender && gender !== 'both') filters.gender = gender;
    if (minRent) filters.rent = { $gte: parseInt(minRent) };
    if (maxRent) {
      filters.rent = filters.rent || {};
      filters.rent.$lte = parseInt(maxRent);
    }

    let query = PG.find(filters).populate('owner', 'name email phone');

    if (search) {
      query = query.where('$text').equals({ $search: search });
    }

    const pgs = await query.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pgs.length,
      data: pgs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id)
      .populate('owner', 'name email phone address')
      .populate('verification.verifiedBy', 'name email');

    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    res.status(200).json({
      success: true,
      data: pg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPG = async (req, res) => {
  try {
    const { name, description, address, city, pincode, rent, deposit, capacity, gender, amenities, rules, images } = req.body;

    // Validate required fields
    if (!name || !description || !address || !city || !pincode || !rent || !capacity) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'description', 'address', 'city', 'pincode', 'rent', 'capacity']
      });
    }

    const pg = await PG.create({
      name,
      description,
      address,
      city,
      pincode,
      rent,
      deposit,
      capacity,
      gender,
      amenities: amenities || [],
      rules: rules || [],
      images: images || [],
      owner: req.userId,
    });

    res.status(201).json({
      success: true,
      message: 'PG created successfully',
      data: pg,
    });
  } catch (error) {
    // More detailed error messages
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updatePG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    // Check if user is owner
    if (pg.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own PG' });
    }

    const updatedPG = await PG.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'PG updated successfully',
      data: updatedPG,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    // Check if user is owner
    if (pg.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only delete your own PG' });
    }

    await PG.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'PG deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPGs = async (req, res) => {
  try {
    const pgs = await PG.find({ owner: req.userId });

    res.status(200).json({
      success: true,
      count: pgs.length,
      data: pgs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPG = async (req, res) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can verify PGs' });
    }

    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      {
        'verification.verified': true,
        'verification.verifiedBy': req.userId,
        'verification.verifiedAt': new Date(),
      },
      { new: true }
    );

    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    res.status(200).json({
      success: true,
      message: 'PG verified successfully',
      data: pg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
