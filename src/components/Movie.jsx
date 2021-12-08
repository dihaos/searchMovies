import React from "react";

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
        {movie.Poster === "N/A" ?
          'Нет изображения'
          : < img
            width="200"
            alt={`The movie titled: ${movie.Title}`}
            src={movie.Poster}
          />}
      <p>Год: {movie.Year}</p>
    </div>
  );
};

export default Movie;