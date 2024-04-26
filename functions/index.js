const functions = require('firebase-functions');
const cors = require('cors');
const https = require('https'); // Required to make HTTPS requests

// Define CORS options
const corsOptions = {
  origin: true, // Allow requests from all origins
  methods: ['GET', 'POST'], // Allow specified HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
};

// Create CORS middleware with the defined options
const corsMiddleware = cors(corsOptions);

exports.fetchNextMarinersGames = functions.https.onRequest((req, res) => {
  // Use the CORS middleware to handle CORS for incoming requests
  corsMiddleware(req, res, () => {
    const TEAM_ID = '135262'; 
    const apiKey = '60130162'; 
    const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=${TEAM_ID}`;

    https.get(url, (response) => {
      let data = '';


      response.on('data', (chunk) => {
        data += chunk;
      });

  
      response.on('end', () => {
        res.json(JSON.parse(data));
      });
    }).on('error', (error) => {
      console.error('Error fetching next Mariners games:', error);
      res.status(500).send('Internal Server Error');
    });
  });
});
