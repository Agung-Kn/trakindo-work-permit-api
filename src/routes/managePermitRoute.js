import { Router } from 'express';
import { authenticate } from '../middlewares/middleware.js';
import { approvePermit, getPermitById, getPermits } from '../controllers/managePermitController.js';

const router = Router();
router.get('/admin/permits', authenticate, getPermits);
router.get('/admin/permits/:id', authenticate, getPermitById);
router.patch("/admin/permits/:id/approve", authenticate, approvePermit);

export default router;