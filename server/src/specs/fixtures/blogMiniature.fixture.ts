
  import BlogMiniature from "../../models/blogMiniature.model";
  import { createBlogFixture } from "./blog.fixture";
import { createPictureFixture } from "./picture.fixture";
  
  interface BlogMiniatureOverrides {
    blogId?: string;
  pictureId?: string;
  }
  
  export const createBlogMiniatureFixture = async (overrides: BlogMiniatureOverrides = {}) => {
    if (!overrides.blogId) {
      const blog = await createBlogFixture();
      overrides.blogId = blog.id.toString();
    }

    if (!overrides.pictureId) {
      const picture = await createPictureFixture();
      overrides.pictureId = picture.id.toString();
    }
  
    const blogMiniature = await BlogMiniature.create({
      blogId: overrides.blogId,
      pictureId: overrides.pictureId,
    });
  
    return blogMiniature;
  };
  