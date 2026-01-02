import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import prisma from "./utils/prisma";

const app = express();

app.use(cors());
app.use(express.json());

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
