import { Request, Response } from "express";
import {TaskModel} from "../../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority } = req.body;

    const userId = (req as any).user.id;

    const task = await TaskModel.create({
      title,
      description,
      status,
      priority,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const tasks = await TaskModel.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const userId = (req as any).user.id;

    // 1️⃣ Find task by id
    const task = await TaskModel.findById(taskId);

    // 2️⃣ Task not found
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 3️⃣ Ownership check
    if (task.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this task",
      });
    }

    // 4️⃣ Update allowed fields only
    const allowedUpdates = ["title", "description", "status", "priority"];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        (task as any)[field] = req.body[field];
      }
    });

    await task.save();

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const userId = (req as any).user.id;

    // 1️⃣ Find task
    const task = await TaskModel.findById(taskId);

    // 2️⃣ Task not found
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 3️⃣ Ownership check
    if (task.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this task",
      });
    }

    // 4️⃣ Delete task
    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};


