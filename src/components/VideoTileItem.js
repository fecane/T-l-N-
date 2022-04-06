import React, { useState } from "react";
import { Link } from "react-router-dom";

const VideoTitleItem = ({ video }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  const tileHoverState = isHovering ? "hover" : "";
  const titleVisibleState = isHovering || !video.image ? "visible" : "";

  const backgroundImg = {
    backgroundImage: `url("${video.image}"`,
  };

  const backgroundColor = {
    backgroundColor: video.backgroundColor,
  };

  return (
    <div
      className={`video-tiles-item ${tileHoverState}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="video-tiles-item-container"
        style={video.image ? backgroundImg : backgroundColor}
      >
        <div className="video-tiles-item-title-container">
          <h3 className={`video-tiles-item-title-text ${titleVisibleState}`}>
            <Link
              className="video-tiles-item-title-link"
              to={`/videos/${video.id}`}
            >
              {video.title}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VideoTitleItem;
