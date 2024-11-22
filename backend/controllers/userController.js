const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Configure multer pour stocker les fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.upload = upload;

// Fonction pour enregistrer un utilisateur
exports.registerUser = async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash du mot de passe
        const hashedPassword = await argon2.hash(password);
        console.log(`Hashed password: ${hashedPassword}`);

        // Gestion de l'image de profil encodée en Base64
        let profileImage = '';
        if (req.file) {
            profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        // Création de l'utilisateur
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            profileImage,
        });

        // Enregistrement dans la base de données
        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour se connecter
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérification de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Vérification du mot de passe
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Génération du token JWT
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

// Fonction pour obtenir le profil de l'utilisateur
exports.getUserProfile = async (req, res) => {
    try {
        // Récupération de l'utilisateur sans le mot de passe
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour le profil de l'utilisateur
exports.updateUserProfile = async (req, res) => {
    try {
        // Recherche de l'utilisateur
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mise à jour des informations utilisateur
        user.email = req.body.email || user.email;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;

        // Mise à jour de l'image de profil encodée en Base64
        if (req.file) {
            user.profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        // Sauvegarde des changements
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export de multer pour les routes
exports.upload = upload;
