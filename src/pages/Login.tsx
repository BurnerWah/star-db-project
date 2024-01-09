import { RequireNotAuth } from '@/components/auth'
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
import { cn } from '@/lib/utils'
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
    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className={cn('absolute inset-0', 'bg-jwst-deep-field')} />
        <div className="relative z-20 flex items-center text-lg font-medium">
          StarForge
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {"Webb's First Deep Field (NIRCam Image)"}
            </p>
            <footer className="text-sm">
              Credits:{' '}
              <a href="https://webbtelescope.org/contents/media/images/2022/035/01G7DCWB7137MYJ05CSH1Q5Z1Z">
                NASA, ESA, CSA, STScI
              </a>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          </div>
          {/* <TypographyH2>Login</TypographyH2> */}
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

          {/* <center> */}
          <Button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              navigate('/registration')
            }}
          >
            Register
          </Button>
          {/* </center> */}
        </div>
      </div>
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
