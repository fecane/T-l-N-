import React from "react";
import VideoCard from "./VideoCard.js";

const VideoListScrollerItem = ({ video, itemId }) => {
  return (
    <div className="video-list-scroller-item">
      <VideoCard key={video.id} video={video} />
    </div>
  );
};

export default VideoListScrollerItem;
