import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, CssBaseline, Stack } from "@mui/material";
import Innings from "./Innings";

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

export default function Scorecard(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Label = (props) => {
    return (
      <Stack direction="row" alignItems={"center"}>
        <Avatar
          src={`https://scores.iplt20.com/ipl/teamlogos/${props.data}.png`}
          alt={props.data}
          sx={{ width: "50", mr: 1.5 }}
        />
        <Typography>{props.data}</Typography>
      </Stack>
    );
  };

  return (
    <Box>
      <CssBaseline />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Stack direction="row" alignItems={"center"} justifyContent={"center"}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="cricket scoreboard"
            sx={{
              width: "80%",
            }}
          >
            <Tab
              label={<Label data={props.data.inn1.short} />}
              sx={{ width: "50%" }}
              {...a11yProps(0)}
            />
            <Tab
              label={<Label data={props.data.inn2.short} />}
              sx={{ width: "50%" }}
              {...a11yProps(1)}
            />
          </Tabs>
        </Stack>
      </Box>

      <TabPanel value={value} index={0}>
        <Innings data={props.data.inn1} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Innings data={props.data.inn2} />
      </TabPanel>
    </Box>
  );
}
