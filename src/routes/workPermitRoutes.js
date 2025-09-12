import { Router } from 'express';
import {
  getWorkPermits,
  createWorkPermit,
  getWorkPermitById,
  deleteWorkPermit,
} from '../controllers/workPermitController.js';

const router = Router();

router.get('/work-permits/', getWorkPermits);
router.get('/work-permits/:id', getWorkPermitById);
router.post('/work-permits/', createWorkPermit);
router.delete('/work-permits/:id', deleteWorkPermit);

export default router;