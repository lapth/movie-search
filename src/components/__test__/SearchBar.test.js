import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "./../SearchBar";
import { timeout, SEARCH_DELAY } from "./../../helper/utils";

const MockedSearchBar = (props) => {
  return (
    <BrowserRouter>
      <SearchBar {...props} />
    </BrowserRouter>
  );
};

describe("Testing SearchBar component", () => {
  let mockedOnChange;

  beforeAll(() => {
    // TODO: Why it does not work?
    // jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedOnChange = jest.fn();
    render(<MockedSearchBar onChange={mockedOnChange} />);
  });

  afterAll(() => {
    // jest.useRealTimers();
  });

  it("should render SearchBar component", () => {
    const searchBarEle = screen.getByTestId("SEARCH_BAR_ID");
    expect(searchBarEle).toBeTruthy();
  });

  it("should invoked onChange if the value was changed after 300 milisecond", async () => {
    const movieTitleInp = screen.getByPlaceholderText("Movie title …");
    fireEvent.change(movieTitleInp, { target: { value: "fast" } });
    expect(movieTitleInp.value).toBe("fast");
    // jest.runOnlyPendingTimers();
    await timeout(SEARCH_DELAY + 100);
    expect(mockedOnChange).toBeCalled();
  });
});
