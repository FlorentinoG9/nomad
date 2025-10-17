import { initTRPC, TRPCError } from "@trpc/server"
import { headers } from "next/headers"
import { cache } from "react"
import { auth } from "@/utils/auth/auth"
export const createTRPCContext = cache(() => ({ auth: null }))

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
})

// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

export const protectedProcedure = baseProcedure.use(async ({ next, ctx }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    })
  }

  return next({ ctx: { ...ctx, auth: session } })
})
