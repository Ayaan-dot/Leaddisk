const Lead = require('../models/Lead');
const AppError = require('../utils/AppError');

exports.createLead = async (req, res, next) => {
  try {
    const { name, email, budget, message } = req.body;

    if (!name || !email || !budget || !message) {
      return next(new AppError('All fields are required.', 400));
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return next(new AppError('Please provide a valid email address.', 400));
    }

    const lead = await Lead.create({ name, email, budget, message });

    res.status(201).json({
      status: 'success',
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(filter),
    ]);

    res.status(200).json({
      status: 'success',
      data: { leads },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return next(new AppError('Invalid status value.', 400));
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new AppError('Invalid lead ID format.', 400));
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return next(new AppError('Lead not found.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

exports.searchLeads = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return next(new AppError('Search query is required.', 400));
    }

    const searchRegex = new RegExp(q.trim(), 'i');

    const leads = await Lead.find({
      $or: [{ name: searchRegex }, { email: searchRegex }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: { leads },
    });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const [total, newLeads, contacted, closed] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ status: 'Contacted' }),
      Lead.countDocuments({ status: 'Closed' }),
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          total,
          new: newLeads,
          contacted,
          closed,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

