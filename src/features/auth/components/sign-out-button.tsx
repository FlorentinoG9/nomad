"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/utils/auth/client"

export function SignOutButton() {
  return (
    <Button onClick={async () => await authClient.signOut()} variant='destructive'>
      Sign out
    </Button>
  )
}
