// index.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Define a route to fetch sloka from the API
app.get('/api/sloka/:chapter/:verse', async (req, res) => {
    try {
        const { chapter, verse } = req.params;
        console.log(`Fetching sloka for Chapter ${chapter}, Verse ${verse}`);
        const apiUrl = `https://gita-api.vercel.app/tel/verse/${chapter}/${verse}`;
        const response = await axios.get(apiUrl);
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch sloka');
        }

        console.log('Sloka fetched successfully');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching sloka:', error);
        res.status(500).json({ error: 'Error fetching sloka' });
    }
});

// Define a route to handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to Bhagavad Gita API Server');
});

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update this with your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
