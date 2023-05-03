import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

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
  SportsCricket,
  TableChart,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const drawerWidth = 240;

import Main from "../Main/Main";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.ui.drawerIsVis);

  const handleDrawerClose = () => {
    dispatch(uiActions.hideDrawer());
  };

  const list = [
    {
      name: "Home",
      icon: <Home />,
      url: "/",
    },
    {
      name: "Current Results",
      icon: <SportsCricket />,
      url: "/results",
    },
    {
      name: "Upcoming Matches",
      icon: <EmojiEvents />,
      url: "/upcoming-matches",
    },
    {
      name: "Matches",
      icon: <EmojiEvents />,
      url: "/matches",
    },
    {
      name: "Points",
      icon: <TableChart />,
      url: "/points",
    },
    {
      name: "Stats",
      icon: <People />,
      url: "/stats",
    },
    {
      name: "Players",
      icon: <DirectionsRun />,
      url: "/players",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        <List>
          {list.map((item) => (
            <Link
              to={item.url}
              style={{ color: "inherit", textDecoration: "inherit" }}
              key={item.url}
            >
              <ListItem key={item.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
