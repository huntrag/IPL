import React from "react";
import Batting from "./Batting";
import Bowling from "./Bowling";

import { Stack } from "@mui/material";

const Innings = (props) => {
  return (
    <Stack direction="column" alignItems={"center"} spacing={2}>
      <Batting data={props.data.batting} />
      <Bowling data={props.data.bowling} />
    </Stack>
  );
};

export default Innings;
