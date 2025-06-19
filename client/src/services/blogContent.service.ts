import api from "./main.service";
  
  export interface BlogContent {
      id: string;
    orderNumber: number;
  }
  
  export function blogContentService() {
      const createBlogContent = async (blogContent: Omit<BlogContent, "id">) => {
          return await api.post("/blogContents", blogContent);
      };

      const getAllBlogContents = async () => {
          return await api.get("/blogContents");
      };

      const getBlogContentById = async (id: string) => {
          return await api.get("/blogContents/" + id);
      };

      const updateBlogContent = async (id: string, blogContent: Omit<BlogContent, "id">) => {
          return await api.patch("/blogContents/" + id, blogContent);
      };

      const deleteBlogContent = async (id: string) => {
          return await api.delete("/blogContents/" + id);
      };
  
      return {
          createBlogContent,
        getAllBlogContents,
        getBlogContentById,
        updateBlogContent,
        deleteBlogContent
      };
  }
  