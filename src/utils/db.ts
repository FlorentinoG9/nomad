import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

const isNotProduction = process.env.NODE_ENV !== "production"

if (isNotProduction) {
  globalForPrisma.prisma = prisma
}

export default prisma
