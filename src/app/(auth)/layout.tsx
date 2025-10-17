import type React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <section className='flex h-svh flex-col items-center justify-center overflow-hidden'>{children}</section>
}
