import React, { useEffect, useState } from "react";
import Animate from "react-smooth";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { useFilmSpotlight } from "../context/FilmContext";
import { toFormatDate } from "../utils/format_date";

const Header = () => {
  const films = useFilmSpotlight();
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (isRunning) {
      return;
    }
    const t = setTimeout(() => {
      if (current + 1 < films.length) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
      setIsRunning(false);
    }, 5000);
    setTimer(t);
    setIsRunning(true);
    return () => clearTimeout(timer);
  }, [isRunning, timer, films, current]);

  const handleSliderClick = (index) => {
    setCurrent(index);
    setIsRunning(false);
  };

  const render = () => {
    const backgroundImg = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("${films[current].backgroundImage}")`,
    };

    const backgroundColor = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, ${films[current].backgroundColor})`,
    };
    return (
      <div key={films[current].id}>
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={
              films[current].backgroundImage ? backgroundImg : backgroundColor
            }
            className="bgImage"
          >
            <div className="popularInfo">
              <h1>{films[current].title}</h1>
              <p className="release-date">
                Date : {toFormatDate(films[current].date)}
              </p>
              <ReactMarkdown className="header-overview">{films[current].summary ?? films[current].description}</ReactMarkdown>
              <Link to={`/films/${films[current].id}`}>
                <button>Regarder</button>
              </Link>
            </div>
            <div className="switchImg">
              {films.map((movie, index) => (
                <div
                  key={index}
                  className={current === index ? "active" : null}
                  onClick={() => handleSliderClick(index)}
                />
              ))}
            </div>
          </div>
        </Animate>
      </div>
    );
  };

  return (
    <header>
      <div className="popular">{films.length > 0 ? render() : null}</div>
    </header>
  );
};

export default Header;
