
  import Page from "../../models/page.model";
  
  
  interface PageOverrides {
    titleFr?: string;
    titleEn?: string;   
    isPublished?: boolean;
  
  }
  
  export const createPageFixture = async (overrides: PageOverrides = {}) => {
  
    const page = await Page.create({
      titleFr: overrides.titleFr || "Test Page TitleFr",
      titleEn: overrides.titleEn || "Test Page TitleEn",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return page;
  };
  