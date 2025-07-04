import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { pageService } from "../services/page.service";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Box,
  Button,
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../AuthContext";
import Logo from "./Logo";
import "../index.css";
import { useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();

  const { isLoggedIn, refreshAuth } = useAuth();
  const [pages, setPages] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
console.log(pages)
  const getLinkStyle = (path: string) => ({
    color: location.pathname === path ? "#5b3a29" : "#ccac70", // marron si actif
    backgroundColor: location.pathname === path ? "#fffaf0" : "transparent", // fond blanc cassé
    padding: "4px 8px",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  });
  

  useEffect(() => {
    userService().me();
    pageService()
      .getAllPages()
      .then((res) => setPages(res.data));
  }, []);

  const handleLogout = async () => {
    await userService().logoutUser();
    refreshAuth();
    navigate("/login");
  };



  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerLinks = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#000",
        height: "100%",
        fontFamily: "Anavio",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemText
            primary={language === "fr" ? "Accueil" : "Home"}
            sx={{ color: "#ccac70" }}
          />
        </ListItem>
        <ListItem component={Link} to="/contact">
          <ListItemText
            primary={language === "fr" ? "Coordonnées" : "Contact"}
            sx={{ color: "#ccac70" }}
          />
        </ListItem>
        <ListItem component={Link} to="/blogs">
          <ListItemText primary="Blogs" sx={{ color: "#ccac70" }} />
        </ListItem>
        {isLoggedIn && (
          <ListItem component={Link} to="/admin">
            <ListItemText primary="Admin" sx={{ color: "#ccac70" }} />
          </ListItem>
        )}

        <ListItem>
          {isLoggedIn && (
            <Button onClick={handleLogout} sx={buttonStyle}>
              Déconnexion
            </Button>
          )}
        </ListItem>
        <ListItem>
          <Button
            onClick={toggleLanguage}
            variant="outlined"
            sx={{ color: "#ccac70", borderColor: "#ccac70" }}
          >
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
        background: "linear-gradient(to right, rgba(0, 0, 0, 0), #111 1%, #111 99%, rgba(0, 0, 0, 0))",
        backdropFilter: "blur(1px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,

        height: "180px",
      }}
    >
       <Box
        sx={{
          display: { xs: "none", md: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "end",
          gap: 5,
          fontFamily: "Anavio",
        }}
      >
        <Box
  sx={{
    visibility: "hidden",
    border: "1px solid #ccac70",
    color: "#ccac70",
    borderRadius: "4px",
    padding: "6px 16px", // correspond au padding MUI Button par défaut
    fontSize: "0.875rem", // correspond aussi au bouton
    textTransform: "uppercase",
    display: "inline-block",
  }}
>
  🌐 {language === "fr" ? "EN" : "FR"}
</Box>

        <div style={{ display: "flex", gap: "2rem" }}>
          <Link to="/"  style={getLinkStyle("/")}>
            {language === "fr" ? "Accueil" : "Home"}
          </Link>
          <Link to="/contact" style={getLinkStyle("/contact")}>
            {language === "fr" ? "Coordonnées" : "Contact"}
          </Link>
          <Link to="/blogs" style={getLinkStyle("/blogs")}>
            Blog
          </Link>
          {isLoggedIn && (
            <Link to="/admin" style={getLinkStyle("/admin")}>
              Admin
            </Link>
          )}
        </div>

        {isLoggedIn && (
          <Button onClick={handleLogout} sx={buttonStyle}>
            {language === "fr" ? "Déconnexion" : "Logout"}
          </Button>
        )}
      </Box>
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
        <Button
          onClick={toggleLanguage}
          variant="outlined"
          sx={{ color: "#ccac70", borderColor: "#ccac70" }}
        >
          🌐 {language === "fr" ? "EN" : "FR"}
        </Button>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link to="/prices" style={getLinkStyle("/prices")}>
            {language === "fr" ? "Tarifs" : "Prices"}
          </Link>
          <Link to="/about" style={getLinkStyle("/about")}>
            {language === "fr" ? "Apropos" : "About"}
          </Link>
          <Link to="/gallery" style={getLinkStyle("/gallery")}>
            {language === "fr" ? "Galerie" : "Gallery"}
          </Link>
          {isLoggedIn && (
            <Link to="/admin" style={linkStyle}>
              Admin
            </Link>
          )}
        </div>

        {isLoggedIn && (
          <Button onClick={handleLogout} sx={buttonStyle}>
            {language === "fr" ? "Déconnexion" : "Logout"}
          </Button>
        )}
      </Box>

      {/* Menu hamburger pour mobile */}
      <IconButton
        sx={{
          display: { xs: "flex", md: "flex", lg: "none" },
          color: "#ccac70",
        }}
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
  fontWeight: "bold",
};

const buttonStyle = {
  color: "#ccac70",
  fontSize: "1rem",
  textTransform: "none",
};

export default Header;
