import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useFilmsByCategory } from "../context/FilmContext.js";
import { LeftFilmListScrollerArrow, RightFilmListScrollerArrow } from "./FilmListScrollerArrows.js";
import FilmListScrollerItem from "./FilmListScrollerItem.js";

const FilmListScroller = ({ id, heading }) => {
  const films = useFilmsByCategory(id);
  return (
    <div className="lists">
      <h2>{heading}</h2>

      <ScrollMenu
        scrollContainerClassName="film-list-scroller"
        separatorClassName="film-list-scroller-separator"
        LeftArrow={LeftFilmListScrollerArrow}
        RightArrow={RightFilmListScrollerArrow}
        dragging={true}
        wheel={false}
        alignCenter={false}
        clickWhenDrag={false}
      >
        {films.map((film, index) => (
          <FilmListScrollerItem key={index} itemId={index} film={film}/>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default FilmListScroller;
