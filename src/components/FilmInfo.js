import React from "react";

const FilmInfo = ({ movie, credits, video }) => {
  const time_convert = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  const backgroundImg = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)), url("https://image.tmdb.org/t/p/original/${
      movie.backdrop_path
    }")`
  };

  const backwithPoster = {
    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.8) 60%), url("https://image.tmdb.org/t/p/original/${
      movie.poster_path
    }")`
  };

  return (
    <div
      style={movie.backdrop_path !== null ? backgroundImg : backwithPoster}
      className="back-height"
    >
      <div className="content">
        <h1>{movie.title}</h1>
        {video.length > 0 ? (
          <div className="video">
            <iframe
              src={`https://www.youtube.com/embed/${video[0].key}`}
              title={video[0].name}
            />
          </div>
        ) : "no video"}

        <p className="year-run-vote">
          <span className="year">
            {new Date(movie.release_date).getFullYear()}
          </span>
          <span className="run">
            {" "}
            {movie.runtime && time_convert(movie.runtime)}
          </span>
          <span className="vote">
            <i className="fas fa-star" /> {movie.vote_average}
          </span>
        </p>
        <div className="overview-container">
          <p className="overview">{movie.overview}</p>
          <p>
            <span className="greyed">Starring: </span>
            {credits.cast &&
              credits.cast.map((cast, i) => {
                if (i < 4) return <span key={cast.cast_id}>{cast.name}, </span>;
                if (i === 4) return <span key={cast.cast_id}>{cast.name}</span>;
                else return null;
              })}
          </p>

          <p>
            <span className="greyed">Genres: </span>
            {movie.genres.map((genre, i, arr) => {
              if (i === arr.length - 1)
                return <span key={genre.id}>{genre.name}</span>;
              return <span key={genre.id}>{genre.name}, </span>;
            })}
          </p>

          {credits && credits.crew.length > 0 && (
            <p>
              <span className="greyed">Director: </span> {credits.crew[0].name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
