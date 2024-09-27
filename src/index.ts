import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { getUrqlClient } from "./utils/urqlClient";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || "localhost";

// Initialize URQL client on server startup
const saleorGraphqlUrl = process.env.SALEOR_GRAPHQL_URL;
const token = process.env.SALEOR_AUTH_TOKEN;

if (saleorGraphqlUrl && token) {
  getUrqlClient(saleorGraphqlUrl, token);
} else {
  console.warn(
    "Warning: Saleor credentials are missing. Register the app first."
  );
}

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running at ${APP_URL}:${PORT}`);
});
