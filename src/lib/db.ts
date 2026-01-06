import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Validate DATABASE_URL format (Neon uses postgresql://)
const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl) {
  const isValid = databaseUrl.startsWith('postgresql://') || 
                  databaseUrl.startsWith('postgres://') ||
                  databaseUrl.startsWith('postgresql+pooler://') ||
                  databaseUrl.includes('neon.tech');
  if (!isValid) {
    console.error('Invalid DATABASE_URL format. Must be a PostgreSQL connection string.');
    console.error('Current DATABASE_URL starts with:', databaseUrl.substring(0, 30));
    console.error('For Neon, the URL should start with postgresql://');
  } else {
    console.log('DATABASE_URL format validated successfully');
  }
} else {
  console.warn('DATABASE_URL is not set');
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// In serverless environments, don't reuse the connection across requests
// But in development, reuse it to avoid too many connections
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}