
  import { createPageContent,
  getAllPageContents,
  getPageContentById,
  updatePageContent,
  deletePageContent } from "../controllers/pageContent.controller";
  import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated"; // Uncomment if authentication is needed
  const pageContentRouter = Router();
  
  // Routes
  pageContentRouter.post("/",isAuthenticated, createPageContent);
pageContentRouter.get("/", getAllPageContents);
pageContentRouter.get("/:id", getPageContentById);
pageContentRouter.patch("/",isAuthenticated, updatePageContent);
pageContentRouter.delete("/:id",isAuthenticated, deletePageContent);
  
  export default pageContentRouter;
  