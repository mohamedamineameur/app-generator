import api from "./main.service";
  
  export interface BlogMiniature {
      id: string;
  }
  
  export function blogMiniatureService() {
      const createBlogMiniature = async (blogMiniature: Omit<BlogMiniature, "id">) => {
          return await api.post("/blogMiniatures", blogMiniature);
      };

      const getAllBlogMiniatures = async () => {
          return await api.get("/blogMiniatures");
      };

      const getBlogMiniatureById = async (id: string) => {
          return await api.get("/blogMiniatures/" + id);
      };

      const updateBlogMiniature = async (id: string, blogMiniature: Omit<BlogMiniature, "id">) => {
          return await api.patch("/blogMiniatures/" + id, blogMiniature);
      };

      const deleteBlogMiniature = async (id: string) => {
          return await api.delete("/blogMiniatures/" + id);
      };
  
      return {
          createBlogMiniature,
        getAllBlogMiniatures,
        getBlogMiniatureById,
        updateBlogMiniature,
        deleteBlogMiniature
      };
  }
  