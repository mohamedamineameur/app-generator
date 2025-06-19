
  import { createContent,
  getAllContents,
  getContentById,
  updateContent,
  deleteContent,
getAllContentsManager,
getContentByIdManage } from "../controllers/content.controller";
  import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
  const contentRouter = Router();
  
  // Routes
  contentRouter.post("/",isAuthenticated, createContent);
contentRouter.get("/manage", isAuthenticated, getAllContentsManager);
contentRouter.get("/manage/:id", isAuthenticated, getContentByIdManage);
contentRouter.get("/", getAllContents);
contentRouter.get("/:id", getContentById);
contentRouter.patch("/",isAuthenticated, updateContent);
contentRouter.delete("/:id",isAuthenticated, deleteContent);
  
  export default contentRouter;
  