import { SignOutButton } from "@/features/auth/components/sign-out-button"
import { caller } from "@/trpc/server"
export default async function Home() {
  const users = await caller.users.getUsers()

  return (
    <section className='flex h-svh flex-col items-center justify-center overflow-hidden'>
      <h1 className='font-bold text-2xl'>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <SignOutButton />
    </section>
  )
}
