import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { Box } from "@mui/material";
import { useEffect } from "react";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.season,
});

export default function Filter() {
  const [value, setValue] = useState({ season: "1", year: 2008 });

  useEffect(() => {}, [value]);

  return (
    <Box>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        id="filter-demo"
        options={yearsWithSeasons}
        getOptionLabel={(option) => `Season ${option.season} (${option.year})`}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Season" />}
      />
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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
