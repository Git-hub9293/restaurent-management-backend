import { Request, Response } from "express";
import { z } from "zod/v4";
import prisma from "../../utils/prisma";

const schema = z.object({
  name: z.string().min(1, "Name is Required"),
  location: z.string().min(1, "Location is Required"),
});

export const AddBranch = async (req: Request, res: Response) => {
  const schemaResult = schema.safeParse(req.body);
  if (schemaResult.success) {
    const { name, location } = req.body;

    const salesData = Array.from({ length: 5 }).map(() => ({
      amount: Math.floor(Math.random() * 100) + 100,
    }));

    const expensesData = Array.from({ length: 5 }).map(() => ({
      description: "Random Expense",
      amount: Math.floor(Math.random() * 50) + 50,
    }));

    try {
      const result = await prisma.branch.create({
        data: {
          name,
          location,
          sales: {
            createMany: { data: salesData },
          },
          expenses: {
            createMany: { data: expensesData },
          },
        },
      });
      res.status(200).json({
        status: true,
        message: "Successfully added branch",
        detail: result,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Failed to add branch",
        detail: error,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Failed to add branch",
      detail: z.prettifyError(schemaResult.error),
    });
  }
};
