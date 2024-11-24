const express = require('express');
const { getShops, createShop, getShopById, deleteShop, getShopAnalytics, submitReview, getCategoriesAndStats, searchShops, updateShop, upload, likeShop, toggleFavoriteShop, trackClick, updateShopAnalytics, getAdminAnalytics } = require('../controllers/shopController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, upload.array('photos'), createShop);
router.get('/analytics', authenticateToken, getShopAnalytics);
// Nouvelle route pour les statistiques admin
router.get('/admin-analytics', authenticateToken, getAdminAnalytics);
router.get('/categories/stats', getCategoriesAndStats);
router.get('/search', searchShops);
router.put('/:id', authenticateToken, upload.array('photos'), updateShop);
router.get('/', getShops);
router.get('/:id', authenticateToken, getShopById);
router.delete('/:id', authenticateToken, deleteShop);
router.post('/:id/reviews', submitReview);
router.post('/:id/like', authenticateToken, likeShop); // Route pour les "J'aime"
router.post('/:id/favorite', authenticateToken, toggleFavoriteShop); // Route pour les favoris
router.post('/:id/click', trackClick); // Route pour suivre les clics

// Route pour lancer manuellement le calcul des analytics
router.post('/update-analytics', async (req, res) => {
    try {
      await updateShopAnalytics();
      res.status(200).json({ message: 'Analytics updated successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update analytics' });
    }
  });



module.exports = router;
