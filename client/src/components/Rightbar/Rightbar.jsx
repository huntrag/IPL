import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Grid,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  CssBaseline,
} from "@mui/material";
import data from "../../../../scripts/live-table.json";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
export default function Rightbar() {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <CssBaseline />
      <Grid item sx={{ mt: 6 }}>
        <TableContainer
          component={Paper}
          sx={{ position: { xs: "sticky", sm: "sticky", md: "sticky" } }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pos</StyledTableCell>
                <StyledTableCell>Team</StyledTableCell>
                <StyledTableCell align="right">M</StyledTableCell>
                <StyledTableCell align="right">W</StyledTableCell>
                <StyledTableCell align="right">L</StyledTableCell>
                <StyledTableCell align="right">T</StyledTableCell>
                <StyledTableCell align="right">NR</StyledTableCell>
                <StyledTableCell align="right">NRR</StyledTableCell>
                <StyledTableCell align="right">P</StyledTableCell>
                <StyledTableCell align="center">Last</StyledTableCell>
                <StyledTableCell align="right">Next</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.pos}>
                  <StyledTableCell>{row.pos}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.matches}</StyledTableCell>
                  <StyledTableCell align="right">{row.won}</StyledTableCell>
                  <StyledTableCell align="right">{row.lost}</StyledTableCell>
                  <StyledTableCell align="right">{row.tie}</StyledTableCell>
                  <StyledTableCell align="right">{row["n/r"]}</StyledTableCell>
                  <StyledTableCell align="right">{row.nrr}</StyledTableCell>
                  <StyledTableCell align="right">{row.points}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.next}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
