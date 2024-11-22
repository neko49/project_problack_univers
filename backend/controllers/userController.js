const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images', // Directory for profile images
    allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file formats
  },
});

const upload = multer({ storage });

// Function to register a user
exports.registerUser = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await argon2.hash(password);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      profileImage: req.file ? req.file.path : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Default+Image',
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = req.body.email || user.email;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    if (req.file) {
      user.profileImage = req.file.path; // Cloudinary image URL
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upload = upload;
