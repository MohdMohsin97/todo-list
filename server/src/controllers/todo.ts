import { Request, Response } from "express";
import prisma from "../db";
import { asyncHandler } from "../utils/asyncHandler";
import { CustomRequest } from "../types";

export const postTodo = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { title, description, id } = req.body;
    //   const userId = req.user?.id;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        user: {
          connect: { id },
        },
      },
    });

    res.json(todo);
  }
);

export const getTodos = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { id } = req.body;

    const todos = await prisma.todo.findMany({
      where: {
        userId: id,
      },
    });

    res.json(todos);
  }
);

export const deleteTodo = asyncHandler( async (req:CustomRequest, res: Response) => {
  const todoId = req.params.todoId;

  const todo = await prisma.todo.findUnique({
    where: {
      id : todoId
    }
  })

  if(!todo) {
    res.status(400)
    throw new Error("Todo not found")
  }

  if(!req.user){
    res.status(400)
    throw new Error("User not found")
  }

  if(todo.userId != req.user.id) {
    res.status(403)
    throw new Error("Not authorized")
  }

  await prisma.todo.delete({
    where: {
      id: todoId,
      userId: req.user.id
    }
  })
  res.json({
    DeletedId : todoId
  })
})
