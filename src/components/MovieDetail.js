import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import StyledLink from "./StyledLink";
import { useParams } from "react-router-dom";
import * as Transporter from "./../helper/Transporter";
import { OMDB_API_URL } from "./../helper/utils";

/**
 * The movie detail component
 * @param {*} props
 * @returns
 */
export default function MovieDetail(props) {
  const { movieId } = useParams();

  const [movieDetail, setMovieDetail] = React.useState({});

  const fetchMovieDetail = async () => {
    const URL = `${OMDB_API_URL}i=${movieId}`;
    const fetchResults = await Transporter.GET(URL);
    setMovieDetail(fetchResults);
  };

  React.useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    movieDetail && (
      <>
        <Box sx={{ flexGrow: 1 }} data-testid="BACK_BUTTON_ID">
          <AppBar position="static">
            <Toolbar>
              <StyledLink to="/" style={{ textDecoration: "none" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<BackIcon />}
                >
                  Back
                </Button>
              </StyledLink>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          data-testid="MOVIE_DETAIL_ID"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            bgcolor: "background.paper",
            overflow: "hidden",
            boxShadow: 1,
            fontWeight: "bold",
            padding: 4,
          }}
        >
          <img
            src={`${movieDetail.Poster}`}
            srcSet={`${movieDetail.Poster}`}
            alt={movieDetail.Title}
            loading="lazy"
          />
          <Box
            sx={{
              paddingLeft: { md: "4px" },
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {movieDetail.Title}
            </Typography>
            <Typography variant="h6" component="div">
              {movieDetail.Plot}
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
              }}
              data-testid="MOVIE_DETAIL_RES_ID"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {"Director:"}&nbsp;
                </Typography>
                <Typography variant="body1" component="div">
                  {movieDetail.Director}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {"Writers:"}&nbsp;
                </Typography>
                <Typography variant="body1" component="div">
                  {movieDetail.Writer}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {"Stars:"}&nbsp;
                </Typography>
                <Typography variant="body1" component="div">
                  {movieDetail.Actors}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
}
