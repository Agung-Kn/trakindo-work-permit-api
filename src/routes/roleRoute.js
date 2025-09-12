import { Router } from "express";
import { authenticate } from "../middlewares/middleware.js";
import { 
    createRole, 
    deleteRole, 
    getAllRoles, 
    getRoles, 
    getRoleById, 
    updateRole 
} from "../controllers/roleController.js";

const router = Router();
router.get("/admin/categories/all", authenticate, getAllRoles);
router.get("/admin/categories", authenticate, getRoles);
router.get("/admin/categories/:id", authenticate, getRoleById);
router.post("/admin/categories/create", authenticate, createRole);
router.put("/admin/categories/:id/update", authenticate, updateRole);
router.delete("/admin/categories/:id/delete", authenticate, deleteRole);

export default router;