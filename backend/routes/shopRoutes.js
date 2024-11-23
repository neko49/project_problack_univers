const express = require('express');
const { getShops, createShop, getShopById, deleteShop, getShopAnalytics, submitReview, getCategoriesAndStats, searchShops, updateShop, upload } = require('../controllers/shopController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, upload.array('photos'), createShop);
router.get('/analytics', authenticateToken, getShopAnalytics);
router.get('/categories/stats', getCategoriesAndStats);
router.get('/search', searchShops);
router.put('/:id', authenticateToken, upload.array('photos'), updateShop);
router.get('/', getShops);
router.get('/:id', authenticateToken, getShopById);
router.delete('/:id', authenticateToken, deleteShop);
router.post('/:id/reviews', submitReview);



module.exports = router;
