import { ExpandLess, ExpandMore, Person, Place } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Collapse,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import * as React from "react";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import YbySvg from "../assets/yby-simple";

import { AuthContext } from "../context/auth-context";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawerLayout(props: Props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const { user, logout } = useContext(AuthContext);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate("/signIn");
  };

  const ybyPng = require("../assets/ybyBlack.png");
  const drawer = (
    <div
      style={{ backgroundColor: " rgba(221, 195, 147, 0.2)", height: "100%" }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 2,
        }}
      >
        <img src={ybyPng} alt="YBY Logo" width="100" height="100" />
      </Box>

      {user?.isAdmin && (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Cadastro" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/cadastro/cliente")}
              >
                <ListItemText primary="Clientes" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary="Cooperativas"
                  onClick={() => navigate("/cadastro/cooperativa")}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      )}

      <ListItemButton onClick={() => navigate("/ponto-coleta")}>
        <ListItemIcon>
          <Place />
        </ListItemIcon>
        <ListItemText primary="PEVs" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button
          variant="contained"
          onClick={() => {
            handleLogout();
          }}
          style={{
            width: "100%",
            color: "black",
            backgroundColor: "white",
            borderRadius: 0,
          }}
        >
          Sair
        </Button>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 1100 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
    </Box>
  );
}
