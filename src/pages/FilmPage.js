import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../header/Navbar";
import Footer from "../header/Footer";
import FilmInfo from "../components/FilmInfo";

const FilmPage = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(undefined);
  const [credits, setCredits] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  useEffect(() => {
    const urlMovie = fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
    );
    const urlCredits =
      fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=17117ab9c18276d48d8634390c025df4
        `);
    const urlVideos =
      fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=17117ab9c18276d48d8634390c025df4
          `);
    const urls = [urlMovie, urlCredits, urlVideos];

    Promise.all(urls)
      .then(([r1, r2, r3]) => Promise.all([r1.json(), r2.json(), r3.json()]))
      .then(([data1, data2, data3]) => {
        setMovie(data1);
        setCredits(data2);
        setVideo(data3);
      })
      .catch((err) => console.log(err));
  }, [movie_id]);

  const render = () => {
    if (movie && credits && video) {
      return <FilmInfo movie={movie} credits={credits} video={video.results} />;
    }
    return "loading";
  };

  return (
    <div>
      <Navbar />
      <div className="movie-page">{render()}</div>
      <Footer />
    </div>
  );
};

export default FilmPage;
