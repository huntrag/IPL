import React from "react";
import { Grid } from "@mui/material";
import MatchCard from "../../components/MatchCard/MatchCard";

const Matches = () => {
  return (
    <Grid container rowSpacing={3}>
      <Grid item sx={{ m: 2 }}>
        <MatchCard />
      </Grid>
      <Grid item sx={{ m: 2 }}>
        <MatchCard />
      </Grid>
    </Grid>
  );
};

export default Matches;
