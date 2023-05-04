import React,{useEffect} from "react";
import { Grid, Stack, Paper } from "@mui/material";
import { PlayerCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { playersActions } from "../../store/players-slice";
import axios from "axios";

import data from "../../../../scripts/featuredPlayers.json";

export default function Players() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.players.players);

  useEffect(() => {
    async function getData(arg) {
      dispatch(uiActions.showLoading());
      const res = await axios.get(`http://localhost:8000/featured_players/`);
      const data = await res.data;
      // dispatch(pointsActions.getPoints(data));
      dispatch(playersActions.getplayers(data));
      dispatch(uiActions.hideLoading());
    }

    getData();

  }, [dispatch]);




  return (
    <React.Fragment>
      {data.length !== 0 &&
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
      }
    </React.Fragment>
  );
}
