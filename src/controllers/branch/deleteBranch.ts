import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const DeleteBranch = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const result = await prisma.branch.delete({
      where: {
        id: uid,
      },
    });
    res.status(200).json({
      status: true,
      message: "Successfully deleted branch",
      detail: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to delete branch",
      detail: error,
    });
  }
};
