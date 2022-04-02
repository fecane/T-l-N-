import React, { createContext, useState, useEffect } from "react";
import FilmFacade from "./FilmFacade";

const FilmContext = createContext();

function useFilmCategories() {
  const context = React.useContext(FilmContext);
  if (!context) {
    return [];
  }
  return context.getCategories();
}

function useFilmSpotlight() {
  const context = React.useContext(FilmContext);
  if (!context) {
    return [];
  }
  return context.getSpotlight();
}

function FilmContextProvider({ children }) {
  const [filmFacade, setFilmFacade] = useState(undefined);

  const render = () => ({ ...children });

  useEffect(() => {
    const url = fetch("/data/films.json");
    url
      .then((req) => req.json())
      .then((data) => {
        setFilmFacade(new FilmFacade(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FilmContext.Provider value={filmFacade}>{render()}</FilmContext.Provider>
  );
}

export { FilmContextProvider, useFilmCategories, useFilmSpotlight };
