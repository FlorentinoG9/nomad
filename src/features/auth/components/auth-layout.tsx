import type React from "react"
import { Logo } from "@/features/logo"
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='container mx-auto flex h-svh flex-col items-center justify-center gap-4 overflow-hidden px-4 md:px-0'>
      <Logo alt='Logo' height={50} src='/logos/nomad.svg' width={50} />
      {children}
    </section>
  )
}
