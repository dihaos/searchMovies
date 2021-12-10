import React, { useState } from "react";
import InfoAboutMovie from "./InfoAboutMovie";

const Movie = ({ movie }) => {
  const [show, setShow] = useState(false)

  const openAndCloseMovie = (bool) => {
    setShow(bool)
    if (bool) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  return (
    <>
      {show &&
        <>
          <InfoAboutMovie movie={movie} show={show} closeMovie={openAndCloseMovie} />
          <div className='shadowWindow' />
        </>
      }
      <div className="movie">
        <h3>{movie.Title}</h3>
        {movie.Poster === "N/A" ?
          'Нет изображения'
          : < img
            title='Show information'
            className='imgMovie'
            onClick={() => openAndCloseMovie(true)}
            alt={`The movie titled: ${movie.Title}`}
            src={movie.Poster}
          />}
        <p>Year: {movie.Year}</p>
      </div>
    </>
  );
};

export default Movie;