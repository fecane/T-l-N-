import React, { createContext, useState, useEffect } from "react";
import { parse } from "yaml";
import VideoFacade from "./VideoFacade";

const VideoContext = createContext();

function useVideoCategory(id) {
  const context = React.useContext(VideoContext);
  if (!context) {
    return undefined;
  }
  return context.getCategory(id);
}

function useVideo(id) {
  const context = React.useContext(VideoContext);
  if (!context) {
    return undefined;
  }
  return context.getVideo(id);
}

function useVideoCategories() {
  const context = React.useContext(VideoContext);
  if (!context) {
    return [];
  }
  return context.getCategories();
}

function useVideosByCategory(id) {
  const context = React.useContext(VideoContext);
  if (!context) {
    return [];
  }
  return context.getVideosByCategory(id);
}

function useVideoSearch(query, cb) {
  const context = React.useContext(VideoContext);

  useEffect(() => {
    if (!context || query.trim().length < 3) {
      cb([]);
      return;
    }
    const results = context.search(query);
    cb(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, query]);
}

function useVideoSpotlight() {
  const context = React.useContext(VideoContext);
  if (!context) {
    return [];
  }
  return context.getSpotlight();
}

function VideoContextProvider({ children }) {
  const [videoFacade, setVideoFacade] = useState(undefined);
  const [loadingError, setLoadingError] = useState(undefined);

  const render = () => {
    if (loadingError || (videoFacade && videoFacade.errors.length > 0)) {
      return (
        <div>
          <p>Attention: Il exist des problems avec "videos.yaml":</p>
          {loadingError ? <pre>{loadingError.message}</pre> : null}
          {videoFacade ? (
            <ul>
              {videoFacade.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    }
    return { ...children };
  };

  useEffect(() => {
    const url = fetch(`/data/videos.yaml?ts=${new Date().getTime()}`);
    url
      .then((req) => req.text())
      .then((data) => {
        const json = parse(data);
        setVideoFacade(new VideoFacade(json));
      })
      .catch((err) => setLoadingError(err));
  }, []);

  return (
    <VideoContext.Provider value={videoFacade}>
      {render()}
    </VideoContext.Provider>
  );
}

export {
  VideoContextProvider,
  useVideo,
  useVideoCategory,
  useVideoCategories,
  useVideosByCategory,
  useVideoSearch,
  useVideoSpotlight,
};
