import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pageService } from "../../services/page.service";
import { pageContentService } from "../../services/pageContent.service";
import { contentService } from "../../services/content.service";
import MarkdownEditor from "../../components/TinyMCEEditor";

const PageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentFr, setContentFr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [pageContents, setPageContents] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    pageService().getPageByIdManage(id).then((res) => {
      setTitleFr(res.data.titleFr || "");
      setTitleEn(res.data.titleEn || "");
    });

    pageContentService()
      .getAllPageContents()
      .then((res) => {
        setPageContents(res.data);
        const match = res.data.find((p: any) => p.pageId === id);
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
            await pageService().updatePage({ id, titleFr, titleEn, isPublished: true });
            const pageContentMatche = pageContents.find((p: any) => p.pageId === id);
          
            const pageContentMatch = await pageContentService().getPageContentById(pageContentMatche.id);
            if (pageContentMatch.data.length > 0) {
              const contentId = pageContentMatch.data[0].contentId;
              await contentService().updateContent(contentId, {
                id: contentId,
                contentFr,
                contentEn,
                isPublished: true
              });
            }
          }
           else {
        const pageRes = await pageService().createPage({ titleFr, titleEn, isPublished: true });
        const contentRes = await contentService().createContent({ contentFr, contentEn, isPublished: true });

        await pageContentService().createPageContent({
          pageId: pageRes.data.id,
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
      <h2>{id ? "Modifier" : "Créer"} une page</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre (FR)</label>
        <input value={titleFr} onChange={(e) => setTitleFr(e.target.value)} required />

        <label>Titre (EN)</label>
        <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />

        <label>Contenu (FR)</label>
        <MarkdownEditor content={contentFr} setContent={setContentFr} />

        <label>Contenu (EN)</label>
        <MarkdownEditor content={contentEn} setContent={setContentEn} />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default PageEdit;
