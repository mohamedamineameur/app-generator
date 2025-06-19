
  import { createPicture,
  getAllPictures,
  getPictureById,
  updatePicture,
  deletePicture,
  getAllPicturesManage,
  getPictureByIdManage
 } from "../controllers/picture.controller";
  import { Router } from "express";
  import { isAuthenticated } from "../middlewares/isAuthenticated";

  const pictureRouter = Router();
  
  // Routes
  pictureRouter.post("/",isAuthenticated, createPicture);
pictureRouter.get("/", getAllPictures);
pictureRouter.patch("/",isAuthenticated, updatePicture);
pictureRouter.delete("/:id",isAuthenticated, deletePicture);
pictureRouter.get("/manage", isAuthenticated, getAllPicturesManage); // For management purposes
pictureRouter.get("/manage/:id", isAuthenticated, getPictureByIdManage); // For management purposes
pictureRouter.get("/:id", getPictureById);

  
  export default pictureRouter;
  