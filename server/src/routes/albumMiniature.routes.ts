
  import { createAlbumMiniature,
  getAllAlbumMiniatures,
  getAlbumMiniatureById,
  updateAlbumMiniature,
  deleteAlbumMiniature } from "../controllers/albumMiniature.controller";
  import { Router } from "express";
  import { isAuthenticated } from "../middlewares/isAuthenticated";

  const albumMiniatureRouter = Router();
  
  // Routes
  albumMiniatureRouter.post("/",isAuthenticated, createAlbumMiniature);
albumMiniatureRouter.get("/", getAllAlbumMiniatures);
albumMiniatureRouter.get("/:id", getAlbumMiniatureById);
albumMiniatureRouter.patch("/",isAuthenticated, updateAlbumMiniature);
albumMiniatureRouter.delete("/:id",isAuthenticated, deleteAlbumMiniature);
  
  export default albumMiniatureRouter;
  