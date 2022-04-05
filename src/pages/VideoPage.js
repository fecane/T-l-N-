import React from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useVideo } from "../context/VideoContext";

const VideoPage = () => {
  const { videoID } = useParams();
  const video = useVideo(videoID);
  console.log(videoID);
  const render = () => {
    if (video) {
      return <VideoPlayer video={video} />;
    }
    return "loading";
  };

  return (
    <div>
      <div className="video-page">{render()}</div>
    </div>
  );
};

export default VideoPage;
