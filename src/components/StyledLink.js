import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core";

/**
 * Styled link to remove unwanted styles
 */
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

export default (props) => <StyledLink {...props} />;
