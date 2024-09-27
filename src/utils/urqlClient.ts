import { createClient, fetchExchange } from "@urql/core";

// Singleton URQL client, initially undefined
let urqlClient: ReturnType<typeof createClient> | undefined = undefined;

// Function to initialize the URQL client and ensure it's a singleton
export const getUrqlClient = (saleorGraphqlUrl: string, token: string) => {
  if (!urqlClient) {
    urqlClient = createClient({
      url: saleorGraphqlUrl,
      exchanges: [fetchExchange],
      fetchOptions: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    console.log("URQL Client initialized.");
  }
  return urqlClient;
};
