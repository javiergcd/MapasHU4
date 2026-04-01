import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: 'prisma/schema.prisma', 
  migrations: {
    seed: "bun ./prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,

  },
});
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
  adapter,
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;