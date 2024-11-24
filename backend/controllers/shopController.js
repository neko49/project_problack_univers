const Shop = require('../models/Shop');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shop_photos', // Dossier pour les photos des boutiques
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});
const upload = multer({ storage });

// Créer une boutique
exports.createShop = async (req, res) => {
  const shopData = JSON.parse(req.body.shop);
  const photos = req.files ? req.files.map(file => file.path) : [];
  try {
    const shop = new Shop({
      ...shopData,
      photos,
      admin: req.user.userId,
    });
    const newShop = await shop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer toutes les boutiques
exports.getShops = async (req, res) => {
    try {
      const shops = await Shop.find();
      res.json(shops);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Récupérer une boutique
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

// Mettre à jour une boutique
exports.updateShop = async (req, res) => {
  const shopData = JSON.parse(req.body.shop);
  const photos = req.files ? req.files.map(file => file.path) : [];
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    if (shop.admin.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    Object.assign(shop, { ...shopData, photos });
    const updatedShop = await shop.save();
    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une boutique
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    if (shop.admin.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Supprimer les photos de Cloudinary
    if (shop.photos && shop.photos.length > 0) {
      const deletionPromises = shop.photos.map(photo => {
        const publicId = photo.split('/').pop().split('.')[0];
        return cloudinary.uploader.destroy(`shop_photos/${publicId}`);
      });
      await Promise.all(deletionPromises);
    }

    await shop.remove();
    res.json({ message: 'Boutique supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Statistiques des boutiques
exports.getShopAnalytics = async (req, res) => {
  console.log('getShopAnalytics called by user:', req.user);
  try {
      const shops = await Shop.find({ admin: req.user.userId });
      console.log('Shops found:', shops); // Log les boutiques récupérées

      const categoriesCount = {};
      const reviewsCount = {};

      shops.forEach((shop) => {
          const categories = shop.categories || []; // Assurez-vous que c'est un tableau
          console.log('Categories:', categories); // Log les catégories
          categories.forEach((category) => {
              categoriesCount[category] = (categoriesCount[category] || 0) + 1;
          });

          const reviews = shop.reviews || []; // Assurez-vous que c'est un tableau
          console.log('Reviews:', reviews); // Log les avis
          reviews.forEach((review) => {
              const rating = review.quality || 'N/A';
              reviewsCount[rating] = (reviewsCount[rating] || 0) + 1;
          });
      });
      
      console.log('Categories count:', categoriesCount); // Log résultats des catégories
      console.log('Reviews count:', reviewsCount); // Log résultats des avis
      res.status(200).json({ categoriesCount, reviewsCount });
  } catch (error) {
      console.error('Error in getShopAnalytics:', error.message); // Log de l'erreur
      res.status(500).json({ message: error.message });
  }
};


// Ajouter un avis
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

// Statistiques des boutiques et catégories
exports.getCategoriesAndStats = async (req, res) => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Dernière semaine
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000); // Semaine précédente

    // Récupérer toutes les boutiques
    const shops = await Shop.find();

    const categoriesSet = new Set();
    let totalReviews = 0;
    let totalVisitors = 0;

    // Calcul des nouvelles annonces et des tendances
    const newAnnouncements = shops.filter((shop) => new Date(shop.createdAt) > oneWeekAgo).length;
    const announcementsLastWeek = shops.filter(
      (shop) => new Date(shop.createdAt) > twoWeeksAgo && new Date(shop.createdAt) <= oneWeekAgo
    ).length;

    // Calcul par catégorie
    const newAnnouncementsByCategory = {};
    shops.forEach((shop) => {
      shop.categories.forEach((category) => {
        categoriesSet.add(category);
        if (new Date(shop.createdAt) > oneWeekAgo) {
          newAnnouncementsByCategory[category] = (newAnnouncementsByCategory[category] || 0) + 1;
        }
      });
      totalReviews += shop.reviews.length;
      totalVisitors += shop.reviews.length * 2000; // Exemple : chaque avis représente 2000 visiteurs
    });

    const avgReviewsNewShops =
      shops.filter((shop) => new Date(shop.createdAt) > oneWeekAgo).reduce((sum, shop) => sum + shop.reviews.length, 0) /
        newAnnouncements || 0;
    const avgReviewsOldShops =
      shops.filter((shop) => new Date(shop.createdAt) <= oneWeekAgo).reduce((sum, shop) => sum + shop.reviews.length, 0) /
        (shops.length - newAnnouncements) || 0;

    const categories = Array.from(categoriesSet);

    res.json({
      categories,
      totalReviews,
      totalVisitors,
      newAnnouncements,
      announcementsLastWeek,
      newAnnouncementsByCategory,
      avgReviewsNewShops,
      avgReviewsOldShops,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recherche de boutiques
exports.searchShops = async (req, res) => {
  try {
    const { term, location, category } = req.query;

    console.log("Search parameters received:", { term, location, category }); // Debug

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

    console.log("Search results:", shops); // Debug
    res.json(shops);
  } catch (error) {
    console.error("Erreur lors de la recherche des boutiques :", error);
    res.status(500).json({ message: error.message });
  }
};

/// Fonction pour gérer les "J'aime"
exports.likeShop = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    shop.likes += 1;
    await updateDailyInteraction(shop, 'likes');
    res.status(200).json({ message: 'Shop liked successfully', likes: shop.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
exports.toggleFavoriteShop = async (req, res) => {
  try {
    const { id } = req.params; // ID de la boutique
    const userId = req.user.userId; // ID de l'utilisateur connecté
    const shop = await Shop.findById(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    if (shop.favorites.includes(userId)) {
      shop.favorites = shop.favorites.filter(favId => favId.toString() !== userId.toString());
      res.status(200).json({ message: 'Removed from favorites', favorites: shop.favorites });
    } else {
      shop.favorites.push(userId);
      res.status(200).json({ message: 'Added to favorites', favorites: shop.favorites });
    }

    await shop.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour suivre les clics
exports.trackClick = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    await updateDailyInteraction(shop, 'clicks');
    res.status(200).json({ message: 'Click tracked successfully', clicks: shop.clicks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour gérer les interactions quotidiennes
const updateDailyInteraction = async (shop, field) => {
  const today = new Date().toISOString().split('T')[0];
  const interaction = shop.interactions.find((i) => i.date.toISOString().split('T')[0] === today);

  if (interaction) {
    interaction[field] += 1;
  } else {
    shop.interactions.push({ date: new Date(), [field]: 1 });
  }
  await shop.save();
};

// Fonction pour mettre à jour les statistiques analytiques
const updateShopAnalytics = async () => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const shops = await Shop.find();
    for (const shop of shops) {
      const last7DaysClicks = shop.interactions
        .filter((i) => i.date >= oneWeekAgo)
        .reduce((acc, i) => acc + i.clicks, 0);

      const last7DaysLikes = shop.interactions
        .filter((i) => i.date >= oneWeekAgo)
        .reduce((acc, i) => acc + i.likes, 0);

      const last7DaysFavorites = shop.interactions
        .filter((i) => i.date >= oneWeekAgo)
        .reduce((acc, i) => acc + i.shares, 0);

      shop.analytics = {
        last7DaysClicks,
        last7DaysLikes,
        last7DaysFavorites,
      };
      await shop.save();
    }
    console.log('Analytics updated successfully!');
  } catch (error) {
    console.error('Error updating analytics:', error);
  }
};

// Exporter les fonctions nécessaires
exports.upload = upload;
exports.updateShopAnalytics = updateShopAnalytics;

//
exports.getAdminAnalytics = async (req, res) => {
  try {
    const adminId = req.user.userId; // ID de l'admin connecté
    const shops = await Shop.find({ admin: adminId });
    let totalClicks = 0;
    let totalLikes = 0;
    let totalFavorites = 0;

    shops.forEach((shop) => {
      totalClicks += shop.clicks;
      totalLikes += shop.likes;
      totalFavorites += shop.favorites.length;
    });

    res.status(200).json({
      totalClicks,
      totalLikes,
      totalFavorites,
      analytics: shops.map(shop => ({
        shopName: shop.name,
        clicks: shop.clicks,
        likes: shop.likes,
        favorites: shop.favorites.length,
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

