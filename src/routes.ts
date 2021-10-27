import { Router } from "express";
import { HealthController } from "./controllers/health.controller";

const routes = Router();

routes.use('/health', HealthController);

export { routes };