import { Router } from "express";
import { register, login, logout, me } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", requireAuth, me);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
