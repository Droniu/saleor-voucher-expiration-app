import express, { Request, Response } from "express";
import { manifest } from "./manifest";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/app", (req: Request, res: Response) => {
  res.send("Saleor Voucher Expiration App");
});

app.get("/api/manifest", (req: Request, res: Response) => {
  res.json(manifest);
});

app.post("/api/register", (req: Request, res: Response) => {
  // Extract auth_token from request body
  const { auth_token } = req.body;
  console.log(req);
  const domain = req.header("saleor-api-url");

  if (!auth_token || !domain) {
    res
      .status(400)
      .json({ error: "Missing auth_token or domain in the request" });
  }

  // Save the auth_token and domain in the environment variables
  process.env.SALEOR_AUTH_TOKEN = auth_token;
  process.env.SALEOR_GRAPHQL_URL = domain;

  // Persist the auth_token in .env file for future use
  const envPath = path.resolve(__dirname, "../.env");
  const updatedEnv = `SALEOR_AUTH_TOKEN="${auth_token}"\nSALEOR_GRAPHQL_URL="${domain}"\n`;

  // Update the .env file
  fs.writeFileSync(envPath, updatedEnv, { encoding: "utf-8" });

  console.log(`Received Saleor auth_token: ${auth_token}`);
  console.log(`Saleor GraphQL endpoint set to: ${domain}`);

  // Respond with success status
  res.status(200).json({ message: "Auth token saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
