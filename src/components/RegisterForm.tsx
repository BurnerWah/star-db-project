import { TypographyH2 } from '@/components/typography'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegisterSchema } from '~shared/schemas'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

function RegisterForm() {
  const dispatch = useAppDispatch()
  const errors = useAppSelector((store) => store.errors)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    dispatch({ type: 'api/auth/register', payload: values })
  }

  return (
    <>
      <TypographyH2>Register User</TypographyH2>
      {errors.registrationMessage && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.registrationMessage}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormDescription>Enter your username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  )
}

export default RegisterForm
