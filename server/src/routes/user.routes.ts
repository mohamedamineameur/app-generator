import { createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser } from "../controllers/user.controller";
  import { Router } from "express";
  import { login, logout } from "../middlewares/login";
  import { hasRole } from "../middlewares/authorization";
  import { isAuthenticated, me } from "../middlewares/isAuthenticated";

  const userRouter = Router();
  
  // Routes
  userRouter.post("/",isAuthenticated, hasRole('sudo'), createUser);
  userRouter.post("/login",login)
userRouter.get("/",isAuthenticated, hasRole('sudo'), getAllUsers);
userRouter.get("/me", isAuthenticated, me);
userRouter.get("/:id",isAuthenticated, hasRole('sudo'), getUserById);
userRouter.patch("/",isAuthenticated, hasRole('sudo'), updateUser);
userRouter.delete("/:id",isAuthenticated, hasRole('sudo'), deleteUser);
  userRouter.post("/logout", logout);
  
  export default userRouter;
