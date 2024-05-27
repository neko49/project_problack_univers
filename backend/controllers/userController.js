const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Fonction pour enregistrer un utilisateur
exports.registerUser = async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await argon2.hash(password);
        console.log(`Hashed password: ${hashedPassword}`);
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour se connecter
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received data:', req.body);

    try {
        const user = await User.findOne({ email });
        console.log(`Stored password: ${user ? user.password : 'No user found'}`);
        console.log(`Submitted password: ${password}`);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await argon2.verify(user.password, password);
        console.log(`Password match result: ${isMatch}`);
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
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour obtenir le profil de l'utilisateur
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
