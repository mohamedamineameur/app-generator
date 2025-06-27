import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogService } from "../../services/blog.service";
import { blogContentService } from "../../services/blogContent.service";
import { contentService } from "../../services/content.service";
import MarkdownViewer from "../../components/MarkdownViewer";
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
  const [contents, setContents] = useState<BlogContent[]>([]);

  useEffect(() => {
    if (!id) return;

    blogService().getBlogById(id).then((res) => setBlog(res.data));

    blogContentService()
      .getAllBlogContents()
      .then(async (res) => {
        const related = res.data
          .filter((c: BlogContent) => c.blogId === id)
          .sort((a:any, b:any) => a.orderNumber - b.orderNumber);

        const contentPromises = related.map((p:any) =>
          contentService().getContentById(p.contentId)
        );
        const contentResponses = await Promise.all(contentPromises);

        const fullContents: BlogContent[] = related.map((rel:any, i:any) => ({
          ...rel,
          contentFr: contentResponses[i].data.contentFr,
          contentEn: contentResponses[i].data.contentEn,
        }));

        setContents(fullContents);
      });
  }, [id]);

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>{language === "fr" ? blog?.titleFr : blog?.titleEn}</h2>
      {contents.map((c, i) => (
        <MarkdownViewer key={i} content={language === "fr" ? c.contentFr : c.contentEn} />
      ))}
    </div>
  );
};

export default BlogView;
