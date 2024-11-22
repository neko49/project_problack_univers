require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Configuration des options CORS
const corsOptions = {
    origin: '*', // Permet toutes les origines temporairement pour debug,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser ces méthodes
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser ces en-têtes
    exposedHeaders: ['Content-Type'], // Exposer des en-têtes nécessaires
    credentials: false, // Si vous utilisez des cookies ou des sessions
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Configurez le serveur pour servir les fichiers statiques du dossier "uploads"
app.use('/uploads', (req, res, next) => {
    console.log(`Requested file: ${req.path}`);
    next();
}, express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/contact', contactRoutes);

// Configuration pour servir le frontend en production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
