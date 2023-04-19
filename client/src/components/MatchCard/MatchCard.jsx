import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CssBaseline,
  Divider,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

// import img from '../../assets/Table';

export default function MatchCard(props) {
  return (
    <Link
      to="../match/12"
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Card
        key={props.match.no}
        sx={{ width: 480, minWidth: 275, flexGrow: 2 }}
      >
        <CssBaseline />
        <CardContent>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"baseline"}
            spacing={10}
            sx={{ mb: 2 }}
          >
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              {`${props.match.no}`}
            </Typography>
            <Typography
              sx={{ fontSize: 17 }}
              color="text.secondary"
              gutterBottom
            >
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
                // src={`../../assets/Table/${props.match.team1Short}`}
              />
              <Typography sx={{ fontSize: 20 }} variant="p" component="div">
                {`${props.match.team1Short}`}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 20 }} variant="p" component="div">
              143/6 (20)
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
              143/6 (20)
            </Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent={"space-between"}
            sx={{ mt: 2 }}
          >
            <Stack direction={"column"} sx={{ mb: 2 }}>
              <Typography
                sx={{ fontSize: 17 }}
                variant="p"
                color="text.secondary"
                component="div"
              >
                Player of the Match
              </Typography>
              <Typography
                sx={{ fontSize: 17 }}
                variant="p"
                color="text.primary"
                component="div"
              >
                {`Ravindra Jadeja (CSK) 100*(55)`}
              </Typography>
            </Stack>
            <Divider />
            <Typography
              sx={{ fontSize: 20, mt: 2 }}
              variant="p"
              component="div"
              alignSelf={"center"}
            >
              RR won by 3 runs
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
