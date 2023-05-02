import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { CssBaseline, Stack } from "@mui/material";
import { useEffect } from "react";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.short,
});

function FilterTeam() {
  const [team1, setteam1] = useState();
  const [team2, setteam2] = useState();

  const filteredOptions = teams.filter((obj) => {
    return (
      (team1 !== undefined && team1 !== null
        ? obj.name !== team1.name
        : true) &&
      (team2 !== undefined && team2 !== null ? obj.name !== team2.name : true)
    );
  });

  useEffect(() => {
    if (team1 != null && team2 != null) {
      console.log({
        team1: team1.name,
        team1short: team1.short,
        team2: team2.name,
        team2short: team2.short,
      });
    }
  }, [team1, team2]);

  return (
    <Stack
      direction="row"
      alignItems={"space-between"}
      justifyContent={"space-between"}
      spacing={7}
    >
      <CssBaseline />
      <Autocomplete
        value={team1 || null}
        onChange={(event, newteam1) => {
          setteam1(newteam1);
        }}
        id="filter-demo"
        options={filteredOptions}
        getOptionLabel={(option) => `${option.name}`}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Team 1" />}
      />
      <Autocomplete
        value={team2 || null}
        onChange={(event, newteam2) => {
          setteam2(newteam2);
        }}
        id="filter-demo"
        options={filteredOptions}
        getOptionLabel={(option) => `${option.name}`}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Team 2" />}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const teams = [
  { name: "Rajasthan Royals", short: "RR" },
  { name: "Royal Challengers Bangalore", short: "RCB" },
  { name: "Sunrisers Hyderabad", short: "SRH" },
  { name: "Delhi Capitals", short: "DC" },
  { name: "Chennai Super Kings", short: "CSK" },
  { name: "Gujarat Titans", short: "GT" },
  { name: "Lucknow Super Giants", short: "LSG" },
  { name: "Kolkata Knight Riders", short: "KKR" },
  { name: "Punjab Kings", short: "PBKS" },
  { name: "Mumbai Indians", short: "MI" },
  { name: "Rising Pune Supergiants", short: "RPS" },
  { name: "Gujarat Lions", short: "GL" },
  { name: "Pune Warriors", short: "PWI" },
  { name: "Deccan Chargers", short: "DEC" },
  { name: "Kochi Tuskers Kerala", short: "KTK" },
];

export default FilterTeam;
