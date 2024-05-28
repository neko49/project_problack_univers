const Shop = require('../models/Shop');

exports.getShops = async (req, res) => {
    try {
      const shops = await Shop.find();
      res.json(shops);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createShop = async (req, res) => {
  const shop = new Shop({
    ...req.body,
    admin: req.user.userId
  });

  try {
    const newShop = await shop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (shop.admin.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await shop.remove();
    res.json({ message: 'Boutique supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShopAnalytics = async (req, res) => {
  try {
    const shops = await Shop.find({ admin: req.user.userId });

    const categoriesCount = {};
    const reviewsCount = {};

    shops.forEach((shop) => {
      shop.categories.forEach((category) => {
        categoriesCount[category] = (categoriesCount[category] || 0) + 1;
      });

      shop.reviews.forEach((review) => {
        const rating = review.rating || 'N/A';
        reviewsCount[rating] = (reviewsCount[rating] || 0) + 1;
      });
    });

    res.json({ categoriesCount, reviewsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
