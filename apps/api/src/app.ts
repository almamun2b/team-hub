import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

app.set("trust proxy", 1);

app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://team-hub.up.railway.app"],
    credentials: true,
  })
);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Collaborative Team Hub API is running!",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/v1", router);

// Global Error Handler
app.use(globalErrorHandler);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
