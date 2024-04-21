const express = require('express');
const axios = require('axios');
const config = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('GET /api/directions');
  try {
    const { origin, destination, mode, timeOption, time } = req.query;
    const apiKey = config.API_KEY;
    let apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${apiKey}`;

    if (timeOption === 'arriveBy') {
      apiUrl += `&arrival_time=${Math.floor(new Date(time).getTime() / 1000)}`;
    } else if (timeOption === 'departAt') {
      apiUrl += `&departure_time=${Math.floor(new Date(time).getTime() / 1000)}`;
    }

    const response = await axios.get(apiUrl);
    const directionData = response.data;

    if (mode === 'transit') {
      const transitSteps = directionData.routes[0].legs[0].steps.filter(step => step.travel_mode === 'TRANSIT');
      const walkingSteps = directionData.routes[0].legs[0].steps.filter(step => step.travel_mode === 'WALKING');

      const transitInfo = {
        numTransits: transitSteps.length,
        totalWalkingTime: walkingSteps.reduce((total, step) => total + step.duration.value, 0)
      };

      res.json({ ...directionData, transitInfo });
    } else {
      res.json(directionData);
    }

    console.log('Response:', directionData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;