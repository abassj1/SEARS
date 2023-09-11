require('dotenv').config(); 

const express = require('express');
const cors = require('cors'); // <-- Import the cors middleware
const MongoClient = require('mongodb').MongoClient;
const { fetchNowPlayingMovies } = require('./utils/tmdb.js'); // <-- Adjust the path accordingly
const app = express();
const request = require('request');


// Use the cors middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 10000, keepAlive: 1 });

// Connect to MongoDB when the server starts
client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process with a failure code
    } else {
        console.log('Successfully connected to MongoDB');
    }
});

app.get('/movies', (req, res) => {
    // Fetch movies from the MongoDB collection
    const collection = client.db("sample_mflix").collection("movies");
    collection.find({}).toArray((err, movies) => {
        if (err) {
            console.error('Error fetching movies:', err);
            res.status(500).json({ error: 'Failed to fetch movies' });
            return;
        }
        // console.log('Retrieved movies:', movies); // Log the movies
        res.json(movies);
    });
});

app.get('/fetchMovies', async (req, res) => {
    try {
        const movies = await fetchNowPlayingMovies();

        const collection = client.db("sample_mflix").collection("movies");
        const moviesToInsert = movies.map(movie => ({
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }));
        
        await collection.insertMany(moviesToInsert);

        res.json({ success: true, message: 'Movies fetched and inserted successfully!' });
    } catch (error) {
        console.error('Error fetching and inserting movies:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch and insert movies' });
    }
});

app.get('/clearMovies', (req, res) => {
    const collection = client.db("sample_mflix").collection("movies");
    collection.deleteMany({}, (err, result) => {
        if(err) {
            console.error('Error clearing movies:', err);
            res.status(500).json({ error: 'Failed to clear movies' });
            return;
        }
        console.log(result.deletedCount + " movies deleted.");
        res.json({ success: true, message: result.deletedCount + " movies deleted." });
    });
});

app.get('/health', (req, res) => {
    if (client.isConnected()) {
        res.json({ status: 'Connected to MongoDB' });
    } else {
        res.status(500).json({ status: 'Not connected to MongoDB' });
    }
});

app.get('/fetch-image', (req, res) => {
    const imageUrl = req.query.url;
    request(imageUrl).pipe(res);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
