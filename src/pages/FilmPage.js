import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../header/Navbar";
import Footer from "../header/Footer";
import FilmInfo from "../components/FilmInfo";
import { useFilm } from "../context/FilmContext";

const FilmPage = () => {
  const { filmID } = useParams();
  const film = useFilm(filmID);
  console.log(filmID)
  const render = () => {
    if (film) {
      return <FilmInfo film={film} />;
    }
    return "loading";
  };

  return (
    <div>
      <Navbar />
      <div className="film-page">{render()}</div>
      <Footer />
    </div>
  );
};

export default FilmPage;
