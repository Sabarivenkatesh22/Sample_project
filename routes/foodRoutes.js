const express = require('express');
const authController = require('./../controllers/authController');
const foodController = require('./../controllers/foodController');
const router = express.Router();

router.route('/')
.get(authController.protectRoute,foodController.getAllFoods)
.post(foodController.createFood);

router.route('/deletefood/:id')
.get(foodController.deleteFood);

module.exports = router;