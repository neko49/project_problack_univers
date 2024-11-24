const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    quality: { type: Number, required: true },
    location: { type: Number, required: true },
    price: { type: Number, required: true },
    service: { type: Number, required: true },
  },
  { timestamps: true }
);

const dailyInteractionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  clicks: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
});

const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    categories: { type: [String], required: true },
    photos: { type: [String], required: false },
    reviews: [reviewSchema],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    favorites: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    clicks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    interactions: [dailyInteractionSchema],
    analytics: {
      last7DaysClicks: { type: Number, default: 0 },
      last7DaysLikes: { type: Number, default: 0 },
      last7DaysFavorites: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shop', shopSchema);
