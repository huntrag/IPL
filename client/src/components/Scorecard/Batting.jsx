import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, Stack } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// img: https://scores.iplt20.com/ipl/teamlogos/LSG.png

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

const fallOfWIckets = [
  {
    runs: "53",
    wickets: 1,
    over: 4,
    name: "Raghav Gade",
  },
  {
    runs: "53",
    wickets: 1,
    over: 4,
    name: "Raghav Gade",
  },
  {
    runs: "53",
    wickets: 1,
    over: 4,
    name: "Raghav Gade",
  },
  {
    runs: "53",
    wickets: 1,
    over: 4,
    name: "Raghav Gade",
  },
  {
    runs: "53",
    wickets: 1,
    over: 4,
    name: "Raghav Gade",
  },
  {
    runs: "53",
    wickets: 1,
    over: 4,
    name: "Raghav Gade",
  },
];

export default function Batting() {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 800 }}>
      <Stack alignItems={"center"} justifyContent="center">
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="caption table">
          <caption>
            <Typography color={"black"} gutterBottom>
              Fall of wickets
            </Typography>
            {fallOfWIckets.map((unit, index) => (
              <React.Fragment>
                <Typography component={"span"} color={"black"}>
                  {bull}
                  {`${unit.runs}/${unit.wickets} `}
                </Typography>
                <Typography
                  component={"span"}
                >{`(${unit.name}, ${unit.over} ov) `}</Typography>
              </React.Fragment>
            ))}
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>Batting</TableCell>
              <TableCell align="right">R</TableCell>
              <TableCell align="right">B</TableCell>
              <TableCell align="right">4s</TableCell>
              <TableCell align="right">6s</TableCell>
              <TableCell align="right">S/R</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  Bhadwa
                </TableCell>
                <TableCell align="right">123</TableCell>
                <TableCell align="right">121</TableCell>
                <TableCell align="right">14</TableCell>
                <TableCell align="right">12</TableCell>
                <TableCell align="right">120</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </TableContainer>
  );
}
