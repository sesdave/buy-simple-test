const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

router.post('/login',  authService.login);
router.post('/logout', authService.logout);

module.exports = router;
