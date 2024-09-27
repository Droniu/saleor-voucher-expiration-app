import { Request, Response } from "express";

// Controller for handling the root `/app` route
export const homeController = (req: Request, res: Response) => {
  res.send("Saleor Voucher Expiration App");
};
