import User from '../models/User.js';

export const getPendingAdminRequests = async (req, res) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can view pending requests' });
    }

    const pendingAdmins = await User.find({
      role: { $in: ['owner', 'admin'] },
      isApproved: false,
    });

    res.status(200).json({
      success: true,
      count: pendingAdmins.length,
      data: pendingAdmins,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveAdmin = async (req, res) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can approve admins' });
    }

    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        isApproved: true,
        approvedBy: req.userId,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Admin approved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectAdmin = async (req, res) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can reject admins' });
    }

    const { userId } = req.params;

    // Delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Admin rejected and deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can view all admins' });
    }

    const admins = await User.find({
      role: { $in: ['owner', 'admin'] },
      isApproved: true,
    }).populate('approvedBy', 'name email');

    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
