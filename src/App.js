import React, { useEffect, useState,useCallback} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetchMoviesHandler();
  },[]);


  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
     
      if (!response.ok) {
        throw new Error("Something went wrong here!!!");
      }

      const data = await response.json();


      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
     
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length == 0 && !error && <p>Found no movies.</p>}
        {isloading && <p>Loading...</p>}
        {!isloading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
