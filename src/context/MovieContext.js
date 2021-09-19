import { createContext } from "react";

export const defaultMovies = {
  movies: [], // The list of movies
  hasMore: false, // Should load more?
  curPage: 1, // Current page of data
  total: 0, // Total movies found
  title: "",
};

const MovieContext = createContext({
  movies: defaultMovies,
  setMovies: () => {},
});

export default MovieContext;
