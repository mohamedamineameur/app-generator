import { Router } from "express";
import userRouter from "./user.routes";
import albumRouter from "./album.routes";
import pictureRouter from "./picture.routes";
import blogRouter from "./blog.routes";
import pageRouter from "./page.routes";


const mainRouter = Router();

// Default route
mainRouter.get("/", (_req, res) => {
  res.send("API is running 🚀");
}
);


mainRouter.use("/api/users", userRouter);
mainRouter.use("/api/albums", albumRouter);
mainRouter.use("/api/pictures", pictureRouter);
mainRouter.use("/api/blogs", blogRouter);
mainRouter.use("/api/pages", pageRouter);
export default mainRouter;