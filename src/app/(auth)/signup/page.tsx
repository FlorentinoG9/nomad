import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignupForm } from "@/features/auth/components/register-form"

export default function SignupPage() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Get started</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  )
}
