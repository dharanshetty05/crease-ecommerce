import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { registerSchema, loginSchema } from "../validators/auth.schema";
import { AuthRequest } from "../middleware/auth.middleware";

const authService = new AuthService();

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.getUserById(req.userId!);
    res.json({
        id: user.id,
        email: user.email,
        name: user.name,
  });
});


export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);
    const user = await authService.register(data.email, data.password, data.name);

    res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
    });
    });

export const login = asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);
    const { user, token } = await authService.login(data.email, data.password);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    res.json({
        id: user.id,
        email: user.email,
        name: user.name,
    });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
});
