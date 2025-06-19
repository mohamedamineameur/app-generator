
  import { createBlogContent,
  getAllBlogContents,
  getBlogContentById,
  updateBlogContent,
  deleteBlogContent } from "../controllers/blogContent.controller";
  import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
  const blogContentRouter = Router();
  
  // Routes
  blogContentRouter.post("/",isAuthenticated, createBlogContent);
blogContentRouter.get("/", getAllBlogContents);
blogContentRouter.get("/:id", getBlogContentById);
blogContentRouter.patch("/",isAuthenticated, updateBlogContent);
blogContentRouter.delete("/:id",isAuthenticated, deleteBlogContent);
  
  export default blogContentRouter;
  