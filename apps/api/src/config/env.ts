import dotenv from "dotenv";
import httpStatus from "http-status";
import ApiError from "../app/errors/ApiError";

interface Env {
  nodeEnv: "development" | "production";
  port: string;
  databaseUrl: string;
  clientUrl: string;
  bcryptSaltRound: string;
  superAdmin: {
    email: string;
    password: string;
    fullName: string;
  };
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
  };
  bravo: {
    apiKey: string;
    email: string;
  };
}

dotenv.config();

const getEnvVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    return "";
  }
  return value;
};

const env: Env = {
  nodeEnv: (getEnvVar("NODE_ENV") || "development") as "development" | "production",
  port: getEnvVar("PORT") || "4000",
  databaseUrl: getEnvVar("DATABASE_URL"),
  clientUrl: getEnvVar("CLIENT_URL") || "http://localhost:3000",
  bcryptSaltRound: getEnvVar("BCRYPT_SALT_ROUND") || "12",
  superAdmin: {
    email: getEnvVar("SUPER_ADMIN_EMAIL") || "admin@fredocloud.com",
    password: getEnvVar("SUPER_ADMIN_PASSWORD") || "admin123",
    fullName: getEnvVar("SUPER_ADMIN_FULL_NAME") || "Super Admin",
  },
  cloudinary: {
    cloudName: getEnvVar("CLOUDINARY_CLOUD_NAME"),
    apiKey: getEnvVar("CLOUDINARY_API_KEY"),
    apiSecret: getEnvVar("CLOUDINARY_API_SECRET"),
  },
  jwt: {
    accessTokenSecret: getEnvVar("JWT_ACCESS_TOKEN_SECRET") || "secret",
    accessTokenExpiresIn: getEnvVar("JWT_ACCESS_TOKEN_EXPIRES_IN") || "1d",
    refreshTokenSecret: getEnvVar("JWT_REFRESH_TOKEN_SECRET") || "refresh-secret",
    refreshTokenExpiresIn: getEnvVar("JWT_REFRESH_TOKEN_EXPIRES_IN") || "30d",
  },
  bravo: {
    apiKey: getEnvVar("BREVO_API_KEY"),
    email: getEnvVar("BREVO_SENDER_EMAIL"),
  },
};

export { env };
