import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Completion from "..//Home/completion.chatgpt.js";
import { average } from 'color.js'


const MovieDetails = (props) => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();  // Extract movieId from the URL

    useEffect(() => {
        fetch("http://localhost:3001/movies")
            .then(response => response.json())
            .then(async data => {
                // Find the movie with the corresponding ID
                const selectedMovie = data.find(m => m._id === movieId);
    
                const computeAvgColor = async (movie) => {
                    const proxyImageUrl = `http://localhost:3001/fetch-image?url=${encodeURIComponent(movie.poster)}`;
                    try {
                        const color = await average(proxyImageUrl, { format: 'hex' });
                        return color;
                    } catch (error) {
                        console.error(`Error calculating average color for image URL: ${movie.poster}`, error);
                        return '#FFFFFF';
                    }
                };
    
                // Compute the average color for the selected movie
                const avgColor = await computeAvgColor(selectedMovie);
                
                // Add the computed avgColor to the selectedMovie object
                const movieWithColor = {
                    ...selectedMovie,
                    avgColor: avgColor
                };
    
                // Update the state with the movie data that has the avgColor
                setMovie(movieWithColor);
    
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, [movieId]);
    

    // Render a loading message if movie details haven't been fetched yet
    if (!movie) return <div>Loading...</div>;

    return (
        <div class="grid grid-cols-2 gap-8">
            <div className=" h-full w-max grid grid-cols-3 gap-8">
                <div className="h-max w-max text-white">
                    <div 
                        key={movie._id}
                        className="px-1 py-1 rounded-lg"
                        style={{
                            boxShadow: "0.4rem 0.4rem 0 #000",
                            backgroundColor: movie.avgColor,
                        }}>
                        <img className="h-44 max-w-full object-cover rounded-lg" src={movie.poster} alt={movie.title} />
                    </div>    
                </div>
                <div className="h-max w-32 text-white">
                    <h2><strong>Title: </strong>{movie.title}</h2>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                </div>
            </div>
            <div>
                <Completion />
            </div>

        </div>

        
    );
};

export default MovieDetails;
