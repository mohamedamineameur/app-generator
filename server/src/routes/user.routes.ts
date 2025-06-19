import { createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser } from "../controllers/user.controller";
  import { Router } from "express";
  import { login } from "../middlewares/login";
  import { hasRole } from "../middlewares/authorization";
  import { isAuthenticated } from "../middlewares/isAuthenticated";

  const userRouter = Router();
  
  // Routes
  userRouter.post("/",isAuthenticated, hasRole('sudo'), createUser);
  userRouter.post("/login",login)
userRouter.get("/",isAuthenticated, hasRole('sudo'), getAllUsers);
userRouter.get("/:id",isAuthenticated, hasRole('sudo'), getUserById);
userRouter.patch("/",isAuthenticated, hasRole('sudo'), updateUser);
userRouter.delete("/:id",isAuthenticated, hasRole('sudo'), deleteUser);
  
  export default userRouter;
