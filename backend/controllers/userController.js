const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer avec Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({ storage });

// Fonction pour enregistrer un utilisateur
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
  
      // Générer un token JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Inclure le token et les données nécessaires dans la réponse
      res.status(201).json({
        message: 'User registered successfully',
        userId: user._id,
        role: user.role,
        token, // Inclure le token dans la réponse
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Fonction pour mettre à jour le profil utilisateur
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
      user.profileImage = req.file.path;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    console.log('User ID from token:', req.user?.userId);
    if (!req.user?.userId) {
        return res.status(403).json({ message: 'User ID is missing in token' });
    }

    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Logged in successfully',
      token,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.subscribeUser = async (req, res) => {
    const { plan } = req.body;
  
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.subscriptionPlan = plan;
      user.subscriptionDate = new Date();
  
      await user.save();
      res.status(200).json({ message: `Subscription to ${plan} plan successful` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.upload = upload;
