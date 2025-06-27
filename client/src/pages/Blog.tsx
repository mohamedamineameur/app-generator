import React, { useEffect, useState } from "react";
import { blogService } from "../services/blog.service";
import { blogMiniatureService } from "../services/blogMiniature.service";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";

interface Blog {
  id: string;
  titleFr: string;
  titleEn: string;
}

interface BlogMiniature {
  id: string;
  blogId: string;
  pictureId: string;
  picture: { url: string };
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [miniatures, setMiniatures] = useState<BlogMiniature[]>([]);
  const navigate = useNavigate();

  const { language } = useLanguage(); // ✅ Langue depuis le context

  useEffect(() => {
    blogService().getAllBlogs().then((res) => setBlogs(res.data));
    blogMiniatureService().getAllBlogMiniatures().then((res) =>
      setMiniatures(res.data)
    );
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.webp";
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#ccac70" }}
      >
        {language === "fr" ? "Blogs" : "Blog posts"}
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => {
          const mini = miniatures.find((m) => m.blogId === blog.id);
          const img = mini?.picture?.url || "/placeholder.webp";

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  backgroundColor: "#1D1D1D",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                <CardMedia
                  component="img"
                  image={img}
                  onError={handleImgError}
                  alt={language === "fr" ? blog.titleFr : blog.titleEn}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#ccac70" }}>
                    {language === "fr" && blog.titleFr
                      ? blog.titleFr
                      : blog.titleEn}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BlogList;
