const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, upload } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, upload.single('profileImage'), updateUserProfile);

module.exports = router;
