import React from "react";
import VideoTitleItem from "./VideoTileItem";
import "./VideoTiles.css";

const VideoTiles = ({ videos }) => {
  return (
    <div className="video-tiles">
      <div className="video-tiles-container">
        {videos.map((video, index) => (
          <VideoTitleItem key={index} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoTiles;
