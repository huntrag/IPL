import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CssBaseline, Stack } from "@mui/material";

export default function UpcomingMatchCard(props) {
  return (
    <Card key={props.match.no} sx={{ minWidth: 275 }}>
      <CssBaseline />
      <CardContent>
        <Stack direction="row" justifyContent={"space-between"} spacing={9}>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            {`${props.match.no}`}
          </Typography>
          <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            {`${props.match.date}`}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={10}
          sx={{ m: 1.5 }}
        >
          <Stack direction="row" alignItems={"center"}>
            <Avatar
              alt="Example Alt"
              sx={{ width: "40", mr: 1.5 }}
              src={`https://scores.iplt20.com/ipl/teamlogos/${props.match.team1Short}.png?v=2`}
            />
            <Typography sx={{ fontSize: 18 }} variant="p" component="div">
              {`${props.match.team1Short}`}
            </Typography>
          </Stack>
          <Typography>vs</Typography>
          <Stack direction="row" alignItems={"center"}>
            <Avatar
              alt="Example Alt"
              sx={{ width: "50", mr: 1.5 }}
              src={`https://scores.iplt20.com/ipl/teamlogos/${props.match.team2Short}.png?v=2`}
            />
            <Typography sx={{ fontSize: 18 }} variant="p" component="div">
              {`${props.match.team2Short}`}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{ fontSize: 13 }}
          color="text.secondary"
          gutterBottom
          maxWidth={275}
          overflow={""}
        >{`Venue: ${props.match.venue}`}</Typography>
        <Typography
          sx={{ fontSize: 14, mt: 1 }}
          color="text.primary"
          maxWidth={275}
        >{`Starts at ${props.match.time}`}</Typography>
      </CardContent>
    </Card>
  );
}
