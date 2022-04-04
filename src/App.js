import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import "./style.css";
import { VideoContextProvider } from "./context/VideoContext";

class App extends Component {
  render() {
    return (
      <VideoContextProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/videos/:videoID" element={<VideoPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </VideoContextProvider>
    );
  }
}

export default App;
