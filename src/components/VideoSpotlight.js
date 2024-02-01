import React, { useEffect, useState } from "react";
import Animate from "react-smooth";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useVideoSpotlight } from "../context/VideoContext";
import { toFormatDate } from "../utils/format_date";
import "./VideoSpotlight.css";

const VideoSpotlight = () => {
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
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.1) 90%), url("${videos[current].backgroundImage}")`,
    };

    const backgroundColor = {
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.1) 90%), ${videos[current].backgroundColor})`,
    };
    return (
      <div className="video-spotlight" key={videos[current].id}>
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={
              videos[current].backgroundImage ? backgroundImg : backgroundColor
            }
            className="video-spotlight-background"
          >
            <div className="video-spotlight-info">
              <h1 className="video-spotlight-title">{videos[current].title}</h1>
              <ReactMarkdown className="video-spotlight-info-summary">
                {videos[current].summary ?? videos[current].description}
              </ReactMarkdown>
              <Link to={`/videos/${videos[current].id}`}>
                <button>Visionner</button>
              </Link>
            </div>
            <div className="video-spotlight-selector">
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

export default VideoSpotlight;
