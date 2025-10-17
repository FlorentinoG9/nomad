import prisma from "@/utils/db"
import { createTRPCRouter, protectedProcedure } from "../init"

export const usersRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    })
    return users
  }),
})
