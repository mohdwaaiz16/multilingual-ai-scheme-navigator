const express = require('express');
const router = express.Router();

const schemeController = require('../controllers/schemes');
const categoryController = require('../controllers/categories');
// const userController = require('../controllers/users');

// Categories
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:slug', categoryController.getCategoryBySlug);

// Schemes
router.get('/schemes', schemeController.getAllSchemes);
router.get('/schemes/search', schemeController.searchSchemes);
router.get('/schemes/:slug', schemeController.getSchemeBySlug);

// AI & Matching
// router.post('/ai/query', schemeController.aiQuery);
// router.post('/eligibility/check', schemeController.checkEligibility);

module.exports = router;
