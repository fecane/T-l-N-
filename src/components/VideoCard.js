import React, { useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <Link to={`/videos/${video.id}`}>
      <div
        className="video-card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {video.image ? (
          <div>
            <img className="video-card-image" src={video.image} alt={video.title} />
            <h3 className="video-title">{video.title}</h3>
          </div>
        ) : (
          <div className="video-card-image" style={{backgroundColor: video.backgroundColor}}><h3 className="video-title visible">{video.title}</h3></div>
        )}

        {isHovering && <h3 className="video-title">{video.title}</h3>}
      </div>
    </Link>
  );
};

export default VideoCard;
