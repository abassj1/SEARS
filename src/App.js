import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Chatgpt from "./components/ChatGPT/main.chatgpt";
// import Dalle from "./components/Dall-E/main.dalle";
import MainLayouts from "./components/Layouts/main.layouts";
import { Sidebar } from "./components/Layouts/sidebar.layouts";
// import Octocat from "./components/Utilities/octocat";
import Home from "./components/Home/main.home";
import FAQ from "./components/FAQ/main.faq";
// import Demo from "./components/Demo/main.demo";

const App = () => {
  return (
    <MainLayouts>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <main className="p-7 flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    title="SEARS"
                    description="SEARS, short for Smart Entertainment Analysis & Recommendation System, is a state-of-the-art tool that uses artificial intelligence to review and suggest entertainment content. It features a unique chatbot function to interactively guide users through content, enriching their exploration experience in distinctive ways."
                  />
                }
              />
              {/* <Route
                path="/chatgpt"
                element={
                  <Chatgpt
                    title="Chat"
                    description="Interacts with AI in a conversational way."
                  />
                }
              /> */}
              {/* <Route
                path="/dall-e"
                element={
                  <Dalle
                    title="Dall·E 2"
                    description="Create original, realistic images and art from a text description"
                  />
                }
              /> */}
              <Route path="/question" element={<FAQ />} />
              {/* <Route path="/demo" element={<Demo />} /> */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MainLayouts>
  );
};

export default App;
