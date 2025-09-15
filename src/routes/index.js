import { Router } from 'express';
import authRoute from "./authRoute.js";
import roleRoute from './roleRoute.js';
import manageRoute from './managePermitRoute.js';
import workPermitRoute from './workPermitRoute.js'

const routes = Router();
const basePath = "/api";

routes.use(
    basePath, 
    authRoute,
    roleRoute,
    manageRoute,
    workPermitRoute
);

export default routes;