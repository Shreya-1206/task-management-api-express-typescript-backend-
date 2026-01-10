import {Router} from "express";
import healthRoutes from "./health/health.routes"
import authRoutes from "./auth/auth.routes"

const router = Router();

router.use(healthRoutes);
router.use('/auth', authRoutes);



export default router;