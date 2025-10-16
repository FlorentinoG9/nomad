import prisma from "@/utils/db"
import { baseProcedure, createTRPCRouter } from "../init"
export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(async () => {
    const users = await prisma.user.findMany()
    return users
  }),
})
// export type definition of API
export type AppRouter = typeof appRouter
