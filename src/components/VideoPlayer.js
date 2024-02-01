import React from "react";
import ReactMarkdown from "react-markdown";
import { toFormatDate } from "../utils/format_date";
import "./VideoPlayer.css";

const VideoPlayer = ({ video }) => {
  const backgroundImg = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.8)), url("${video.backgroundImage}")`,
  };

  const backgroundColor = {
    backgroundImage: `linear-gradient(${video.backgroundColor} 50%, rgba(0, 0, 0, 0.8))`,
  };

  const playlist = video.playlist ? `&list=${video.playlist}` : "";

  return (
    <div className="video-player">
      <div
        style={video.backgroundImage ? backgroundImg : backgroundColor}
        className="video-player-background"
      >
        <div className="video-player-content">
          <h1 className="video-player-title">{video.title}</h1>
          <div className="video-player-video">
            <iframe
              className="video-player-video-iframe"
              src={`https://www.youtube.com/embed/${video.id}?controls=1&modestbranding=1&iv_load_policy=3&hl=fr-ca&autoplay=1&fs=1&enablejsapi=1&enablecastapi=1%&rel=0${playlist}`}
              allow="fullscreen;"
              title={video.title}
            />
          </div>

          <div className="video-player-info">
            <p>
              <span className="video-player-info-property">Date : </span>{" "}
              {toFormatDate(video.date)}
            </p>
            <p>
              <span className="video-player-info-property">Créateur : </span>{" "}
              {video.creator}
            </p>
            <ReactMarkdown className="video-player-info-description">
              {video.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
