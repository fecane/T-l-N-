import React from "react";
import ReactMarkdown from 'react-markdown'
import { toFormatDate } from "../utils/format_date";

const VideoPlayer = ({ video }) => {
  console.log(video);
  const backgroundImg = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)), url("${video.backgroundImage}")`,
  };

  const backgroundColor = {
    backgroundImage: `linear-gradient(${video.backgroundColor} 10%, rgba(0, 0, 0, 0.8))`,
  };

  const playlist = video.playlist ? `&list=${video.playlist}` : '';

  return (
    <div
      style={video.backgroundImage ? backgroundImg : backgroundColor}
      className="back-height"
    >
      <div className="content">
        <h1>{video.title}</h1>
        <div className="video">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?controls=1&modestbranding=1&iv_load_policy=3&hl=fr-ca${playlist}`}
            title={video.title}
          />
        </div>

        <div className="overview-container">
          <p>
            <span className="greyed">Date : </span> {toFormatDate(video.date)}
          </p>
          <p>
            <span className="greyed">Créateur : </span> {video.creator}
          </p>
          <ReactMarkdown className="overview">{video.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
