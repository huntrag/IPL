import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Divider,
} from "@mui/material";

const Summary = (props) => {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  let rows1 = [];
  let rows2 = [];

  props.data.team1.batting.forEach((key, index) => {
    let col = props.data.team1.bowling[index];
    rows1.push({
      first: key.name,
      firstRuns: key.runs,
      firstBalls: key.balls,
      second: col.name,
      secondRuns: col.runs,
      secondWickets: col.wickets,
      secondOvers: col.overs,
    });
  });

  props.data.team2.batting.forEach((key, index) => {
    let col = props.data.team2.bowling[index];
    rows2.push({
      first: key.name,
      firstRuns: key.runs,
      firstBalls: key.balls,
      second: col.name,
      secondRuns: col.runs,
      secondWickets: col.wickets,
      secondOvers: col.overs,
    });
  });

  return (
    <Stack direction="column" spacing={2}>
      <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: "secondary.main" }}>
        <Typography
          component={"h6"}
          fontSize={14}
          color="secondary.contrastText"
        >
          Player of the Match
        </Typography>
        <Typography
          component={"h6"}
          fontSize={19}
          fontWeight="medium"
          color="secondary.contrastText"
        >
          {`${props.data.mom.name} (${props.data.mom.team}) `}
          {bull}
          {` ${props.data.mom.performance}`}
        </Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: 2 }}
        alignItems={"space-between"}
      >
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignSelf={"center"} alignItems={"center"}>
            <Avatar
              src={`https://scores.iplt20.com/ipl/teamlogos/${props.data.team1.short}.png`}
              alt={props.data}
              sx={{ width: "50", mr: 1.5 }}
            />
            <Typography color="text.secondary" fontSize={18}>
              {props.data.team1.name}
            </Typography>
          </Stack>
          <TableContainer component={Paper} elevation={1} sx={{ p: 2 }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                {rows1.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ p: 2 }}>
                      <Typography>{row.first}</Typography>
                      <Typography
                        color={"text.secondary"}
                        fontSize={15}
                      >{`${row.firstRuns} (${row.firstBalls})`}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ p: 2 }}>
                      <Typography>{row.second}</Typography>
                      <Typography
                        color={"text.secondary"}
                        fontSize={15}
                      >{`${row.secondWickets}/${row.secondRuns} (${row.secondOvers})`}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: 2 }}
        alignItems={"space-between"}
      >
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignSelf={"center"} alignItems={"center"}>
            <Avatar
              src={`https://scores.iplt20.com/ipl/teamlogos/${props.data.team2.short}.png`}
              alt={props.data}
              sx={{ width: "50", mr: 1.5 }}
            />
            <Typography color="text.secondary" fontSize={18}>
              {props.data.team2.name}
            </Typography>
          </Stack>
          <TableContainer component={Paper} elevation={1} sx={{ p: 2 }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                {rows2.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ p: 2 }}>
                      <Typography>{row.first}</Typography>
                      <Typography
                        color={"text.secondary"}
                        fontSize={15}
                      >{`${row.firstRuns} (${row.firstBalls})`}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ p: 2 }}>
                      <Typography>{row.second}</Typography>
                      <Typography
                        color={"text.secondary"}
                        fontSize={15}
                      >{`${row.secondWickets}/${row.secondRuns} (${row.secondOvers})`}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Summary;
