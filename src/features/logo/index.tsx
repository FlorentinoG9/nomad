import Image, { type ImageProps } from "next/image"
import Link from "next/link"

export function Logo({ alt, href = "/", src = "/logos/nomad.svg", ...props }: ImageProps & { href?: string }) {
  return (
    <Link className='flex items-center gap-2' href={href}>
      <Image alt={alt} className='size-10' height={30} src={src} width={30} {...props} />
      <span className='font-bold text-4xl'>Nomad</span>
    </Link>
  )
}
