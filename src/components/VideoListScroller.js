import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useVideosByCategory } from "../context/VideoContext.js";
import { LeftVideoListScrollerArrow, RightVideoListScrollerArrow } from "./VideoListScrollerArrows.js";
import VideoListScrollerItem from "./VideoListScrollerItem.js";

const VideoListScroller = ({ id, heading }) => {
  const videos = useVideosByCategory(id);
  return (
    <div className="lists">
      <h2>{heading}</h2>

      <ScrollMenu
        scrollContainerClassName="video-list-scroller"
        separatorClassName="video-list-scroller-separator"
        LeftArrow={LeftVideoListScrollerArrow}
        RightArrow={RightVideoListScrollerArrow}
        dragging={true}
        wheel={false}
        alignCenter={false}
        clickWhenDrag={false}
      >
        {videos.map((video, index) => (
          <VideoListScrollerItem key={index} itemId={index} video={video}/>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default VideoListScroller;
