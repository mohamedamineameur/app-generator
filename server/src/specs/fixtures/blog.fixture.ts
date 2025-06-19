
  import Blog from "../../models/blog.model";
  
  
  interface BlogOverrides {
    title?: string;   
    isPublished?: boolean;
  
  }
  
  export const createBlogFixture = async (overrides: BlogOverrides = {}) => {
  
    const blog = await Blog.create({
      title: overrides.title || "Test Blog Title",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return blog;
  };
  