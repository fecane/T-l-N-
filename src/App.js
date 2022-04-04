import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";
import "./style.css";
import { FilmContextProvider } from "./context/FilmContext";

class App extends Component {
  render() {
    return (
      <FilmContextProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/films/:filmID" element={<FilmPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </FilmContextProvider>
    );
  }
}

export default App;
