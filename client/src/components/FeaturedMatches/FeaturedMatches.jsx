import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const FeaturedMatches = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid item xs={6} md={4}>
        <Item>xs=6 md=4</Item>
      </Grid>
    </Grid>
  );
};

export default FeaturedMatches;
