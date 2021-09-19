import { debounce } from "lodash";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  styled,
  alpha,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SEARCH_DELAY } from "./../helper/utils";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  flexGrow: 1,
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")({
  paddingLeft: 4,
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledInputBase = styled(InputBase)({
  color: "inherit",
  width: "100%",
});

export default function SearchBar(props) {
  // Delay callback when typing
  const debounceCallback = debounce(props.onChange, SEARCH_DELAY);

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="SEARCH_BAR_ID">
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Movie title …"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => debounceCallback(event.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
