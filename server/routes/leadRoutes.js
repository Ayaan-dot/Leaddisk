const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').optional().trim(),
    body('company').optional().trim(),
    body('message').optional().trim(),
  ],
  createLead
);

router.get('/', protect, getLeads);
router.get('/stats', protect, getLeadStats);
router.get('/:id', protect, getLead);
router.patch(
  '/:id/status',
  protect,
  [body('status').notEmpty().withMessage('Status is required')],
  updateLeadStatus
);
router.delete('/:id', protect, deleteLead);

module.exports = router;

