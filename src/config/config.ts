interface Config {
  backofficeApiBaseUrl: string;
  orderApiBaseUrl: string;
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndpoint: string;
  googleClientId: string;
  googleClientSecret: string;
  orderAppUrl: string;
}

export const config: Config = {
  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  orderApiBaseUrl: process.env.NEXT_PUBLIC_ORDER_API_BASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
};
