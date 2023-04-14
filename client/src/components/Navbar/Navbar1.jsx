import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Menu, SportsCricket } from "@mui/icons-material";
import React from "react";
import { red } from "@mui/material/colors";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: {
                sm: "fixed",
                xs: "none",
              },
            }}
          >
            <Menu />
          </IconButton>
          <IconButton
            sx={{
              display: { sm: "none", xs: "sticky" },
              color: "whitesmoke",
            }}
          >
            <SportsCricket sx={{ m: 1 }} />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily="cursive"
          >
            IPL Stats
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
