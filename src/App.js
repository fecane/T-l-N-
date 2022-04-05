import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoContextProvider } from "./context/VideoContext";
import Navbar from "./header/Navbar";
import Footer from "./header/Footer";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./utils/ScrollToTop";
import "./style.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <VideoContextProvider>
          <BrowserRouter>
            <ScrollToTop>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/videos/:videoID" element={<VideoPage />} />
                <Route
                  path="/categories/:categoryID"
                  element={<CategoryPage />}
                />
              </Routes>
              <Footer />
            </ScrollToTop>
          </BrowserRouter>
        </VideoContextProvider>
      </div>
    );
  }
}

export default App;
