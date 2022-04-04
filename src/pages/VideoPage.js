import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../header/Navbar";
import Footer from "../header/Footer";
import VideoPlayer from "../components/VideoPlayer";
import { useVideo } from "../context/VideoContext";

const VideoPage = () => {
  const { videoID } = useParams();
  const video = useVideo(videoID);
  console.log(videoID)
  const render = () => {
    if (video) {
      return <VideoPlayer video={video} />;
    }
    return "loading";
  };

  return (
    <div>
      <Navbar />
      <div className="video-page">{render()}</div>
      <Footer />
    </div>
  );
};

export default VideoPage;
