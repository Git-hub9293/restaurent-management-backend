import { Request, Response } from "express";
import z from "zod/v4";
import prisma from "../../utils/prisma";

const schema = z.object({
  name: z.string().min(1, "Name is Required"),
  location: z.string().min(1, "Location is Required"),
});

export const UpdateBranch = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const schemaResult = schema.safeParse(req.body);
  if (schemaResult.success) {
    try {
      const { name, location } = req.body;
      const result = await prisma.branch.update({
        data: { name, location },
        where: {
          id: uid,
        },
      });
      res.status(200).json({
        status: true,
        message: "Successfully updated branch",
        detail: result,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Failed to update branch",
        detail: error,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Failed to update branch",
      detail: z.prettifyError(schemaResult.error),
    });
  }
};
