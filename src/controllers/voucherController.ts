import { Request, Response } from "express";
import { gql } from "@urql/core";
import { getUrqlClient } from "../utils/urqlClient";

// Controller function to handle voucher expiration query
export const getVoucherExpiration = async (req: Request, res: Response) => {
  const voucherId = req.query.id as string;

  if (!voucherId) {
    res.status(400).json({ error: "Missing voucher ID in query parameters" });
  }

  try {
    const token = process.env.SALEOR_AUTH_TOKEN;
    const saleorGraphqlUrl = process.env.SALEOR_GRAPHQL_URL;

    if (!token || !saleorGraphqlUrl) {
      res.status(500).json({
        error: "Missing Saleor credentials. Please register the app first.",
      });
    }

    // Get the singleton URQL client
    const client = getUrqlClient(saleorGraphqlUrl!, token!);

    // GraphQL query for fetching voucher expiration
    const query = gql`
      query VoucherExpiration($id: ID!) {
        voucher(id: $id) {
          endDate
        }
      }
    `;

    // Run the query with the given voucher ID
    const variables = { id: voucherId };
    const response = await client.query(query, variables).toPromise();

    // Check for errors in the response
    if (response.error) {
      console.error(`GraphQL Error: ${response.error.message}`);
      res.status(500).json({ error: "Failed to fetch voucher expiration" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Failed to fetch voucher expiration: ${error}`);
    res.status(500).json({ error: "Failed to fetch voucher expiration" });
  }
};
