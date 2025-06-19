
  import PageContent from "../../models/pageContent.model";
  import { createPageFixture } from "./page.fixture";
import { createContentFixture } from "./content.fixture";
  
  interface PageContentOverrides {
    pageId?: string;
  contentId?: string;
  orderNumber?: number;
  }
  
  export const createPageContentFixture = async (overrides: PageContentOverrides = {}) => {
    if (!overrides.pageId) {
      const page = await createPageFixture();
      overrides.pageId = page.id.toString();
    }

    if (!overrides.contentId) {
      const content = await createContentFixture();
      overrides.contentId = content.id.toString();
    }
    if (overrides.orderNumber === undefined) {
      overrides.orderNumber = 1; 
    }
  
    const pageContent = await PageContent.create({
      pageId: overrides.pageId,
      contentId: overrides.contentId,
      orderNumber: overrides.orderNumber,
    });
  
    return pageContent;
  };
  