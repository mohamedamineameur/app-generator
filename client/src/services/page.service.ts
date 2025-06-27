import api from "./main.service";
  
  export interface Page {
      id: string;
    titleFr: string;
    titleEn: string;
    isPublished: boolean;
  }
  
  export function pageService() {
      const createPage = async (page: Omit<Page, "id">) => {
          return await api.post("/pages", page);
      };

      const getAllPages = async () => {
          return await api.get("/pages");
      };
      const getAllPagesManager = async () => {
        return await api.get("/pages/manage");
    };

      const getPageById = async (id: string) => {
          return await api.get("/pages/" + id);
      };
      const getPageByIdManage = async (id: string) => {
        return await api.get("/pages/manage/" + id);
    };

      const updatePage = async (id: string, page: Page) => {
          return await api.patch("/pages", page);
      };

      const deletePage = async (id: string) => {
          return await api.delete("/pages/" + id);
      };
  
      return {
          createPage,
        getAllPages,
        getPageById,
        updatePage,
        deletePage,
        getAllPagesManager,
        getPageByIdManage
      };
  }
  