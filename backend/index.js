require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// Configurez le serveur pour servir les fichiers statiques du dossier "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});