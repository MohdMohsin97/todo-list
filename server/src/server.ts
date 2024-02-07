import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user";
import todoRouter from "./routes/todo"
import { errorHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/authmiddleware";

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/todos",authenticateToken, todoRouter)

app.all("*", (req, res, next) => {
  res.status(404);
  throw new Error(`Can't find the ${req.originalUrl} on the server!`);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});

export default app;
