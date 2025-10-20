"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty } from "@/components/ui/empty"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useCreateWorkflow, useGetWorkflows } from "@/hooks/use-workflows"

export default function Dashboard() {
  return (
    <div>
      <h1>Workflows</h1>
      <WorkflowList />
      <CreateWorkflowForm />
    </div>
  )
}

function WorkflowList() {
  const { data: workflows } = useGetWorkflows()

  if (!workflows || workflows.length === 0) {
    return <Empty>No workflows found</Empty>
  }

  return (
    <ul>
      {workflows.map((workflow) => (
        <li key={workflow.id}>{workflow.name}</li>
      ))}
    </ul>
  )
}

function CreateWorkflowForm() {
  const createWorkflowFormSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  })

  type CreateWorkflowFormSchema = z.infer<typeof createWorkflowFormSchema>

  const form = useForm<CreateWorkflowFormSchema>({
    resolver: zodResolver(createWorkflowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const { mutate: createWorkflow } = useCreateWorkflow()

  function handleSubmit(values: CreateWorkflowFormSchema) {
    createWorkflow(values)
  }

  return (
    <Card className='max-w-sm'>
      <CardHeader>
        <CardTitle>Create Workflow</CardTitle>
        <CardDescription>Create a new workflow to automate your tasks</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => <Input placeholder='Name' type='text' {...field} />}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => <Input placeholder='Description' type='text' {...field} />}
            />
            <Button className='w-full' disabled={form.formState.isSubmitting} type='submit'>
              {form.formState.isSubmitting ? <Spinner /> : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
