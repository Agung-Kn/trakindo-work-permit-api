import { Router } from "express";
import { 
    login, 
    refreshToken, 
    register 
} from "../controllers/authController.js";

const router = Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/refresh", refreshToken);

export default router;