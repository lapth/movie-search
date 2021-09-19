import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import MoviesList from "../MoviesList";

const MockedMoviesList = (props) => {
  return (
    <BrowserRouter>
      <div style={{ height: "100px", width: "100px" }}>
        <MoviesList {...props} />
      </div>
    </BrowserRouter>
  );
};

function generateMovies(num) {
  let rs = [];
  for (let i = 1; i <= num; i++) {
    rs.push({
      imdbID: `imdbID ${i}`,
      Poster: `Poster ${i}`,
      Title: `Title ${i}`,
    });
  }
  return rs;
}

describe("Testing MoviesList component", () => {
  let loadNextMoviesMocked = jest.fn();
  let container;

  beforeEach(() => {
    const mockedProps = {
      movies: generateMovies(2),
      loadNextMovies: loadNextMoviesMocked,
      hasMoreMovies: true,
    };
    container = render(<MockedMoviesList {...mockedProps} />).container;
  });

  afterEach(() => {});

  it("should render movies list container", () => {
    const moviesContainer = screen.getByTestId("MOVIES_CONTAINER_ID");
    expect(moviesContainer).toBeTruthy();
  });

  it("should render 2 movie preview", async () => {
    const moviesPreviews = await screen.findAllByTestId(/MOVIES_ITEM_ID/i);
    expect(moviesPreviews.length).toBe(2);
  });

  xit("should load more movies when scroll", async () => {
    // jest.useFakeTimers();
    const scrollEvent = new Event("scroll");
    const node = container.querySelector(".infinite-scroll-component");
    node.dispatchEvent(scrollEvent);
    // jest.runOnlyPendingTimers();
    expect(loadNextMoviesMocked).toHaveBeenCalled();
  });

  xit("should render 2 columns on medium window size", () => {});

  xit("should render only one column on small window size", () => {});
});
