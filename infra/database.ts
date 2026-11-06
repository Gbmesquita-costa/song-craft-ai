import { PrismaClient } from "@prisma/client";

import { env } from "./env";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
    log: env.NODE_ENV === "development" ? ["query"] : [],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const db = globalForPrisma.prisma ?? prismaClientSingleton();
export { db };

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
