import { Router } from "express";
import { 
    login, 
    profile, 
    refreshToken, 
    register 
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/middleware.js";

const router = Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/refresh", refreshToken);
router.get("/auth/me", authenticate, profile);

export default router;