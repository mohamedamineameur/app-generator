
  import Content from "../../models/content.model";
  
  
  interface ContentOverrides {
    contentFr?: string;
    contentEn?: string;
    isPublished?: boolean;
  
  }
  
  export const createContentFixture = async (overrides: ContentOverrides = {}) => {
  
    const content = await Content.create({
      contentFr: overrides.contentFr || "Test ContentFr",
      contentEn: overrides.contentEn || "Test ContentEn",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return content;
  };
  