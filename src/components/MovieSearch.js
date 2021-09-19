import { useEffect, useContext, useRef } from "react";
import MoviesList from "./MoviesList";
import SearchBar from "./SearchBar";
import * as Transporter from "../helper/Transporter";
import MovieContext, { defaultMovies } from "../context/MovieContext";
import { OMDB_API_URL } from "./../helper/utils";

export default function MovieSearch() {
  // Load movies from context
  const { movies, setMovies } = useContext(MovieContext);
  // Track the first render state
  const mountRef = useRef(false);

  useEffect(() => {
    // Do not perform fetch data on first render
    if (mountRef.current) {
      fetchMovieData(true);
    } else {
      mountRef.current = true;
    }
  }, [movies.title]);

  const fetchMovieData = async (loadnews = true, page = 1) => {
    if (!movies.title) {
      setMovies(defaultMovies);
      return;
    }
    const URL = `${OMDB_API_URL}type=movie&s=${movies.title}&page=${page}`;
    const fetchResults = await Transporter.GET(URL);

    const newMovies = [];
    !loadnews && newMovies.push(...movies.movies);
    fetchResults.Search && newMovies.push(...fetchResults.Search);
    const total = Number.parseInt(fetchResults.totalResults);
    let hasMore = total > newMovies.length;

    setMovies({
      movies: newMovies,
      total: total,
      hasMore: hasMore,
      curPage: page,
      title: movies.title,
    });
  };

  const loadNextMovies = async () => {
    movies.hasMore &&
      movies.curPage < 100 &&
      fetchMovieData(false, movies.curPage + 1);
  };

  const onMovieTitleChanges = (newMovieTitle) => {
    setMovies({
      ...movies,
      title: newMovieTitle,
    });
  };

  return (
    <>
      <SearchBar onChange={onMovieTitleChanges} />
      {movies.movies && (
        <MoviesList
          movies={movies.movies}
          hasMoreMovies={movies.hasMore}
          loadNextMovies={loadNextMovies}
        />
      )}
    </>
  );
}
