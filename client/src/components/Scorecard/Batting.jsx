import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, Stack } from "@mui/material";

// img: https://scores.iplt20.com/ipl/teamlogos/LSG.png

export default function Batting(props) {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 650, maxWidth: 800, p: 2 }}
      elevation={2}
    >
      <Stack alignItems={"center"} justifyContent="center">
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="caption table">
          <caption>
            <Typography color={"black"} gutterBottom>
              Fall of wickets
            </Typography>
            {props.data.fallofwickets.map((unit, index) => (
              <React.Fragment>
                <Typography component={"span"} color={"black"}>
                  {bull}
                  {`${unit.runs}/${unit.wickets} `}
                </Typography>
                <Typography
                  component={"span"}
                >{`(${unit.name}, ${unit.overs} ov) `}</Typography>
              </React.Fragment>
            ))}
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Batting</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>R</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>B</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>4s</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>6s</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>S/R</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.score.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography>{row.name}</Typography>
                  <Typography
                    fontWeight={10}
                    fontSize={14}
                    color="text.secondary"
                  >
                    {row.dismissal}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.runs}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.balls}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.fours}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{row.sixes}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{`${row.sr}`}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </TableContainer>
  );
}
