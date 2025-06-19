import api from "./main.service";
  
  export interface PageContent {
      id: string;
    orderNumber: number;
  }
  
  export function pageContentService() {
      const createPageContent = async (pageContent: Omit<PageContent, "id">) => {
          return await api.post("/pageContents", pageContent);
      };

      const getAllPageContents = async () => {
          return await api.get("/pageContents");
      };

      const getPageContentById = async (id: string) => {
          return await api.get("/pageContents/" + id);
      };

      const updatePageContent = async (id: string, pageContent: Omit<PageContent, "id">) => {
          return await api.patch("/pageContents/" + id, pageContent);
      };

      const deletePageContent = async (id: string) => {
          return await api.delete("/pageContents/" + id);
      };
  
      return {
          createPageContent,
        getAllPageContents,
        getPageContentById,
        updatePageContent,
        deletePageContent
      };
  }
  