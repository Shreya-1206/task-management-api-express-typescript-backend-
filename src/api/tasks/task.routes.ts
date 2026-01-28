import { Router } from "express";
import { createTask, getUserTasks , updateTask, deleteTask} from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// POST /api/tasks
router.post("/", authMiddleware, createTask);

// GET /api/tasks
router.get("/", authMiddleware, getUserTasks);

router.put("/:taskId", authMiddleware, updateTask,);

router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
