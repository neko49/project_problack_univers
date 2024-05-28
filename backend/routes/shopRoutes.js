const express = require('express');
const { getShops, createShop, getShopById, deleteShop, getShopAnalytics } = require('../controllers/shopController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/analytics', authenticateToken, getShopAnalytics);
router.get('/', getShops);
router.post('/', authenticateToken, createShop);
router.get('/:id', getShopById);
router.delete('/:id', authenticateToken, deleteShop);


module.exports = router;
