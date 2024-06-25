// Import necessary modules
import { getSdk } from "@/generated/graphql";
import { GraphQLClient } from "graphql-request";

// Check production environment and endpoint URL
if (process.env.NEXT_PUBLIC_SERVER_IS_PROD === "true" && !process.env.NEXT_PUBLIC_SERVER_PROD_URL) {
  throw new Error("Production endpoint must be defined in NEXT_PUBLIC_SERVER_PROD_URL");
}

// Determine endpoint URL based on environment
const endpoint = process.env.NEXT_PUBLIC_SERVER_IS_PROD === "true"
  ? process.env.NEXT_PUBLIC_SERVER_PROD_URL || ""
  : process.env.NEXT_PUBLIC_SERVER_DEV_URL || "";

// Throw error if endpoint URL is not defined
if (!endpoint) {
  throw new Error("Endpoint URL is not defined.");
}

// Initialize GraphQL client with the determined endpoint URL
export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include", // Include credentials to send cookies with each request
});

// Generate SDK based on the GraphQL client
export const sdk = getSdk(graphQLClient);
