
  import Page from "../../models/page.model";
  
  
  interface PageOverrides {
    title?: string;   
    isPublished?: boolean;
  
  }
  
  export const createPageFixture = async (overrides: PageOverrides = {}) => {
  
    const page = await Page.create({
      title: overrides.title || "Test Page Title",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return page;
  };
  