import React from "react";
import ReactMarkdown from 'react-markdown'
import { toFormatDate } from "../utils/format_date";

const FilmInfo = ({ film }) => {
  console.log(film);
  const backgroundImg = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)), url("${film.backgroundImage}")`,
  };

  const backgroundColor = {
    backgroundImage: `linear-gradient(${film.backgroundColor} 10%, rgba(0, 0, 0, 0.8))`,
  };

  return (
    <div
      style={film.backgroundImage ? backgroundImg : backgroundColor}
      className="back-height"
    >
      <div className="content">
        <h1>{film.title}</h1>
        <div className="video">
          <iframe
            src={`https://www.youtube.com/embed/${film.id}?controls=0&modestbranding=1&iv_load_policy=3&hl=fr-ca`}
            title={film.title}
          />
        </div>

        <div className="overview-container">
          <p>
            <span className="greyed">Date : </span> {toFormatDate(film.date)}
          </p>
          <p>
            <span className="greyed">Créateur : </span> {film.creator}
          </p>
          <ReactMarkdown className="overview">{film.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
