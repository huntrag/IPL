import * as React from "react";
import moment from "moment";
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

export default function LiveCard(props) {
  const match = props.match;
  const date = new Date(match.date);

  return (
    <Link
      to={`../match/` + props.match.id.toString()}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Card key={match.id} sx={{ width: 480, minWidth: 275, flexGrow: 2 }}>
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
              {`Match ${match.match_no}`}
            </Typography>
            <Typography
              sx={{ fontSize: 17 }}
              color="text.secondary"
              gutterBottom
            >
              {/* {<Moment format="MMMM Do YYYY">{date}</Moment>} */}
              {moment(date).format("MMMM Do, YYYY")}
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
                src={`https://scores.iplt20.com/ipl/teamlogos/${match.team1.short}.png?v=2`}
                // src={`../../assets/Table/${props.match.team1Short}`}
              />
              <Typography sx={{ fontSize: 20 }} variant="p" component="div">
                {`${match.team1.short}`}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 20 }} variant="p" component="div">
              {`${match.team1.runs}/${match.team1.wickets} (${match.team1.overs})`}
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
                src={`https://scores.iplt20.com/ipl/teamlogos/${match.team2.short}.png?v=2`}
              />
              <Typography sx={{ fontSize: 20 }} variant="p" component="div">
                {`${match.team2.short}`}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 20 }} variant="p" component="div">
              {`${match.team2.runs}/${match.team2.wickets} (${match.team2.overs})`}
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
                {`${match.mom.name} (${match.mom.performance} )`}
              </Typography>
            </Stack>
            <Divider />
            <Typography
              sx={{ fontSize: 20, mt: 2 }}
              variant="p"
              component="div"
              alignSelf={"center"}
            >
              {`${match.result}`}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
