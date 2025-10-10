import { ClientSecretCredential } from "@azure/identity";
type TokenServiceConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
};

export const getAccessToken = async (
  config: TokenServiceConfig,
  scopes: string[]
): Promise<string> => {
  try {
    console.log("Fetching access token...");

    const credential = new ClientSecretCredential(
      config.tenantId,
      config.clientId,
      config.clientSecret
    );

    const tokenResponse = await credential.getToken(scopes);

    if (!tokenResponse?.token) {
      throw new Error("Failed to retrieve access token");
    }

    console.log("Access token retrieved successfully");
    return tokenResponse.token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};
