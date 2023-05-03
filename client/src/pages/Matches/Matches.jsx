import React from "react";
import { Grid, Stack, Paper } from "@mui/material";
import MatchCard from "../../components/MatchCard/MatchCard";

import data from "../../../../scripts/matches.json";
import { FilterTeam } from "../../components";

import { useSelector } from "react-redux";

const Matches = () => {
  const data1=useSelector(state=>state.matchcard.matchcard);
  // console.log(data1);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={5}>
      <FilterTeam />
      {data1.length !== 0 && 
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          component={"ul"}
          sx={{ listStyle: "none" }}
          flexGrow={1}
          width="83vw"
        >
          {data1.map((match, index) => {
            return (
              <Grid item sx={{ mt: 2, mb: 2 }} key={match.id}>
                <MatchCard match={match} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      }
    </Stack>
  );
};

export default Matches;
