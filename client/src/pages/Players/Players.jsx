import React from "react";
import { Grid, Stack, Paper } from "@mui/material";
import { PlayerCard } from "../../components";

import data from "../../../../scripts/featuredPlayers.json";

export default function Players() {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        spacing={6}
        columnSpacing={20}
        alignItems="center"
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        component={"ul"}
        sx={{ listStyle: "none" }}
        flexGrow={1}
        width="80vw"
      >
        {data.map((player, index) => {
          return (
            <Grid item sx={{ mt: 2, mb: 2 }} key={index}>
              <PlayerCard player={player} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
