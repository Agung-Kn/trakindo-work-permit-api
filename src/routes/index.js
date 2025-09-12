import { Router } from 'express';
import workPermitRoutes from './workPermitRoutes.js';

const routes = Router();
const basePath = "/api";

routes.use(basePath, workPermitRoutes);

export default routes;