import { AppManifest } from "@saleor/app-sdk/types";

export const manifest: AppManifest = {
  id: "saleor-voucher-expiration-app",
  version: "1.0.0",
  name: "Saleor Voucher Expiration App",
  permissions: ["MANAGE_DISCOUNTS"],
  // replace with ngrok or something
  appUrl: "http://localhost:3000/app",
  tokenTargetUrl: "http://localhost:3000/api/register",
};
