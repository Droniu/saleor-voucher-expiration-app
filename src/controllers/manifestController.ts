import { Request, Response } from "express";
import { manifest } from "../manifest";

// Controller for handling `/api/manifest` route
export const manifestController = (req: Request, res: Response) => {
  res.json(manifest);
};
