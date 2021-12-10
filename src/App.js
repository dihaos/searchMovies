import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import spinner from "./style/loader.gif";
import Search from "./components/Search";
import './style/App.css'
import requestMovies from "./request";

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    requestMovies.getFoundMovies('batman').then(res => {
      setMovies(res.data.Search)
      setLoading(false)
    })
  }, []);

  const search = searchValue => {
    requestMovies.getFoundMovies(searchValue).then(res => {
      if (res.data.Response === "True") {
        setMovies(res.data.Search)
        setErrorMessage('')
      } else setErrorMessage(res.data.Error)
    });
  }

  const retrievedMovies =
    loading && !errorMessage ?
      <img className="spinner" src={spinner} alt="Loading spinner" />
      : errorMessage ?
        <div className="errorMessage">{errorMessage}</div>
        : movies.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ));

  return (
    <div className="App">
      <div className="m-container">
        <div className="App-header">
          <h2>Search for movies and serials</h2>
        </div>

        <Search search={search} />

        <div className="movies">
          {retrievedMovies}
        </div>
      </div>
    </div >
  );
};

export default App;