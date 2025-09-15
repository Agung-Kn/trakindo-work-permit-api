import { Router } from 'express';
import {
  createWorkPermit,
  deleteWorkPermit,
  getWorkPermitById,
  getWorkPermits,
  updateWorkPermit,
} from '../controllers/workPermitController.js';
import { authenticate } from '../middlewares/middleware.js';

const router = Router()
router.get('/public/work-permits', authenticate, getWorkPermits);
router.get('/public/work-permits/:id', authenticate, getWorkPermitById);
router.post('/public/work-permits/create', authenticate, createWorkPermit);
router.put('/public/work-permits/:id/update', authenticate, updateWorkPermit);
router.delete('/public/work-permits/:id/delete', authenticate, deleteWorkPermit);

export default router;