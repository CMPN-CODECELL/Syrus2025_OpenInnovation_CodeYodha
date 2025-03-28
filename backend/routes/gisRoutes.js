const express = require('express');
const router = express.Router();
const gisController = require('../controllers/gisController');

router.get('/farm-boundaries', gisController.getFarmBoundaries);
router.post('/crop-suitability', gisController.predictCropSuitability);
router.get('/soil-analysis/:locationId', gisController.getSoilAnalysis);

module.exports = router;