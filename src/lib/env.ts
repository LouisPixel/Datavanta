import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
// Skip validation during build if env vars are not set
// This allows the build to complete, but the app will fail at runtime if vars are missing
// Set SKIP_ENV_VALIDATION=true in Netlify if you want to skip validation entirely
const skipValidation = 
  !!process.env.SKIP_ENV_VALIDATION || 
  (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'development');

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url().optional(),
    // Make Google OAuth optional - they might not be set
    AUTH_GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  },
  skipValidation,
});