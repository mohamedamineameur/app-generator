import React, { useEffect, useState } from "react";
import { pageService, type Page } from "../../services/page.service";
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

const PageList = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const { language } = useLanguage();

  const fetchPages = async () => {
    const res = await pageService().getAllPagesManager();
    setPages(res.data);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      language === "fr"
        ? "Voulez-vous vraiment supprimer cette page ?"
        : "Do you really want to delete this page?"
    );
    if (!confirm) return;

    try {
      await pageService().deletePage(id);
      fetchPages();
    } catch (error) {
      alert(language === "fr" ? "Erreur lors de la suppression." : "Error while deleting.");
    }
  };

  const handleTogglePublished = async (page: Page) => {
    try {
      await pageService().updatePage(page.id, {
        ...page,
        isPublished: !page.isPublished,
      });
      fetchPages();
    } catch (error) {
      alert(language === "fr" ? "Erreur lors de la mise à jour." : "Error while updating.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ccac70" }}>
          {language === "fr" ? "Liste des pages" : "Page List"}
        </Typography>
        <Button
          component={RouterLink}
          to="/admin/pages/new"
          variant="contained"
          sx={{ backgroundColor: "#ccac70", "&:hover": { backgroundColor: "#8a611a" } }}
        >
          ➕ {language === "fr" ? "Créer une page" : "Create a Page"}
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
            {pages.map((page) => (
              <TableRow key={page.id} hover>
                <TableCell>{page.titleFr}</TableCell>
                <TableCell>{page.titleEn}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={page.isPublished}
                    onChange={() => handleTogglePublished(page)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={language === "fr" ? "Voir" : "View"}>
                    <IconButton
                      component={RouterLink}
                      to={`/pages/${page.id}`}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={language === "fr" ? "Modifier" : "Edit"}>
                    <IconButton
                      component={RouterLink}
                      to={`/admin/pages/edit/${page.id}`}
                      color="warning"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={language === "fr" ? "Supprimer" : "Delete"}>
                    <IconButton
                      onClick={() => handleDelete(page.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {language === "fr" ? "Aucune page disponible." : "No page available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PageList;
