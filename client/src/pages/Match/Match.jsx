import * as React from "react";
import PropTypes from "prop-types";

import {
  Tabs,
  Tab,
  Typography,
  CssBaseline,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import { Comments, Scorecard, Summary } from "../../components";

import data from "../../../../scripts/match.json";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Match() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack alignItems={"center"}>
      <Paper sx={{ width: "50%", pt: 1 }}>
        <CssBaseline />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Stack direction="row" alignItems={"center"} justifyContent="center">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="cricket scoreboard"
              sx={{ width: "80%" }}
            >
              <Tab label="Summary" {...a11yProps(0)} sx={{ width: "33%" }} />
              <Tab label="Scorecard" {...a11yProps(1)} sx={{ width: "33%" }} />
              <Tab label="Comments" {...a11yProps(2)} sx={{ width: "33%" }} />
            </Tabs>
          </Stack>
        </Box>
        <Stack>
          <TabPanel value={value} index={0}>
            <Summary data={data[0].summary} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Scorecard data={data[0].scorecard} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Comments />
          </TabPanel>
        </Stack>
      </Paper>
    </Stack>
  );
}
