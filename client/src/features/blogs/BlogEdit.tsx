import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogService } from "../../services/blog.service";
import { blogContentService } from "../../services/blogContent.service";
import { contentService } from "../../services/content.service";
import TinyMCEEditor from "../../components/TinyMCEEditor";
import BlogMiniatureEdit from "../blogs/BlogMiniatureEdit";

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentFr, setContentFr] = useState("");
  const [contentEn, setContentEn] = useState("");

  useEffect(() => {
    if (!id) return;

    blogService().getBlogByIdManage(id).then((res) => {
      setTitleFr(res.data.titleFr || "");
      setTitleEn(res.data.titleEn || "");
    });

    blogContentService().getAllBlogContents().then((res) => {
      const match = res.data.find((b: any) => b.blogId === id);
      if (match) {
        contentService().getContentById(match.contentId).then((c) => {
          setContentFr(c.data.contentFr || "");
          setContentEn(c.data.contentEn || "");
        });
      }
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await blogService().updateBlog({
          id,
          titleFr,
          titleEn,
          isPublished: true,
        });

        const match = await blogContentService().getAllBlogContents().then((res) =>
          res.data.find((b: any) => b.blogId === id)
        );

        if (match) {
          await contentService().updateContent( {
            id: match.contentId,    
            contentFr,
            contentEn,
            isPublished: true,
          });
        }
      } else {
        const blogRes = await blogService().createBlog({
          titleFr,
          titleEn,
          isPublished: true,
        });

        const contentRes = await contentService().createContent({
          contentFr,
          contentEn,
          isPublished: true,
        });

        await blogContentService().createBlogContent({
          blogId: blogRes.data.id,
          contentId: contentRes.data.id,
          orderNumber: 1,
        });
      }

      navigate("/admin");
    } catch (error) {
      console.error("❌ handleSubmit error", error);
    }
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>{id ? "Modifier" : "Créer"} un blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre (FR)</label>
        <input value={titleFr} onChange={(e) => setTitleFr(e.target.value)} required />

        <label>Titre (EN)</label>
        <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />

        <label>Contenu (FR)</label>
        <TinyMCEEditor content={contentFr} setContent={setContentFr} />

        <label>Contenu (EN)</label>
        <TinyMCEEditor content={contentEn} setContent={setContentEn} />

        <button type="submit">Enregistrer</button>
      </form>

      {id && <BlogMiniatureEdit />}
    </div>
  );
};

export default BlogEdit;
