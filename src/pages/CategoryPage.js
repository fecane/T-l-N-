import React from "react";
import { useParams } from "react-router-dom";
import { useVideoCategory, useVideosByCategory } from "../context/VideoContext";
import VideoTiles from "../components/VideoTiles";

const CategoryPage = () => {
  const { categoryID } = useParams();
  const category = useVideoCategory(categoryID);
  const videos = useVideosByCategory(categoryID);

  if (!category) {
    return null;
  }

  return (
    <div className="category-page">
      <h1>{category.title}</h1>
      <VideoTiles videos={videos} />
    </div>
  );
};

export default CategoryPage;
