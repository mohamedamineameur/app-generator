import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pageService } from "../../services/page.service";
import { pageContentService } from "../../services/pageContent.service";
import { contentService } from "../../services/content.service";
import MarkdownViewer from "../../components/HtmlViewer";
import { useLanguage } from "../../contexts/LanguageContext";

interface Page {
  id: string;
  titleFr: string;
  titleEn: string;
}

interface PageContent {
  id: string;
  pageId: string;
  contentFr: string;
  contentEn: string;
  orderNumber: number;
  contentId: string;
}

const PageView = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [page, setPage] = useState<Page | null>(null);
  const [contents, setContents] = useState<PageContent[]>([]);

  useEffect(() => {
    if (!id) return;

    pageService().getPageById(id).then((res) => setPage(res.data));

    pageContentService()
      .getAllPageContents()
      .then(async (res: { data: PageContent[] }) => {
        const related = res.data
          .filter((c: PageContent) => c.pageId === id)
          .sort((a, b) => a.orderNumber - b.orderNumber);

        const contentPromises = related.map((p) =>
          contentService().getContentById(p.contentId)
        );
        const contentResponses = await Promise.all(contentPromises);

        const fullContents = related.map((rel, i) => ({
          ...rel,
          contentFr: contentResponses[i].data.contentFr,
          contentEn: contentResponses[i].data.contentEn,
        }));

        setContents(fullContents);
      });
  }, [id]);

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>{language === "fr" ? page?.titleFr : page?.titleEn}</h2>
      {contents.map((c, i) => (
        <MarkdownViewer
          key={i}
          content={language === "fr" ? c.contentFr || "" : c.contentEn || ""}
        />
      ))}
    </div>
  );
};

export default PageView;
