import React from "react";
import Header from "../header/Header";
import Navbar from "../header/Navbar";
import Footer from "../header/Footer";
import { useFilmCategories } from "../context/FilmContext";
import FilmListScroller from "../components/FilmListScroller";

const HomePage = () => {
  const categories = useFilmCategories();
  return (
    <div>
      <Navbar />
      <Header />
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <FilmListScroller heading={category.title} id={category.id} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
