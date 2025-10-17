import prisma from "@/utils/db"
import { createTRPCRouter, protectedProcedure } from "../init"

export const usersRouter = createTRPCRouter({
  getCurrentUsers: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.auth.user.id,
      },
    })

    return user
  }),
})
