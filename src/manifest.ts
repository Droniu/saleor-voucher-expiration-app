import { AppManifest } from "@saleor/app-sdk/types";
import dotenv from "dotenv";

dotenv.config();
export const manifest: AppManifest = {
  id: "saleor-voucher-expiration-app",
  version: "1.0.0",
  name: "Saleor Voucher Expiration App",
  permissions: ["MANAGE_DISCOUNTS"],
  appUrl: process.env.APP_URL || "http://localhost:3000",
  tokenTargetUrl:
    process.env.TOKEN_TARGET_URL || "http://localhost:3000/api/register",
};
