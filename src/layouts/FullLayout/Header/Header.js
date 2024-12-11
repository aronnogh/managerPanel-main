import React from "react";
//import { Link } from 'react-router-dom';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { useAuth } from "../../../components/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const { logout } = useAuth();
  const navigate = useNavigate();


  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
    logout();
    navigate("/login"); // Redirect to the login page
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
       
        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Admin
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
    // <div></div> 
  );
};

export default Header;
