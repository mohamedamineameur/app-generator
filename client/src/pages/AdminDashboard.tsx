import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import PagesIcon from "@mui/icons-material/Article";
import BlogsIcon from "@mui/icons-material/Feed";
import AlbumsIcon from "@mui/icons-material/Collections";
import { useLanguage } from "../contexts/LanguageContext";

const AdminDashboard = () => {
  const { language } = useLanguage();

  const adminSections = [
    {
      title: language === "fr" ? "Gérer les Pages" : "Manage Pages",
      icon: <PagesIcon sx={{ fontSize: 40 }} />,
      path: "/admin/pages"
    },
    {
      title: language === "fr" ? "Gérer les Blogs" : "Manage Blogs",
      icon: <BlogsIcon sx={{ fontSize: 40 }} />,
      path: "/admin/blogs"
    },
    {
      title: language === "fr" ? "Gérer les Albums" : "Manage Albums",
      icon: <AlbumsIcon sx={{ fontSize: 40 }} />,
      path: "/admin/albums"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
        px: 2,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(3px)"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          p: 4,
          backgroundColor: "#111",
          borderRadius: 6,
          boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.05)"
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#ccac70",
            mb: 6
          }}
        >
          {language === "fr"
            ? "Tableau de bord administrateur"
            : "Admin Dashboard"}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {adminSections.map((section) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={section.title}>
              <Card
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
                  }
                }}
              >
                <CardActionArea component={RouterLink} to={section.path}>
                  <CardContent sx={{ textAlign: "center", py: 5 }}>
                    <Box sx={{ color: "#ccac70" }}>{section.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ mt: 2, fontWeight: 600, color: "#333" }}
                    >
                      {section.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
