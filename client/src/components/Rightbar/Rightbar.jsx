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
                <StyledTableCell>
                  <Typography>Pos</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography>Team</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>M</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>W</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>L</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>T</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>NR</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>NRR</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>P</Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography>Last Results</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography>Next</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.pos}>
                  <StyledTableCell>
                    <Typography>{row.pos}</Typography>
                  </StyledTableCell>
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
                    <Typography>{row.matches}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row.won}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row.lost}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row.tie}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row["n/r"]}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row.nrr}</Typography>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row.points}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction={"row"}>
                      {row.last.map((res) => (
                        <span className={`rf ${res} ih-pt-g`}>{res}</span>
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    <Typography>{row.next}</Typography>
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
