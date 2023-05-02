import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CssBaseline, Divider, Stack, Box } from "@mui/material";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

// player pic: https://scores.iplt20.com/ipl/playerimages/Virat%20Kohli.png

export default function PlayerCard(props) {
  const player = props.player;

  let keys;

  if (player.specialization === "Batsman") {
    keys = ["Total Runs", "Highest Score", "Average", "100s"];
  } else if (player.specialization === "Bowler") {
    keys = ["Wickets", "Best Figures", "Economy", "4W+"];
  } else if (player.specialization === "Wicketkeeper") {
    keys = ["Total Runs", "Highest Score", "Average", "Catches"];
  } else {
    keys = ["Total Runs", "Strike Rate", "Wickets", "Economy"];
  }

  let rows = [];

  rows.push({ id: "Total Matches", value: player.played });
  rows.push({ id: "Debut", value: player.debut });

  keys.forEach((key, index) => {
    rows.push({ id: key, value: player.sp[index] });
  });

  return (
    <Card key={player.name} sx={{ width: 550, minWidth: 275, p: 2 }}>
      <CssBaseline />
      <CardContent>
        <Stack direction="row" justifyContent={"space-around"}>
          <Box
            component="img"
            bgcolor="transparent"
            sx={{
              ml: -5,
              height: 233,
            }}
            alt={`${player.name}`}
            src={`https://scores.iplt20.com/ipl/playerimages/${player.name}.png`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://as2.ftcdn.net/jpg/01/07/43/45/220_F_107434511_iarF2z88c6Ds6AlgtwotHSAktWCdYOn7.jpg";
            }}
          />
          <Stack>
            <Stack
              direction="row"
              justifyContent={"space-evenly"}
              alignItems={"baseline"}
            >
              <Typography
                variant="h5"
                gutterBottom
              >{`${player.name}`}</Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`as ${player.specialization}`}
              </Typography>
            </Stack>
            <Divider sx={{ mb: 1 }} />
            <PlayerInfo rows={rows} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
