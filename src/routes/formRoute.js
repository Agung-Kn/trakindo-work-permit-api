import { Router } from "express";
import { authenticate } from "../middlewares/middleware.js";
import { getFormBySlug } from '../controllers/formController.js';

const router = Router();
router.get('/public/forms/:slug', authenticate, getFormBySlug);

export default router;