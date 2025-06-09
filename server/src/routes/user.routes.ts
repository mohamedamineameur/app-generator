import { login, registration,checkAuth, updateUserPartialyOrCompletely, deleteUser, deleteUserById, logout,me } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

// Routes
userRouter.post("/login", login);
userRouter.post("/registration", registration);
userRouter.get("/me", me);
userRouter.patch("/update", updateUserPartialyOrCompletely);
userRouter.delete("/delete", deleteUser);
userRouter.delete("/delete/:id", deleteUserById);
userRouter.post("/logout", logout);

export default userRouter;
