const express = require('express');
const path = require('path');
const axios = require("axios");
const bodyParser = require("body-parser");

//! Uncomment the next two lines for local running
// const dotenv = require("dotenv");
// dotenv.config();

const app = express();
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post('/api/forecast', async ({ body }, res) => {
  try {
    const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${body.lat}&lon=${body.lng}&key=${process.env.WEATHEREBIT_KEY}&days=5`);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//Port selection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`WeaThere listening on ${port}`);
});

