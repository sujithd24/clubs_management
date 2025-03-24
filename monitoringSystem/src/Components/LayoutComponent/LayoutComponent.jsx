import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import {
  Menu,
  Book,
  BusinessCenter,
  AttachMoney,
  Logout,
  Settings,
  AccountCircle,
  Dashboard,
  ReceiptLong,
  UploadFile,
  QrCode,
} from "@mui/icons-material";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AuthData } from "../AuthComponent/AuthContext";
import bitlogo from "../../assets/bit-logo.png";



export default function AppSidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { logout, user  } = AuthData();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }
  };

  const navLinks = {
    admin: [
      { icon: <Dashboard />, label: "Dashboard", href: "/" },
      { icon: <AccountCircle />, label: "User Management", href: "/usermanagement" },
      { icon: <BusinessCenter />, label: "Event Oversight", href: "/event" },
      { icon: <ReceiptLong/>, label: "Resource Oversight", href: "/resource" },
      { icon: <AttachMoney />, label: "Report", href: "/report" },
      { icon: <Settings />, label: "Feedback", href: "/feedback" },
      { icon: <Book />, label: "Documents", href: "/pdfdisplay" },
    ],
    faculty: [
      { icon: <Dashboard />, label: "Dashboard", href: "/" },
      { icon: <BusinessCenter />, label: "Event", href: "/event" },
      { icon: <AccountCircle />, label: "Attendance", href: "/attendance" },
      { icon: <UploadFile />, label: "UploadPDF", href: "/members" },
      { icon: <Book />, label: "Documents", href: "/pdfdisplay" },
      { icon: <Settings />, label: "Feedback", href: "/feedback" },
      { icon: <QrCode />, label: "QR Code", href: "/qr" },
    ],
    student: [
      { icon: <Dashboard />, label: "Dashboard", href: "/" },
      { icon: <Book />, label: "Event Calendar", href: "/eventclander" },
      { icon: <BusinessCenter />, label: "Participate", href: "/participation" },
      { icon: <AccountCircle />, label: "Feedback", href: "/feedback" },       
      { icon: <Settings />, label: "FeedbackForm", href: "/feedbackform" },
      { icon: <QrCode />, label: "QR Code", href: "/qrcode" },
    ],
  };
  const currentNavLinks = navLinks[user] || [];



  return (
    <>
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 220 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 220 : 80,
          transition: "width 0.3s ease-in-out",
          backgroundColor: "content",
          color: "#FFFFFF",
        },
      }}
    >
      <div className="sidebar-header" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
          <img src={bitlogo} height={"50px"}/>
        </IconButton>
      </div>
      <Divider sx={{ backgroundColor: "#444" }} />
      <List>
        {currentNavLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <ListItemButton
              key={link.href}
              component={Link}
              to={link.href}
              sx={{
                backgroundColor: isActive ? "hovercomponent" : "inherit",
                "&:hover": { backgroundColor: "hovercomponent" },
                padding: "15px",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{link.icon}</ListItemIcon>
              {open && <ListItemText primary={link.label} sx={{ color: "white" }} />}
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ backgroundColor: "#444" }} />
      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{ padding: "15px", "&:hover": { backgroundColor: "hovercomponent" } }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <Logout />
          </ListItemIcon>
          {open && <ListItemText primary="Sign out" sx={{ color: "white" }} />}
        </ListItemButton>
      </List>
    </Drawer>
    <Box sx={{ml:open?"240px":"100px",display:"Block",
          transition: "width 0.3s ease-in-out",}}>
    <Outlet/>
    </Box>
    </>
  );
}
