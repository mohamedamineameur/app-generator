
  import Page from "../../models/page.model";
  
  
  interface PageOverrides {
  
  }
  
  export const createPageFixture = async (overrides: PageOverrides = {}) => {
  
    const page = await Page.create({
    });
  
    return page;
  };
  