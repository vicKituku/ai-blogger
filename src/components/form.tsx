'use client'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'

import { createCompletion } from '@/app/actions'
import { useFormStatus } from 'react-dom'

export default function Form() {
  async function action(formData: FormData) {
    const prompt = formData.get('prompt')
    // if (!prompt) {
    //   //show toast notification
    //   toast.error('Prompt is required.')
    // }
    // call server action
    const result = await createCompletion(prompt as string)
    if (result?.error) {
      toast.error(result.error)
    }
  }
  return (
    <section className='mx-auto max-w-lg'>
      <Card className='border-0 shadow-none'>
        <CardHeader className='text-center'>
          <CardTitle>Next AI Blogger</CardTitle>
          <CardDescription>Generate a blog post about anything</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className='mt-3'>
            <Input
              name='prompt'
              placeholder='What should i write about?'
              className='rounded-lg'
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      <SignedIn>
        <Button
          size='sm'
          type='submit'
          className={cn('mt-3 w-full rounded-lg', pending && 'animate-pulse')}
        >
          {pending ? 'Working on it...' : 'Submit'}
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button
            size='sm'
            type='button'
            variant='secondary'
            className='mt-3 w-full rounded-lg'
          >
            Sign in to start
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}
