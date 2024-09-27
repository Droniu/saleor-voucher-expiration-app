import { Request, Response } from "express";
import { updateEnvFile } from "../utils/envUtils";

// Controller function for handling registration
export const registerController = (req: Request, res: Response) => {
  const { auth_token } = req.body;
  const domain = req.header("saleor-api-url");

  if (!auth_token || !domain) {
    res
      .status(400)
      .json({ error: "Missing auth_token or domain in the request" });
  }

  // Save the auth_token and domain in the environment variables
  process.env.SALEOR_AUTH_TOKEN = auth_token;
  process.env.SALEOR_GRAPHQL_URL = domain;

  updateEnvFile(auth_token, domain!);

  console.log(`Received Saleor auth_token: ${auth_token}`);
  console.log(`Saleor GraphQL endpoint set to: ${domain}`);

  res
    .status(200)
    .json({ message: "Auth token and GraphQL URL saved successfully!" });
};
