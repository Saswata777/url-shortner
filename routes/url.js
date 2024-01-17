const express = require('express');
const router = express.Router();
const {handleGenerateshortURL, handleGetAnalytics} = require('../controllers/url.js');


router.post('/', handleGenerateshortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router; 