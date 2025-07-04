import { useEffect, useState } from "react";
import { blogService } from "../../services/blog.service";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLanguage } from "../../contexts/LanguageContext";

const BlogListAdmin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const { language } = useLanguage();

  const fetchBlogs = async () => {
    const res = await blogService().getAllblogsManager();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      language === "fr"
        ? "Voulez-vous vraiment supprimer ce blog ?"
        : "Do you really want to delete this blog?"
    );
    if (!confirm) return;

    try {
      await blogService().deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      alert(language === "fr" ? "Erreur lors de la suppression." : "Error while deleting.");
    }
  };

  const handleTogglePublished = async (blog: any) => {
    try {
      await blogService().updateBlog({
        id: blog.id,
        titleFr: blog.titleFr,
        titleEn: blog.titleEn,
        isPublished: !blog.isPublished,
      });
      fetchBlogs();
    } catch (error) {
      alert(language === "fr" ? "Erreur lors de la mise à jour." : "Error while updating.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ccac70" }}>
          {language === "fr" ? "Liste des blogs" : "Blog List"}
        </Typography>
        <Button
          component={RouterLink}
          to="/admin/blogs/new"
          variant="contained"
          sx={{ backgroundColor: "#ccac70", "&:hover": { backgroundColor: "#8a611a" } }}
        >
          ➕ {language === "fr" ? "Créer un blog" : "Create a Blog"}
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1d1d1d" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>{language === "fr" ? "Titre FR" : "Title FR"}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{language === "fr" ? "Titre EN" : "Title EN"}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{language === "fr" ? "Publié" : "Published"}</TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>{language === "fr" ? "Actions" : "Actions"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>{blog.titleFr}</TableCell>
                <TableCell>{blog.titleEn}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={blog.isPublished}
                    onChange={() => handleTogglePublished(blog)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={language === "fr" ? "Voir" : "View"}>
                    <IconButton
                      component={RouterLink}
                      to={`/blogs/${blog.id}`}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={language === "fr" ? "Modifier" : "Edit"}>
                    <IconButton
                      component={RouterLink}
                      to={`/admin/blogs/edit/${blog.id}`}
                      color="warning"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={language === "fr" ? "Supprimer" : "Delete"}>
                    <IconButton
                      onClick={() => handleDelete(blog.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {language === "fr" ? "Aucun blog disponible." : "No blog available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BlogListAdmin;
