import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import {
  DirectionsRun,
  EmojiEvents,
  Home,
  People,
  TableChart,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.ui.drawerIsVis);

  const handleDrawerOpen = () => {
    dispatch(uiActions.showDrawer());
  };

  return (
    <AppBar position="sticky" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
          fontFamily="cursive"
        >
          IPL Stats
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
