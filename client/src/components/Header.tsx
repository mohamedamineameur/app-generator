import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { pageService } from "../services/page.service";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth } from "../AuthContext";
import Logo from "./Logo";
import "../index.css";

const Header = () => {
  const { isLoggedIn, refreshAuth } = useAuth();
  const [pages, setPages] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    userService().me();
    pageService().getAllPages().then((res) => setPages(res.data));
  }, []);

  const handleLogout = async () => {
    await userService().logoutUser();
    refreshAuth();
    navigate("/login");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerLinks = (
    <Box sx={{ width: 250, backgroundColor: "#000", height: "100%", fontFamily:"Anavio" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem  component={Link} to="/">
          <ListItemText primary={language === "fr" ? "Accueil" : "Home"} sx={{ color: "#ccac70" }} />
        </ListItem>
        <ListItem  component={Link} to="/contact">
          <ListItemText primary={language === "fr" ? "Coordonnées" : "Contact"} sx={{ color: "#ccac70" }} />
        </ListItem>
        <ListItem  component={Link} to="/blogs">
          <ListItemText primary="Blogs" sx={{ color: "#ccac70" }} />
        </ListItem>
        {isLoggedIn && (
          <ListItem  component={Link} to="/admin">
            <ListItemText primary="Admin" sx={{ color: "#ccac70" }} />
          </ListItem>
        )}
        
        <ListItem>
          {isLoggedIn && (
            <Button onClick={handleLogout} sx={buttonStyle}>Déconnexion</Button>
          ) }
        </ListItem>
        <ListItem>
          <Button onClick={toggleLanguage} variant="outlined" sx={{ color: "#ccac70", borderColor: "#ccac70" }}>
            🌐 {language === "fr" ? "EN" : "FR"}
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(5px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        margin: "20px",
        height: "150px"
      }}
    >
      <Logo />

      {/* Menu classique pour écran md+ */}
      <Box
        sx={{
          display: { xs: "none", md: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "end",
          gap: 5,
          fontFamily: "Anavio",
          
        }}
      >
        <Button onClick={toggleLanguage} variant="outlined" sx={{ color: "#ccac70", borderColor: "#ccac70" }}>
          🌐 {language === "fr" ? "EN" : "FR"}
        </Button>
        <div style={{ display: "flex", gap: "2rem" }}>
        <Link to="/" style={linkStyle}>
          {language === "fr" ? "Accueil" : "Home"}
        </Link>
        <Link to="/contact" style={linkStyle}>
          {language === "fr" ? "Coordonnées" : "Contact"}
        </Link>
        <Link to="/blogs" style={linkStyle}>Blogs</Link>
        {isLoggedIn && (
          <Link to="/admin" style={linkStyle}>Admin</Link>
        )}
        </div>
        
        {isLoggedIn && (
          <Button onClick={handleLogout} sx={buttonStyle}>
            {language === "fr" ? "Déconnexion" : "Logout"}
          </Button>
        ) }
      </Box>

      {/* Menu hamburger pour mobile */}
      <IconButton
        sx={{ display: { xs: "flex", md: "flex", lg:"none" }, color: "#ccac70" }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerLinks}
      </Drawer>
    </Box>
  );
};

const linkStyle = {
  color: "#ccac70",
  textDecoration: "none",
  fontSize: "1.2rem",
  fontWeight: "bold"
};

const buttonStyle = {
  color: "#ccac70",
  fontSize: "1rem",
  textTransform: "none"
};

export default Header;
