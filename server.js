const express = require('express');
const cors = require('cors');
const directionsRoutes = require('./routes/directions');
const config = require('./config');
const apiKey = config.API_KEY;

const app = express();

app.use(cors({
    origin: 'https://www.kijiji.ca',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  }));
  

app.use('/api/directions', directionsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});