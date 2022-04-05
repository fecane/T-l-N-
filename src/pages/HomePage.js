import React from "react";
import { useVideoCategories } from "../context/VideoContext";
import VideoListScroller from "../components/VideoListScroller";
import VideoSpotlight from "../components/VideoSpotlight";

const HomePage = () => {
  const categories = useVideoCategories();
  return (
    <div>
      <VideoSpotlight />
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <VideoListScroller heading={category.title} id={category.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
