const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

exports.fetchNowPlayingMovies = async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const movies = response.data.results;
    
    // Ensure only taking the first 9 movies
    return movies.slice(0, 9);
};

