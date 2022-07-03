const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser, getMe } = require('../Controllers/user.controller');
const { protect } = require('../Middleware/auth.middleware');

router.post('/', registerUser);

router.post('/login', authenticateUser);

router.get('/me', protect, getMe);

module.exports = router;