import prisma from "@/utils/db"
import { createTRPCRouter, protectedProcedure } from "../init"
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await prisma.account.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    })
    return users
  }),
})
// export type definition of API
export type AppRouter = typeof appRouter
