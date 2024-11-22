const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: ['client', 'business'] },
    profileImage: { type: String },
    subscriptionPlan: { type: String, enum: ['essential', 'plus', 'elite', 'annual'], default: null },
    subscriptionDate: { type: Date, default: null },
});

module.exports = mongoose.model('User', userSchema);
