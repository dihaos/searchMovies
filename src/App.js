import React, { useReducer, useEffect } from "react";

import Movie from "./components/Movie";
import spinner from "./assets/ajax-loader.gif";
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer";
import axios from "axios";
import './App.css'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=batman&apikey=4a3b711b";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
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

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <div className="App-header">
          <h2>Search for movies and serials</h2>
        </div>

        <Search search={search} />

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div >
  );
};

export default App;