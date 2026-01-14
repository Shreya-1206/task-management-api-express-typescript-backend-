import { Router } from "express";
import { createTask, getUserTasks } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// POST /api/tasks
router.post("/createTask", authMiddleware, createTask);

// GET /api/tasks
router.get("/getAllTask", authMiddleware, getUserTasks);

export default router;
