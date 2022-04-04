import React, { useState } from "react";
import { Link } from "react-router-dom";

const FilmCard = ({ film }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <Link to={`/films/${film.id}`}>
      <div
        className="film-card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {film.image ? (
          <div>
            <img className="film-card-image" src={film.image} alt={film.title} />
            <h3 className="film-title">{film.title}</h3>
          </div>
        ) : (
          <div className="film-card-image" style={{backgroundColor: film.backgroundColor}}><h3 className="film-title visible">{film.title}</h3></div>
        )}

        {isHovering && <h3 className="film-title">{film.title}</h3>}
      </div>
    </Link>
  );
};

export default FilmCard;
