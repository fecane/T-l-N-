import React, { useEffect, useState } from "react";
import Animate from "react-smooth";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { useVideoSpotlight } from "../context/VideoContext";
import { toFormatDate } from "../utils/format_date";

const Header = () => {
  const videos = useVideoSpotlight();
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (isRunning) {
      return;
    }
    const t = setTimeout(() => {
      if (current + 1 < videos.length) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
      setIsRunning(false);
    }, 5000);
    setTimer(t);
    setIsRunning(true);
    return () => clearTimeout(timer);
  }, [isRunning, timer, videos, current]);

  const handleSliderClick = (index) => {
    setCurrent(index);
    setIsRunning(false);
  };

  const render = () => {
    const backgroundImg = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("${videos[current].backgroundImage}")`,
    };

    const backgroundColor = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, ${videos[current].backgroundColor})`,
    };
    return (
      <div key={videos[current].id}>
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={
              videos[current].backgroundImage ? backgroundImg : backgroundColor
            }
            className="bgImage"
          >
            <div className="popularInfo">
              <h1>{videos[current].title}</h1>
              <p className="release-date">
                Date : {toFormatDate(videos[current].date)}
              </p>
              <ReactMarkdown className="header-overview">{videos[current].summary ?? videos[current].description}</ReactMarkdown>
              <Link to={`/videos/${videos[current].id}`}>
                <button>Visionner</button>
              </Link>
            </div>
            <div className="switchImg">
              {videos.map((movie, index) => (
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
      <div className="popular">{videos.length > 0 ? render() : null}</div>
    </header>
  );
};

export default Header;
