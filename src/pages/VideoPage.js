import React from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useVideo } from "../context/VideoContext";

const VideoPage = () => {
  const { videoID } = useParams();
  const video = useVideo(videoID);

  if (!video) {
    return null;
  }

  return (
    <div>
      <div className="video-page">
        <VideoPlayer video={video} />
      </div>
    </div>
  );
};

export default VideoPage;
