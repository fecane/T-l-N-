import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video, isAnimate }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  const cardAnimateState = isAnimate ? 'animate' : '';
  const cardHoverState = isHovering ? 'hover' : '';
  const titleVisibleState = isHovering || !video.image ? 'visible' : '';

  return (
    <Link to={`/videos/${video.id}`}>
      <div
        className={`video-card ${cardHoverState} ${cardAnimateState}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {video.image ? (
          <div>
            <img
              className="video-card-image"
              src={video.image}
              alt={video.title}
            />
          </div>
        ) : (
          <div
            className="video-card-image"
            style={{ backgroundColor: video.backgroundColor }}
          >
          </div>
        )}
        <h3 className={`video-card-title ${titleVisibleState}`}>{video.title}</h3>
      </div>
    </Link>
  );
};

export default VideoCard;
