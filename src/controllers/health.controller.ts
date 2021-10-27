import { Router } from "express";
import ServiceCollection from "../providers";
import { HealthService } from "../services/health.service";

const healthController = Router();
const healthService = ServiceCollection.resolve(HealthService);

healthController.get("/", (req, res) => {
    const healthStatus = healthService.health();
    res.render('health/health', {
        healthStatus
    })
})

export { healthController as HealthController };