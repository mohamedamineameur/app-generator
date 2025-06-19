
  import { createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage } from "../controllers/page.controller";
  import { Router } from "express";
  const pageRouter = Router();
  
  // Routes
  pageRouter.post("/", createPage);
pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.patch("/", updatePage);
pageRouter.delete("/:id", deletePage);
  
  export default pageRouter;
  