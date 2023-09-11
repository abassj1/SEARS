import React from "react";
import MovieDetails from './components/MovieDetails/MovieDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayouts from "./components/Layouts/main.layouts";
import { Sidebar } from "./components/Layouts/sidebar.layouts";
import Home from "./components/Home/main.home";
import FAQ from "./components/FAQ/main.faq";

const App = () => {
  return (
    <MainLayouts>
      <BrowserRouter>
        <div className="bg-[#1c1c1c] flex">
          <Sidebar />
          <main className="bg-[#1c1c1c] p-7 flex1">
            <Routes>
            <Route path="/movie/:movieId" element={<MovieDetails />} />
              <Route
                path="/"
                element={
                  <Home
                    title="SEARS"
                    description="SEARS, short for Smart Entertainment Analysis & Recommendation System, is a state-of-the-art tool that uses artificial intelligence to review and suggest entertainment content. It features a unique chatbot function to interactively guide users through content, enriching their exploration experience in distinctive ways."
                  />
                }
              />
              <Route path="/question" element={<FAQ />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MainLayouts>
  );
};

export default App;
