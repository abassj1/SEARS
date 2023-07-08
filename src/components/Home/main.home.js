// import { NavLink } from "react-router-dom";
import Completion from "./completion.chatgpt";
import { average } from 'color.js'
import { useState, useEffect } from 'react'
// import ExampleImg from '../../assets/IMG_3003.JPG';



const Home = (props) => {

  const [imgBorderColor, setImgBorderColor] = useState("#fff"); // default color

  useEffect(() => {
    average("https://cdn.mos.cms.futurecdn.net/WncM979qcmmhRW8LXkkDvW-1920-80.jpg.webp", { format: 'hex' })
      .then((color) => {
        console.log(color);  // logs the color value in hex
        setImgBorderColor(color);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div class="grid grid-cols-2 gap-8">
      {/* <h1 className="font-medium text-2xl md:text-7xl text-dark">
        {props.title}
      </h1> */}

      <div class="min-h-screen justify-start">
        <div class="mb-6 mt-6">
          <form>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Movies and TV Shows" required/>
                <button type="submit" class="text-black absolute right-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:bg-yellow-500 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
          </form>
        </div>
        
        <div class="h-max w-max grid grid-cols-3 gap-8">
          <div className="px-1 py-1 rounded-lg"
              style={{
                boxShadow: "0.4rem 0.4rem 0 #222",
                backgroundColor: imgBorderColor,
              }}>
            <img class="h-44 max-w-full object-cover rounded-lg" src="https://images.tbco.app/blob-image/www.movienewsletters.net/photos/309732R1.jpg" alt=""/>
          </div>
        </div>
      </div>


      {/* <div className="mt-10 md:pr-24 md:pl-24">
        <h1 className="font-medium text-2xl md:text-7xl text-dark">
          {props.title}
        </h1>
        <p className="text-xs md:text-base text-gray-600 pt-3">
          {props.description}
        </p>
        <NavLink to="/chatgpt">
          <button
            type="button"
            className="mt-5 w-36 md:w-52 md:h-15 md:text-2xl font-medium rounded-lg px-5 py-2.5 border-2 border-black shadow-lg text-center mr-2 mb-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-dark"
            style={{ boxShadow: "0.4rem 0.4rem 0 #222" }}
          >
            Let's Go
          </button>
        </NavLink>
      </div> */}

      <div>
        <Completion />
      </div>
    </div>
    
  );
};

export default Home;
