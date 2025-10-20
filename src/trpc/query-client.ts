import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query"
import { TRPCClientError } from "@trpc/client"
import { toast } from "sonner"

// import superjson from "superjson"

const STALE_TIME_2_MINUTES = 60 * 1000 * 2 // 2 minutes
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_2_MINUTES,
      },
      mutations: {
        onError: (error) => {
          toast.error(error instanceof TRPCClientError ? error.message : "An unknown error occurred")
        },
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  })
}
