import { caller } from "@/trpc/server"

export default async function Home() {
  const users = await caller.getUsers()
  return <main>Hello World!!!! {JSON.stringify(users)}</main>
}
