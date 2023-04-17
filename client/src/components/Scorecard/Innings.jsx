import React from "react";
import Batting from "./Batting";
import Bowling from "./Bowling";

import { Stack } from "@mui/material";

const Innings = () => {
  return (
    <Stack direction="column" alignItems={"center"}>
      <Batting />
      <Bowling />
    </Stack>
  );
};

export default Innings;
