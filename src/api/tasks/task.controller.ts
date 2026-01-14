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
