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

export default function Bowling() {
  return (
    <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 800 }}>
      <Stack alignItems={"center"} justifyContent="center">
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Bowling</TableCell>
              <TableCell align="right">O</TableCell>
              <TableCell align="right">M</TableCell>
              <TableCell align="right">R</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">Econ</TableCell>
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
