
  import { createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumByIdManage,
  getAllAlbumsManage
 } from "../controllers/album.controller";
  import { Router } from "express";
  import { isAuthenticated } from "../middlewares/isAuthenticated";
  const albumRouter = Router();
  
  // Routes
  albumRouter.post("/",isAuthenticated, createAlbum);
  albumRouter.get("/manage", isAuthenticated, getAllAlbumsManage); 
  albumRouter.get("/manage/:id", isAuthenticated, getAlbumByIdManage); 
albumRouter.get("/", getAllAlbums);
albumRouter.get("/:id", getAlbumById);
albumRouter.patch("/",isAuthenticated, updateAlbum);
albumRouter.delete("/:id",isAuthenticated, deleteAlbum);
  
  export default albumRouter;
  