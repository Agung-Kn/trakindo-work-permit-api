import { Router } from 'express';
import {
  createWorkPermit,
} from '../controllers/workPermitController.js';
import { authenticate } from '../middlewares/middleware.js';

const router = Router();

router.post('/public/work-permits/create', authenticate, createWorkPermit);

export default router;