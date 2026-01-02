import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export interface AuthRequest extends Request {
    userId?: string;
}

export const requireAuth = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
    ) => {
    const token = req.cookies?.token;

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    try {
        const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
        ) as { userId: string };

        req.userId = payload.userId;
        next();
    } catch {
        throw new AppError("Unauthorized", 401);
    }
};
