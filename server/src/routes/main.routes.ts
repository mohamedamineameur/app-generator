import userRouter from "./user.routes";
import { Router } from "express";

const mainRouter = Router();

// Default route
mainRouter.get("/", (_req, res) => {
  res.send("API is running 🚀");
}
);
// User routes
mainRouter.use("/api/users", userRouter);

export default mainRouter;