
  import BlogContent from "../../models/blogContent.model";
  import { createBlogFixture } from "./blog.fixture";
import { createContentFixture } from "./content.fixture";
  
  interface BlogContentOverrides {
    blogId?: string;
  contentId?: string;
    orderNumber?: number; 
  }
  
  export const createBlogContentFixture = async (overrides: BlogContentOverrides = {}) => {
    if (!overrides.blogId) {
      const blog = await createBlogFixture();
      overrides.blogId = blog.id.toString();
    }

    if (!overrides.contentId) {
      const content = await createContentFixture();
      overrides.contentId = content.id.toString();
    }
    if (overrides.orderNumber === undefined) {
      overrides.orderNumber = 1; // Default order number
    }
  
    const blogContent = await BlogContent.create({
      blogId: overrides.blogId,
      contentId: overrides.contentId,
      orderNumber: overrides.orderNumber,
    });
  
    return blogContent;
  };
  