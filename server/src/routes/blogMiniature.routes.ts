
  import { createBlogMiniature,
  getAllBlogMiniatures,
  getBlogMiniatureById,
  updateBlogMiniature,
  deleteBlogMiniature } from "../controllers/blogMiniature.controller";
  import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
  const blogMiniatureRouter = Router();
  
  // Routes
  blogMiniatureRouter.post("/",isAuthenticated, createBlogMiniature);
blogMiniatureRouter.get("/", getAllBlogMiniatures);
blogMiniatureRouter.get("/:id", getBlogMiniatureById);
blogMiniatureRouter.patch("/",isAuthenticated, updateBlogMiniature);
blogMiniatureRouter.delete("/:id",isAuthenticated, deleteBlogMiniature);
  
  export default blogMiniatureRouter;
  