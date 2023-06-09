import * as React from "react";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import { pointsActions } from "../../store/points-slice";
import data from "../../../../scripts/live-table.json";

const url="127.0.0.1:8000/points_table/";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.season,
});

export default function Filter() {
  const loading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  useEffect(() => {

    async function getData(value){
      dispatch(uiActions.showLoading());
      const res=await axios.get(`http://127.0.0.1:8000/points_table/?year=${value}`);
      const data=await res.data;
      dispatch(pointsActions.getPoints(data));
      dispatch(uiActions.hideLoading());
      return data;
    }

    if (value !== null && value !== undefined) {
        getData(value.year);     
    } else {
      dispatch(pointsActions.getPoints([]));
    }
  }, [value]);

  return (
    <Box>
      <Autocomplete
        value={value || null}
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
