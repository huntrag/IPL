import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Typography, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { uiActions } from "../../store/ui-slice";
import { statsActions } from "../../store/stats-slice";

import axios from "axios";

const rows1 = [
  {
    pos: 1,
    name: "Raghav Gade",
    short: "RCB",
    stats: 32,
  },
  {
    pos: 2,
    name: "Tilak Verma",
    short: "CSK",
    stats: 12,
  },
  {
    pos: 3,
    name: "Rajat Patidar",
    short: "MI",
    stats: 13,
  },
  {
    pos: 4,
    name: "Adam Gilchrist",
    short: "SRH",
    stats: 34,
  },
];

export default function TableStats() {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.stats.header);
  const col = useSelector((state) => state.stats.col);
  const url = useSelector((state) => state.stats.url);
  const year = useSelector((state) => state.stats.year);
  const type = useSelector(state => state.stats.type);
  const rows = useSelector(state => state.stats.stats)

  useEffect(() => {
    async function getData(arg) {
      dispatch(uiActions.showLoading());
      const res = await axios.get(`http://127.0.0.1:8000/stats/${arg.url}?year=${arg.year}`);
      const data = await res.data;
      // dispatch(pointsActions.getPoints(data));
      dispatch(statsActions.getstats(data));
      dispatch(uiActions.hideLoading());
      return data;
    }
    console.log(url);
    getData({ "url": url, "year": year });
  }, [url, year]);

  return (
    <React.Fragment>
      {header != null && (
        <Paper sx={{ width: 800, p: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            color={"gray"}
            sx={{ pl: 4, pb: 2 }}
          >
            {header}
          </Typography>
          <Stack alignItems={"center"}>
            <TableContainer
              component={Paper}
              elevation={2}
              sx={{ minWidth: 650, maxWidth: 700, p: 1.5 }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography fontSize={20}>Pos</Typography>
                    </TableCell>
                    <TableCell>
                      {type === 1 &&
                        <Typography fontSize={20}>
                          Player
                        </Typography>
                      }
                      {type === 2 &&
                        <Typography fontSize={20}>
                          Team
                        </Typography>
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize={20}>{col}</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.pos}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Typography sx={{ fontSize: 18 }}>
                          {row.pos}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {
                          type === 1 &&
                          <Stack direction={"row"} alignItems={"center"}>
                            <Avatar
                              alt="Example Alt"
                              sx={{ width: "40", mr: 1.5 }}
                              src={`https://scores.iplt20.com/ipl/teamlogos/${row.short}.png?v=2`}
                            />
                            <Typography
                              sx={{ fontSize: 18 }}
                              variant="p"
                              component="div"
                            >
                              {`${row.name}`}
                            </Typography>
                          </Stack>
                        }
                        {
                          type === 2 &&
                          <Stack direction={"row"} alignItems={"center"}>
                            <Avatar
                              alt="Example Alt"
                              sx={{ width: "40", mr: 1.5 }}
                              src={`https://scores.iplt20.com/ipl/teamlogos/${row.short}.png?v=2`}
                            />
                            <Typography
                              sx={{ fontSize: 18,pr:1 }}
                              variant="p"
                              component="div"
                            >
                              {`${row.short}`}
                            </Typography>
                            <Typography sx={{p:2,fontSize:18}}>
                              {`vs`}
                            </Typography>
                            <Avatar
                              alt="Example Alt"
                              sx={{ width: "40", mr: 1.5 }}
                              src={`https://scores.iplt20.com/ipl/teamlogos/${row.oppose}.png?v=2`}
                            />
                            <Typography
                              sx={{ fontSize: 18 }}
                              variant="p"
                              component="div"
                            >
                              {`${row.oppose}`}
                            </Typography>
                          </Stack>
                        }

                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontSize: 18 }}>
                          {row.stats}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Paper>
      )}
    </React.Fragment>
  );
}