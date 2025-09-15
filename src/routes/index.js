import { Router } from 'express';
import authRoute from "./authRoute.js";
import roleRoute from './roleRoute.js';
import workPermitRoute from './workPermitRoutes.js'

const routes = Router();
const basePath = "/api";

routes.use(
    basePath, 
    authRoute,
    roleRoute,
    workPermitRoute
);

export default routes;