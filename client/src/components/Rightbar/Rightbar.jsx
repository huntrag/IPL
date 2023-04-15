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
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import data from "../../../../scripts/live-table.json";
import "./Rightbar.css";

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

export default function Rightbar() {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}
      alignSelf={"center"}
      bgcolor="blue"
    >
      <CssBaseline />
      <Grid>
        <TableContainer
          component={Paper}
          sx={{ position: { xs: "sticky", sm: "sticky", md: "sticky" } }}
        >
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
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
                <StyledTableCell align="left">Last Results</StyledTableCell>
                <StyledTableCell align="right">Next</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.pos}>
                  <StyledTableCell>{row.pos}</StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" alignItems={"center"}>
                      <Avatar
                        alt="Example Alt"
                        src={row.img}
                        sx={{ height: "12%", width: "20%", mr: 1 }}
                      />
                      <Typography variant="p" fontSize={15}>
                        {row.name}
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.matches}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.won}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.lost}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.tie}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row["n/r"]}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.nrr}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.points}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction={"row"}>
                      {row.last.map((res) => (
                        <span className={`rf ${res} ih-pt-g`}>{res}</span>
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.next}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
