import { RequireNotAuth } from '@/components/auth'
import { TypographyH2 } from '@/components/typography'
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
import { useAppDispatch } from '@/hooks/redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { LoginSchema } from '~shared/schemas'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    dispatch({ type: 'api/auth/login', payload: values })
  }

  return (
    <div>
      <TypographyH2>Login</TypographyH2>
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
          <Button type="submit">Login</Button>
        </form>
      </Form>

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate('/registration')
          }}
        >
          Register
        </Button>
      </center>
    </div>
  )
}

export function Component() {
  return (
    <RequireNotAuth>
      <Login />
    </RequireNotAuth>
  )
}
