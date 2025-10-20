import prisma from "@/utils/db"
import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s")

    await step.sleep("wait-a-moment-2", "2s")

    await step.sleep("wait-a-moment-3", "3s")

    await step.run("create-workflow", async () =>
      prisma.workflow.create({
        data: {
          name: event.data.name,
          description: event.data.description,
        },
      })
    )
  }
)
