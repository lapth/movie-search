import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { timeout, SEARCH_DELAY } from "../../helper/utils";
import MovieSearch from "./../MovieSearch";
import MovieContext, { defaultMovies } from "./../../context/MovieContext";
import { useState } from "react";

function MockedMovieSearch(props) {
  const [movies, setMovies] = useState(defaultMovies);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      <BrowserRouter>
        <MovieSearch {...props} />
      </BrowserRouter>
    </MovieContext.Provider>
  );
}

function generateMovies(numFrom, numTo) {
  let rs = [];
  for (let i = numFrom; i <= numTo; i++) {
    rs.push({
      imdbID: `imdbID ${i}`,
      Poster: `Poster ${i}`,
      Title: `Title ${i}`,
    });
  }
  return rs;
}

describe("Testing MovieSearch component", () => {
  let mockedFetch;

  beforeEach(() => {
    mockedFetch = jest.spyOn(window, "fetch");
    mockedFetch.mockResolvedValue({
      json: () => {
        return {
          Search: generateMovies(1, 5),
          totalResults: 50,
        };
      },
    });
    console.error = () => {};
    render(<MockedMovieSearch />);
  });

  afterEach(() => {});

  it("should render movie search page", () => {
    const searchBarEle = screen.getByTestId("SEARCH_BAR_ID");
    expect(searchBarEle).toBeTruthy();
    const moviesContainer = screen.getByTestId("MOVIES_CONTAINER_ID");
    expect(moviesContainer).toBeTruthy();
  });

  it("should search movie if movie title changed", async () => {
    const movieTitleInp = screen.getByPlaceholderText("Movie title …");
    fireEvent.change(movieTitleInp, { target: { value: "some thing" } });
    expect(movieTitleInp.value).toBe("some thing");
    await timeout(SEARCH_DELAY + 100);
    const moviesPreviews = await screen.findAllByTestId(/MOVIES_ITEM_ID/i);
    expect(moviesPreviews.length).toBe(5);
  });

  it("should display no movie preview item if the movie title is empty", async () => {
    const movieTitleInp = screen.getByPlaceholderText("Movie title …");
    fireEvent.change(movieTitleInp, { target: { value: "some thing" } });
    await timeout(SEARCH_DELAY + 100);
    fireEvent.change(movieTitleInp, { target: { value: "" } });
    await timeout(SEARCH_DELAY + 100);
    const moviesPreviews = screen.queryAllByTestId(/MOVIES_ITEM_ID/i);
    expect(moviesPreviews.length).toBe(0);
  });
});
