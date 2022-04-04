import React from "react";
import Header from "../header/Header";
import Navbar from "../header/Navbar";
import Footer from "../header/Footer";
import { useVideoCategories } from "../context/VideoContext";
import VideoListScroller from "../components/VideoListScroller";

const HomePage = () => {
  const categories = useVideoCategories();
  return (
    <div>
      <Navbar />
      <Header />
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <VideoListScroller heading={category.title} id={category.id} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
