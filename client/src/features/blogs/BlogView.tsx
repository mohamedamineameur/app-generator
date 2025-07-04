import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogService } from "../../services/blog.service";
import { blogContentService } from "../../services/blogContent.service";
import { contentService } from "../../services/content.service";
import HtmlViewer from "../../components/HtmlViewer";
import { useLanguage } from "../../contexts/LanguageContext";

interface Blog {
  id: string;
  titleFr: string;
  titleEn: string;
}

interface BlogContent {
  id: string;
  blogId: string;
  contentFr: string;
  contentEn: string;
  orderNumber: number;
  contentId: string;
}

const BlogView = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  console.log("BlogView rendered with id:", blog);
  const [contents, setContents] = useState<BlogContent[]>([]);

  useEffect(() => {
    if (!id) return;
  
    blogService().getBlogById(id).then((res) => setBlog(res.data));
  
    blogContentService().getAllBlogContents().then(async (res) => {
      const match = res.data.find((c: BlogContent) => c.blogId === id);
  
      if (match) {
        const contentRes = await contentService().getContentById(match.contentId);
  
        const fullContent: BlogContent = {
          ...match,
          contentFr: contentRes.data.contentFr,
          contentEn: contentRes.data.contentEn,
        };
  
        setContents([fullContent]); // Un seul contenu
      }
    });
  }, [id]);
  

  return (
    <div
  className="container"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "100%", 
    overflowX: "hidden", 
    boxSizing: "border-box", 
  }}
>
  {contents.map((c, i) => (
    <HtmlViewer
      key={i}
      content={language === "fr" ? c.contentFr : c.contentEn}
    />
  ))}
</div>

  );
};

export default BlogView;
