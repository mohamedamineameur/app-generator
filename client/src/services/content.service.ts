import api from "./main.service";
  
  export interface Content {
      id: string;
    contentFr: string;
    contentEn: string;
    isPublished: boolean;
  }
  
  export function contentService() {
      const createContent = async (content: Omit<Content, "id">) => {
          return await api.post("/contents", content);
      };

      const getAllContents = async () => {
          return await api.get("/contents");
      };

        const getAllContentsManager = async () => {
            return await api.get("/contents/manage");
        };

      const getContentById = async (id: string) => {
          return await api.get("/contents/" + id);
      };

        const getContentByIdManage = async (id: string) => {
            return await api.get("/contents/manage/" + id);
        };

      const updateContent = async (content:Content) => {
          return await api.patch("/contents/", content);
      };

      const deleteContent = async (id: string) => {
          return await api.delete("/contents/" + id);
      };
  
      return {
          createContent,
        getAllContents,
        getContentById,
        updateContent,
        deleteContent,
        getAllContentsManager,
        getContentByIdManage
      };
  }
  