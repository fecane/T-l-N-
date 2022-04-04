import React from "react";
import FilmCard from "./FilmCard.js";

const FilmListScrollerItem = ({ film, itemId }) => {
  return (
    <div className="film-list-scroller-item">
      <FilmCard key={film.id} film={film} />
    </div>
  );
};

export default FilmListScrollerItem;
