import { RequireNotAuth } from '@/components/auth'
import { LoginForm } from '@/components/forms/Login'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

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
          <LoginForm />
          <Button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              navigate('/registration')
            }}
          >
            Register
          </Button>
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
