"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/utils/auth/client"

const registerFormSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

type RegisterFormSchema = z.infer<typeof registerFormSchema>

export function SignupForm() {
  const router = useRouter()
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function signUp(values: RegisterFormSchema) {
    await authClient.signUp.email(
      {
        name: values.email.split("@")[0],
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          router.push("/dashboard")
          toast.success("Account created successfully")
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get started</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>

      <CardContent className='min-w-sm'>
        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit((values) => signUp(values))}>
            <article className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='example@domain.com' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='*************' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder='*************' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={form.formState.isSubmitting} type='submit'>
                {form.formState.isSubmitting && <Spinner />} <span>Sign up</span>
              </Button>

              <article className='flex flex-col items-center gap-2 text-sm'>
                <div className='flex gap-2'>
                  <span>Already have an account?</span>
                  <Link className='text-primary underline hover:text-primary/80' href='/login'>
                    Login
                  </Link>
                </div>
              </article>
            </article>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
