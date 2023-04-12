import React from "react";
import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  DirectionsRun,
  EmojiEvents,
  Home,
  People,
  TableChart,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box bgcolor="white" flex={1} sx={{ display: { sm: "block" } }}>
      <List>
        <ListItem disablePadding>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary="Homepage"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/about"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText
                primary="About Us"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/matches"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <EmojiEvents />
              </ListItemIcon>
              <ListItemText
                primary="Matches"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/points"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItemButton component="a" href="/points">
              <ListItemIcon>
                <TableChart />
              </ListItemIcon>
              <ListItemText
                primary="Points"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/players"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <DirectionsRun />
              </ListItemIcon>
              <ListItemText
                primary="Players"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
