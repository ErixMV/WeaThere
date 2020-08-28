const express = require('express');
const path = require('path');
const axios = require("axios");
const bodyParser = require("body-parser");
const generatePassword = require('password-generator');

const app = express();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.post('/api/forecast', async ({ body }, res) => {
  try {
    console.log(body);
    const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${body.lat}&lon=${body.lng}&key=abc530c57199400ab07b04e58e04df1f&days=5`);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
