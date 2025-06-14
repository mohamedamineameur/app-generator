
  import { createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser } from "../controllers/user.controller";
  import { Router } from "express";
  const userRouter = Router();
  
  // Routes
  userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.patch("/", updateUser);
userRouter.delete("/", deleteUser);
  
  export default userRouter;
  