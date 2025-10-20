import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTRPC } from "@/trpc/client"

export function useGetWorkflows() {
  const trpc = useTRPC()
  return useQuery(trpc.workflows.getWorkflows.queryOptions())
}

export function useCreateWorkflow() {
  const trpc = useTRPC()

  return useMutation(
    trpc.workflows.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow created")
      },
    })
  )
}
