import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Link } from "react-router-dom";
import { useVideosByCategory } from "../context/VideoContext.js";
import {
  LeftVideoListScrollerArrow,
  RightVideoListScrollerArrow,
} from "./VideoListScrollerArrows.js";
import VideoListScrollerItem from "./VideoListScrollerItem.js";
import "./VideoListScroller.css";

const VideoListScroller = ({ id, heading }) => {
  const videos = useVideosByCategory(id);

  if (videos.length < 1) {
    return null;
  }

  return (
    <div className="video-list-scroller">
      <h2 className="video-list-scroller-category-title">
        <Link
          className="video-list-scroller-category-link"
          to={`/categories/${id}`}
        >
          {heading}
        </Link>
      </h2>

      <ScrollMenu
        scrollContainerClassName="video-list-scroller-component"
        separatorClassName="video-list-scroller-component-separator"
        LeftArrow={LeftVideoListScrollerArrow}
        RightArrow={RightVideoListScrollerArrow}
        dragging={true}
        wheel={false}
        alignCenter={false}
        clickWhenDrag={false}
      >
        {videos.map((video, index) => (
          <VideoListScrollerItem key={index} itemId={index} video={video} />
        ))}
      </ScrollMenu>
    </div>
  );
};

export default VideoListScroller;
