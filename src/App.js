import React, { useReducer, useEffect } from "react";
import Movie from "./components/Movie";
import spinner from "./assets/ajax-loader.gif";
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer";
import './App.css'
import requestMovies from "./request";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;

  useEffect(() => {
    requestMovies.getFoundMovies('batman').then(res => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: res.data.Search
      });
    })
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    requestMovies.getFoundMovies(searchValue).then(res => {
      if (res.data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: res.data.Search
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: 'Ничего не найдено'
        });
      }
    }
    );
  };

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