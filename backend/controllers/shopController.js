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

exports.submitReview = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, comment, quality, location, price, service } = req.body;
  
      // Log the received data for debugging
      console.log("Received review data:", req.body);
  
      const shop = await Shop.findById(id);
      if (!shop) return res.status(404).json({ message: 'Shop not found' });
  
      const newReview = { name, email, comment, quality, location, price, service };
      shop.reviews.push(newReview);
      await shop.save();
  
      res.status(201).json(newReview);
    } catch (error) {
      // Log the error for debugging
      console.error("Error submitting review:", error);
      res.status(500).json({ message: error.message });
    }
  };

exports.getCategoriesAndStats = async (req, res) => {
  try {
    const shops = await Shop.find();
    const categoriesSet = new Set();
    let totalReviews = 0;
    let totalVisitors = 0;
    let newAnnouncements = 0; // Vous devez remplacer cela par une vraie logique

    shops.forEach(shop => {
      shop.categories.forEach(category => categoriesSet.add(category));
      totalReviews += shop.reviews.length;
      totalVisitors += shop.reviews.length * 2000; // Supposons que chaque commentaire représente 10 visiteurs
    });

    const categories = Array.from(categoriesSet);
    res.json({ categories, totalReviews, totalVisitors, newAnnouncements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.searchShops = async (req, res) => {
    try {
      const { term, location, category } = req.query;
  
      let query = Shop.find();
  
      if (term) {
        query = query.or([
          { name: { $regex: term, $options: 'i' } },
          { description: { $regex: term, $options: 'i' } },
        ]);
      }
  
      if (location) {
        query = query.where('address').regex(new RegExp(location, 'i'));
      }
  
      if (category) {
        query = query.where('categories').equals(category);
      }
  
      const shops = await query.exec();
  
      res.json(shops);
    } catch (error) {
      console.error("Erreur lors de la recherche des boutiques :", error);
      res.status(500).json({ message: error.message });
    }
  };