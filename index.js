const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const axios = require("axios");
const path = require('path');

dotenv.config();
const app = express();
const port = 5000;

app.use( bodyParser.json() ); 
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.post("/api/cities", async (req, res) => {
  res.json({id: process.env.REACT_APP_ALGOLIA_APP_ID, apikey: process.env.REACT_APP_ALGOLIA_API_KEY});
});

app.post('/api/forecast', async ({body}, res) => {
  try {
    const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${body.lat}&lon=${body.lng}&key=${process.env.REACT_APP_WEATHERBIT}&days=5`);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})