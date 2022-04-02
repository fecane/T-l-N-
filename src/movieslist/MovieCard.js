import React from "react";
import SingleMovie from "./SingleMovie.js";

function MovieCard({ onClick, movie, itemId }) {
  return (
    <div className="menu-item" key={movie.id}>
      <SingleMovie movie={movie} />
    </div>
  );
}

export default MovieCard;