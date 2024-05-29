const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  quality: { type: Number, required: true },
  location: { type: Number, required: true },
  price: { type: Number, required: true },
  service: { type: Number, required: true },
}, { timestamps: true });

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  categories: { type: [String], required: true },
  photos: { type: [String], required: true },
  reviews: [reviewSchema],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
