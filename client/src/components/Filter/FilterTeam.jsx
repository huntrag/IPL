import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { CssBaseline, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { matchcardActions } from "../../store/matchcard-slice";
import axios from "axios";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.short,
});

function FilterTeam() {
  const [team1, setteam1] = useState();
  const [team2, setteam2] = useState();
  const dispatch=useDispatch();

  const filteredOptions = teams.filter((obj) => {
    return (
      (team1 !== undefined && team1 !== null
        ? obj.name !== team1.name
        : true) &&
      (team2 !== undefined && team2 !== null ? obj.name !== team2.name : true)
    );
  });

  useEffect(() => {
    async function getData(arg){
      dispatch(uiActions.showLoading());
      const res=await axios.get(`http://127.0.0.1:8000/dual_matches/?team1=${arg.team1}&team2=${arg.team2}`);
      const data=await res.data;
      // dispatch(pointsActions.getPoints(data));
      dispatch(matchcardActions.getmatchcard(data));
      dispatch(uiActions.hideLoading());
      return data;
    }

    if (team1 != null && team2 != null) {         
        getData({"team1":team1.name,"team2":team2.name});      
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
