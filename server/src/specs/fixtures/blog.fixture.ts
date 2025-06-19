
  import Blog from "../../models/blog.model";
  
  
  interface BlogOverrides {
    titleFr?: string;
    titleEn?: string;   
    isPublished?: boolean;
  
  }
  
  export const createBlogFixture = async (overrides: BlogOverrides = {}) => {
  
    const blog = await Blog.create({
      titleFr: overrides.titleFr || "Test Blog TitleFr",
      titleEn: overrides.titleEn || "Test Blog TitleEn",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return blog;
  };
  