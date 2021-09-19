import AppConfig from "./config";
import MovieSearch from "./components/MovieSearch";
import MovieDetail from "./components/MovieDetail";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import MovieContext, { defaultMovies } from "./context/MovieContext";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState(defaultMovies);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      <Router>
        <Switch>
          <Route exact path="/" component={MovieSearch} />
          <Route path="/moviedetail/:movieId" component={MovieDetail} />
        </Switch>
      </Router>
    </MovieContext.Provider>
  );
}

export default App;
