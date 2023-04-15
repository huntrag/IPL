import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CssBaseline, Stack } from "@mui/material";

export default function MatchCard(props) {
  console.log("madar", props);
  return (
    <Card key={props.match.no} sx={{ minWidth: 275 }}>
      <CssBaseline />
      <CardContent>
        <Stack direction="row" justifyContent={"space-between"} spacing={10}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {`${props.match.no}`}
          </Typography>
          <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            {`${props.match.date} : ${props.match.time}`}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={10}
        >
          <Stack direction="row" alignItems={"center"}>
            <Avatar
              alt="Example Alt"
              sx={{ width: "50", mr: 1.5 }}
              src={`https://scores.iplt20.com/ipl/teamlogos/${props.match.team1Short}.png?v=2`}
            />
            <Typography sx={{ fontSize: 20 }} variant="p" component="div">
              {`${props.match.team1Short}`}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 20 }} variant="p" component="div">
            Score
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={10}
        >
          <Stack direction="row" alignItems={"center"}>
            <Avatar
              alt="Example Alt"
              sx={{ width: "50", mr: 1.5 }}
              src={`https://scores.iplt20.com/ipl/teamlogos/${props.match.team2Short}.png?v=2`}
            />
            <Typography sx={{ fontSize: 20 }} variant="p" component="div">
              {`${props.match.team2Short}`}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 20 }} variant="p" component="div">
            Score
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 20 }} variant="p" component="div">
          Score
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
