import React from "react";
import VideoCard from "./VideoCard.js";

const VideoListScrollerItem = ({ video, itemId }) => {
  return (
    <div className="video-list-scroller-component-item">
      <VideoCard key={video.id} video={video} isAnimate={true} />
    </div>
  );
};

export default VideoListScrollerItem;
