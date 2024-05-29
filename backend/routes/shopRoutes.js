const express = require('express');
const { getShops, createShop, getShopById, deleteShop, getShopAnalytics, submitReview, getCategoriesAndStats, searchShops } = require('../controllers/shopController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/search', searchShops);
router.get('/analytics', authenticateToken, getShopAnalytics);
router.get('/', getShops);
router.post('/', authenticateToken, createShop);
router.get('/:id', authenticateToken, getShopById);
router.delete('/:id', authenticateToken, deleteShop);
router.post('/:id/reviews', submitReview);
router.get('/categories/stats', getCategoriesAndStats);



module.exports = router;
