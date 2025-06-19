
  import Content from "../../models/content.model";
  
  
  interface ContentOverrides {
    content?: string;
    isPublished?: boolean;
  
  }
  
  export const createContentFixture = async (overrides: ContentOverrides = {}) => {
  
    const content = await Content.create({
      content: overrides.content || "Test Content",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return content;
  };
  