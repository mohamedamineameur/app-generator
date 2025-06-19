
  import { createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage } from "../controllers/page.controller";
  import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
  const pageRouter = Router();
  
  // Routes
  pageRouter.post("/",isAuthenticated, createPage);
pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.patch("/",isAuthenticated, updatePage);
pageRouter.delete("/:id",isAuthenticated, deletePage);
  
  export default pageRouter;
  