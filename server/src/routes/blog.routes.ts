
  import { createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog } from "../controllers/blog.controller";
  import { Router } from "express";
  import { isAuthenticated } from "../middlewares/isAuthenticated";
  const blogRouter = Router();
  
  // Routes
  blogRouter.post("/",isAuthenticated, createBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.patch("/",isAuthenticated, updateBlog);
blogRouter.delete("/:id",isAuthenticated, deleteBlog);
  
  export default blogRouter;
  