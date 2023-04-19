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

export default function Bowling(props) {
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 650, maxWidth: 800, p: 2 }}
      elevation={2}
    >
      <Stack alignItems={"center"} justifyContent="center">
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={"500"}>Bowling</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"500"}>O</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"500"}>M</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"500"}>R</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"500"}>W</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={"500"}>Econ</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography>{row.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.overs}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.maiden}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.runs}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.wickets}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.economy}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </TableContainer>
  );
}
