import api from "./main.service";
  
  export interface Blog {
      id: string;
    title: string;
    isPublished: boolean;
  }
  
  export function blogService() {
      const createBlog = async (blog: Omit<Blog, "id">) => {
          return await api.post("/blogs", blog);
      };

      const getAllBlogs = async () => {
          return await api.get("/blogs");
      };
      const getAllblogsManager = async () => {
        return await api.get("/blogs/manage");
    };

      const getBlogById = async (id: string) => {
          return await api.get("/blogs/" + id);
      };
      const getBlogByIdManage = async (id: string) => {
        return await api.get("/blogs/manage/" + id);
    };

      const updateBlog = async (id: string, blog: Omit<Blog, "id">) => {
          return await api.patch("/blogs/" + id, blog);
      };

      const deleteBlog = async (id: string) => {
          return await api.delete("/blogs/" + id);
      };
  
      return {
          createBlog,
        getAllBlogs,
        getBlogById,
        updateBlog,
        deleteBlog,
        getAllblogsManager,
        getBlogByIdManage
      };
  }
  