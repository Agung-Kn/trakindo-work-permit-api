import { Router } from 'express';
import authRoute from "./authRoute.js";
import roleRoute from './roleRoute.js';
import formRoute from "./formRoute.js";

const routes = Router();
const basePath = "/api";

routes.use(
    basePath, 
    authRoute,
    roleRoute,
    formRoute
);

export default routes;