import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { Loader } from "..";

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
  const isLoading = useSelector((state) => state.ui.isLoading);

  const open = useSelector((state) => state.ui.drawerIsVis);

  const handleDrawerOpen = () => {
    dispatch(uiActions.showDrawer());
  };

  const handleLoading = () => {
    dispatch(uiActions.showLoading());
    console.log("nav first", isLoading);
    setTimeout(() => {
      dispatch(uiActions.hideLoading());
    }, 1000);
    console.log("nav second", isLoading);
  };

  return (
    <AppBar position="sticky" open={open}>
      <Loader />
      <CssBaseline />
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
          fontFamily={"inherit"}
        >
          IPL Stats
        </Typography>
        <Button
          onClick={handleLoading}
          variant="outlined"
          color="inherit"
          sx={{
            "&:hover": {
              backgroundColor: "blue",
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
