import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StyledLink from "./StyledLink";
import { Grid, Typography } from "@material-ui/core";

/**
 * Responsive displaying the list of movies
 * @param {*} props The list of movies
 * @returns
 */
export default function MoviesList(props) {
  return (
    // This library help us to fetch more data
    // when scroll down to the bottom of the list
    <InfiniteScroll
      dataLength={props.movies.length}
      next={props.loadNextMovies}
      hasMore={props.hasMoreMovies}
      loader={
        <Typography align="center" noWrap variant="subtitle1">
          Loading...
        </Typography>
      }
    >
      <Grid
        data-testid="MOVIES_CONTAINER_ID"
        item
        lg={12}
        container
        spacing={4}
        alignItems="flex-end"
        style={{
          marginTop: 8,
        }}
      >
        {props.movies.map((item) => {
          const link = `/moviedetail/${item.imdbID}`;
          return (
            <Grid
              data-testid={`MOVIES_ITEM_ID_${item.imdbID}`}
              key={item.imdbID}
              item
              lg={3}
              sm={6}
              xs={12}
              style={{ textAlign: "center" }}
            >
              <StyledLink to={link}>
                <img
                  src={`${item.Poster}`}
                  srcSet={`${item.Poster}`}
                  alt={item.Title}
                  loading="lazy"
                />
                <Typography align="center" noWrap variant="h6">
                  {item.Title}
                </Typography>
              </StyledLink>
            </Grid>
          );
        })}
      </Grid>
    </InfiniteScroll>
  );
}
