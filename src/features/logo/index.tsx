import Image, { type ImageProps } from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({
  alt,
  href = "/",
  src = "/logos/nomad.svg",
  className,
  ...props
}: ImageProps & { href?: string }) {
  return (
    <Link className={cn("flex items-center gap-2", className)} href={href}>
      <Image alt={alt} height={40} src={src} width={40} {...props} />
      <span className='font-bold text-4xl'>Nomad</span>
    </Link>
  )
}
