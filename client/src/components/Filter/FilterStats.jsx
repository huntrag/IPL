import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { CssBaseline, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { statsActions } from "../../store/stats-slice";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.url,
});

const filterOptions1 = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.season,
});

function FilterStats() {
  const dispatch = useDispatch();
  const [stats, setstats] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    if (
      value != null &&
      value != undefined &&
      stats != null &&
      stats != undefined
    ) {
      dispatch(statsActions.setyear(value.year));
      dispatch(statsActions.setheader(stats.name));
      dispatch(statsActions.setcol(stats.col));
      dispatch(statsActions.seturl(stats.url));
      dispatch(statsActions.settype(stats.type));
    }
  }, [value, stats]);

  return (
    <Stack
      direction="row"
      alignItems={"space-between"}
      justifyContent={"space-between"}
      spacing={7}
    >
      <CssBaseline />
      <Autocomplete
        value={value || null}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        id="filter-demo"
        options={yearsWithSeasons}
        getOptionLabel={(option) => `Season ${option.season} (${option.year})`}
        filterOptions={filterOptions1}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Season" />}
      />
      <Autocomplete
        value={stats || null}
        onChange={(event, newstats) => {
          setstats(newstats);
        }}
        id="filter-demo"
        options={options}
        getOptionLabel={(option) => `${option.name}`}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </Stack>
  );
}

const options = [
  { name: "Orange Cap",col:'Runs', url: "orange_cap", type: 1 },
  { name: "Purple Cap",col:'Wickets', url: "purple_cap", type: 1 },
  { name: "Max Sixes",col:'Sixes', url: "max_sixes", type: 1 },
  { name: "Max Fours",col:'Fours', url: "max_fours", type: 1 },
  { name: "Max Strike Rate",col:'Strike Rate', url: "max_strikerate", type: 1 },
  { name: "Most Dots",col:'Dots', url: "most_dots", type: 1 },
  { name: "Best Economy",col:'Economy', url: "best_economy", type: 1 },
  { name: "Max Wickets in an Innings",col:'Wickets', url: "max_wickets_in_innings", type: 1 },
  { name: "Highest Runs in an Innings",col:'Runs', url: "highest_runs_in_innings", type: 1 },
  { name: "Highest Runs in an Innings All Time",col:'Runs', url: "highest_runs_all_seasons", type: 1 },
  { name: "Highest Team Runs",col:'Runs', url: "highest_team_runs", type: 2 },
  { name: "Highest Chased Runs",col:'Runs', url: "highest_chased_runs", type: 2 },
];

const yearsWithSeasons = [
  { season: "1", year: 2008 },
  { season: "2", year: 2009 },
  { season: "3", year: 2010 },
  { season: "4", year: 2011 },
  { season: "5", year: 2012 },
  { season: "6", year: 2013 },
  { season: "7", year: 2014 },
  { season: "8", year: 2015 },
  { season: "9", year: 2016 },
  { season: "10", year: 2017 },
  { season: "12", year: 2018 },
  { season: "13", year: 2019 },
  { season: "14", year: 2020 },
  { season: "15", year: 2021 },
  { season: "16", year: 2022 },
];

export default FilterStats;