"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/utils/auth/client"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type FormSchema = z.infer<typeof formSchema>

export function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function signInEmail(values: FormSchema) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully")
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
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to login</CardDescription>
      </CardHeader>

      <CardContent className='min-w-sm'>
        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit((values) => signInEmail(values))}>
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

              <Button disabled={form.formState.isSubmitting} type='submit'>
                {form.formState.isSubmitting ? <Spinner /> : "Login"}
              </Button>

              <article className='flex flex-col items-center gap-2 text-sm'>
                <div className='flex gap-2'>
                  <span>Don't have an account?</span>
                  <Link className='text-primary underline hover:text-primary/80' href='/signup'>
                    Sign up
                  </Link>
                </div>

                <Link className='hover:text-primary/80 hover:underline' href='/forgot-password'>
                  Forgot password?
                </Link>
              </article>
            </article>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
