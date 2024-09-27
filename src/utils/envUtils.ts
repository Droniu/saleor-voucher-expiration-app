import path from "path";
import fs from "fs";

// Utility function to update environment variables in .env file
export const updateEnvFile = (authToken: string, domain: string) => {
  const envPath = path.resolve(__dirname, "../../.env");
  const updatedEnv = `SALEOR_AUTH_TOKEN="${authToken}"\nSALEOR_GRAPHQL_URL="${domain}"\n`;

  fs.writeFileSync(envPath, updatedEnv, { encoding: "utf-8" });
};
