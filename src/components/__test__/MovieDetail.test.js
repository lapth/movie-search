import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import MovieDetail from "./../MovieDetail";

const MockedMovieDetail = (props) => {
  return (
    <BrowserRouter>
      <MovieDetail {...props} />
    </BrowserRouter>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    movieId: "movieId",
  }),
  useRouteMatch: () => ({ url: "/moviedetail/movieId" }),
}));

describe("Testing MovieDetail component", () => {
  let mockedFetch;

  beforeEach(() => {
    mockedFetch = jest.spyOn(window, "fetch");
    mockedFetch.mockResolvedValue({
      json: () => {
        return {
          Poster: "Poster",
          Title: "Title",
          Plot: "Plot",
          Director: "Director",
          Writer: "Writer",
          Actors: "Actors",
        };
      },
    });
    console.error = () => {};
    render(<MockedMovieDetail />);
  });

  afterEach(() => {});

  it("should render BACK button", () => {
    const backButton = screen.getByTestId("BACK_BUTTON_ID");
    expect(backButton).toBeTruthy();
  });

  it("should render the detail section", () => {
    const movieDetailSection = screen.getByTestId("MOVIE_DETAIL_ID");
    expect(movieDetailSection).toBeTruthy();
  });

  it("should render all movie detail information", () => {
    const movieTitle = screen.getByText("Title");
    expect(movieTitle).toBeTruthy();

    const moviePlot = screen.getByText("Plot");
    expect(moviePlot).toBeTruthy();

    const movieDirector = screen.getByText("Director");
    expect(movieDirector).toBeTruthy();
  });

  xit("should display only movie title on movie description on small screen", () => {
    // TODO: to be done with Enzyme
  });
});
