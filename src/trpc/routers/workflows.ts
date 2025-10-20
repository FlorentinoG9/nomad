import { z } from "zod"
import { inngest } from "@/inngest/client"
import prisma from "@/utils/db"
import { createTRPCRouter, protectedProcedure } from "../init"

export const workflowsRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async () => {
    const workflows = await prisma.workflow.findMany()
    return workflows ?? []
  }),

  createWorkflow: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          name: input.name,
          description: input.description,
        },
      })

      return {
        success: true,
        message: "Workflow created",
      }
    }),

  updateWorkflow: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const workflow = await prisma.workflow.update({
        where: { id: input.id },
        data: input,
      })
      return workflow
    }),

  deleteWorkflow: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const workflow = await prisma.workflow.delete({
      where: { id: input.id },
    })
    return workflow
  }),
})
