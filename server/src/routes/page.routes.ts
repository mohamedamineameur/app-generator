
  import { createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
getAllPagesManager,
getPageByIdManage } from "../controllers/page.controller";
  import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
  const pageRouter = Router();
  
  // Routes
  pageRouter.post("/",isAuthenticated, createPage);
pageRouter.get("/manage", isAuthenticated, getAllPagesManager);
pageRouter.get("/manage/:id", isAuthenticated, getPageByIdManage);
pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.patch("/",isAuthenticated, updatePage);
pageRouter.delete("/:id",isAuthenticated, deletePage);
  
  export default pageRouter;
  