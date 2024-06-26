
import { getSdk } from "@/generated/graphql";
import { GraphQLClient } from "graphql-request";

// Check production environment and endpoint URL
const isProduction = process.env.NEXT_PUBLIC_SERVER_IS_PROD === "true";
const prodEndpoint = process.env.NEXT_PUBLIC_SERVER_PROD_URL;
const devEndpoint = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

if (isProduction && !prodEndpoint) {
  throw new Error("Production endpoint URL (NEXT_PUBLIC_SERVER_PROD_URL) must be defined.");
}

// Determine endpoint URL based on environment
const endpoint = isProduction ? prodEndpoint : devEndpoint;

if (!endpoint) {
  throw new Error(`GraphQL endpoint URL is not defined for ${isProduction ? 'production' : 'development'} environment.`);
}

// Initialize GraphQL client with the determined endpoint URL
export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include", // Include credentials to send cookies with each request
});

// Generate SDK based on the GraphQL client
export const sdk = getSdk(graphQLClient);
