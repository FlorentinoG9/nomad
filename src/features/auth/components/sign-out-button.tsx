"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { authClient } from "@/utils/auth/client"

export function SignOutButton() {
  const router = useRouter()
  return (
    <Button
      onClick={async () =>
        await authClient.signOut(
          {},
          {
            onSuccess: () => {
              router.push("/login")
            },
            onError: (ctx) => {
              toast.error(ctx.error.message)
            },
          }
        )
      }
      variant='destructive'
    >
      Sign out
    </Button>
  )
}
