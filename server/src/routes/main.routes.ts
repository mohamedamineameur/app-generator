import { Router } from "express";
import userRouter from "./user.routes";


const mainRouter = Router();

// Default route
mainRouter.get("/", (_req, res) => {
  res.send("API is running 🚀");
}
);


mainRouter.use("/api/users", userRouter);
export default mainRouter;