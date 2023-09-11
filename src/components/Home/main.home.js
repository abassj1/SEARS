// import { NavLink } from "react-router-dom";
// import ExampleImg from '../../assets/IMG_3003.JPG';
import { Link } from "react-router-dom";
import Completion from "./completion.chatgpt";
import { average } from 'color.js'
import { useState, useEffect } from 'react'


const Home = (props) => { 
const [movies, setMovies] = useState([]); // Ensure this line is present and correctly written
const [searchTerm, setSearchTerm] = useState("");
const handleChange = (event) => {
  setSearchTerm(event.target.value);
};


  // ------------------------------------------------------------BEFORE COLOUR PICKER
  useEffect(() => {
    const fetchMoviesAndColors = async () => {
        try {
            // Fetch movies from the backend
            const response = await fetch("http://localhost:3001/movies");
            const data = await response.json();

            const computeAvgColor = async (movie) => {
                const proxyImageUrl = `http://localhost:3001/fetch-image?url=${encodeURIComponent(movie.poster)}`;
                try {
                    const color = await average(proxyImageUrl, { format: 'hex' });
                    return { ...movie, avgColor: color };
                } catch (error) {
                    console.error(`Error calculating average color for image URL: ${movie.poster}`, error);
                    return { ...movie, avgColor: '#FFFFFF' };
                }
            };

            const moviesWithColors = await Promise.all(data.map(computeAvgColor));
            setMovies(moviesWithColors);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    fetchMoviesAndColors();
}, []);


  return (
    <div class="grid grid-cols-2 gap-8">

      <div class="min-h-screen justify-start">
        <div class="mb-6 mt-6">
          <form>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" 
                  id="default-search" 
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Search Movies and TV Shows" 
                  required value={searchTerm} 
                  onChange={handleChange}/>
                <button type="submit" class="text-black absolute right-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:bg-yellow-500 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
          </form>
        </div>
        
        {/* ----------------------------------BEFORE DB CONNECTION-------------------------------- */}
        {/* <div class="h-max w-max grid grid-cols-3 gap-8">
          <div className="px-1 py-1 rounded-lg"
              style={{
                boxShadow: "0.4rem 0.4rem 0 #222",
                backgroundColor: imgBorderColor,
              }}>
            <img class="h-44 max-w-full object-cover rounded-lg" src="https://images.tbco.app/blob-image/www.movienewsletters.net/photos/309732R1.jpg" alt=""/>
          </div>
        </div> */}

        {/* ----------------------------------AFTER DB CONNECTION-------------------------------- */}
       {/* Dynamic rendering of movies */}
        <div className="h-max w-max grid grid-cols-3 gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            {movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())).map(filteredMovie => (
              <Link to={`/movie/${filteredMovie._id}`} key={filteredMovie._id}>
                <div 
                    key={filteredMovie._id}
                    className="px-1 py-1 rounded-lg"
                    style={{
                        boxShadow: "0.4rem 0.4rem 0 #000",
                        backgroundColor: filteredMovie.avgColor,
                    }}>
                    <img className="h-44 max-w-full object-cover rounded-lg" src={filteredMovie.poster} alt={filteredMovie.title} />
                </div>
              </Link>
            ))} 
        </div>

        {/* -------------------------------------AFTER AVG COLOR METHOD-------------------------------- */}
        
      </div>

      <div>
        <Completion />
      </div>

    </div>
    
  );
};

export default Home;
