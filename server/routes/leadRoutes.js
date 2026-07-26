const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', leadController.createLead);
router.get('/stats', verifyToken, leadController.getStats);
router.get('/search', verifyToken, leadController.searchLeads);
router.get('/', verifyToken, leadController.getLeads);
router.patch('/:id', verifyToken, leadController.updateLead);

module.exports = router;

