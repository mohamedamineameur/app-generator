import { login, registration,checkAuth, updateUserPartialyOrCompletely, deleteUser, deleteUserById, logout,me } from "../controllers/user.controller";
import { Router } from "express";
import { isAuthorized } from "../middlewares/authorization";
const userRouter = Router();

// Routes
userRouter.post("/login", login);
userRouter.post("/registration", registration);
userRouter.get("/me",isAuthorized, me);
userRouter.patch("/update",isAuthorized, updateUserPartialyOrCompletely);
userRouter.delete("/delete",deleteUser);
userRouter.delete("/delete/:id",isAuthorized, deleteUserById);
userRouter.post("/logout",isAuthorized, logout);

export default userRouter;
