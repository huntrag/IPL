import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Points from "../Points/Points";
import { CssBaseline, Stack } from "@mui/material";
import { Comments, Scorecard, Summary } from "../../components";

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
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Stack direction="row" alignItems={"center"} justifyContent="center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="cricket scoreboard"
          >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Scorecard" {...a11yProps(1)} />
            <Tab label="Comments" {...a11yProps(2)} />
          </Tabs>
        </Stack>
      </Box>
      <TabPanel value={value} index={0}>
        <Summary />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Scorecard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Comments />
      </TabPanel>
    </Box>
  );
}
