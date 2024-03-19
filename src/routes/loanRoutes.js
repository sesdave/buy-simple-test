const express = require('express');
const loanController = require('../controllers/loanController');
const authenticateUser = require('../middleware/authentication');

const router = express.Router();

router.get('/', authenticateUser, loanController.getAllLoans);
router.get('/:userEmail/get', authenticateUser, loanController.getUserLoans);
router.get('/expired', authenticateUser, loanController.getExpiredLoans);
router.delete('/:loanId/delete', authenticateUser, loanController.deleteLoan);

module.exports = router;
