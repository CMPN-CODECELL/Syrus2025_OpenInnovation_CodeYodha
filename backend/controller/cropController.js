const express = require('express');
const { PythonShell } = require('python-shell');
const CropModel = require('../models/cropModel');

class CropController {
  async recommendCrop(req, res) {
    try {
      const { soilType, region, waterAvailability, climateZone } = req.body;

      // Run Fuzzy Inference System
      const options = {
        mode: 'json',
        pythonPath: 'python3',
        scriptPath: './services',
        args: [JSON.stringify({ 
          soilType, 
          region, 
          waterAvailability, 
          climateZone 
        })]
      };

      PythonShell.run('fuzzyInference.py', options, async (err, results) => {
        if (err) throw err;

        const recommendation = results[0];
        
        // Save recommendation to database
        const cropRecommendation = new CropModel({
          inputData: req.body,
          recommendedCrops: recommendation.crops,
          suitabilityScore: recommendation.score
        });
        await cropRecommendation.save();

        res.json(recommendation);
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to generate crop recommendation', 
        details: error.message 
      });
    }
  }

  // Additional methods for crop-related operations
  async getCropHistory(req, res) {
    try {
      const history = await CropModel.find({ 
        userId: req.user.id 
      }).sort({ createdAt: -1 });
      res.json(history);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to retrieve crop recommendation history' 
      });
    }
  }
}

module.exports = new CropController();