import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import prisma from "./utils/prisma";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/health", async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

export default app;
