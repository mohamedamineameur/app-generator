import React, { useEffect, useState } from "react";
import { blogService } from "../../services/blog.service";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Divider } from "@mui/material";

const BlogListAdmin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    blogService().getAllblogsManager().then((res) => setBlogs(res.data));
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Blogs
      </Typography>

      <Button
        component={Link}
        to="/admin/blogs/new"
        variant="contained"
        sx={{
          mb: 3,
          backgroundColor: "#ccac70",
          "&:hover": { backgroundColor: "#8a631b" },
        }}
      >
        ➕ Créer un blog
      </Button>

      <Divider sx={{ mb: 2 }} />

      {blogs.map((blog) => (
        <Box
          key={blog.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <Typography>
            <strong>{blog.titleFr}</strong>
          </Typography>
          <Box>
            <Button
              component={Link}
              to={`/blogs/${blog.id}`}
              sx={{ mr: 1, color: "#1976d2" }}
            >
              Voir
            </Button>
            <Button
              component={Link}
              to={`/admin/blogs/edit/${blog.id}`}
              sx={{ color: "#ccac70" }}
            >
              ✏️ Modifier
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BlogListAdmin;
