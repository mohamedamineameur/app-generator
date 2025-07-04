import { Router } from "express";
import userRouter from "./user.routes";
import albumRouter from "./album.routes";
import pictureRouter from "./picture.routes";
import blogRouter from "./blog.routes";
import pageRouter from "./page.routes";
import contentRouter from "./content.routes";
import pageContentRouter from "./pageContent.routes";
import blogContentRouter from "./blogContent.routes";
import albumMiniatureRouter from "./albumMiniature.routes";
import blogMiniatureRouter from "./blogMiniature.routes";


const mainRouter = Router();

// Default route



mainRouter.use("/users", userRouter);
mainRouter.use("/albums", albumRouter);
mainRouter.use("/pictures", pictureRouter);
mainRouter.use("/blogs", blogRouter);
mainRouter.use("/pages", pageRouter);
mainRouter.use("/contents", contentRouter);
mainRouter.use("/pageContents", pageContentRouter);
mainRouter.use("/blogContents", blogContentRouter);
mainRouter.use("/albumMiniatures", albumMiniatureRouter);
mainRouter.use("/blogMiniatures", blogMiniatureRouter);
export default mainRouter;