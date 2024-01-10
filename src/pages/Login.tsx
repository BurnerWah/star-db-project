import { RequireNotAuth } from '@/components/auth'
import { LoginForm } from '@/components/forms/login'
import { AuthLayout } from '@/layouts/auth'

export default function Login() {
  return (
    <AuthLayout
      otherPage={{ to: '/registration', text: 'Register' }}
      title="Login"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export function Component() {
  return (
    <RequireNotAuth>
      <Login />
    </RequireNotAuth>
  )
}

Component.displayName = 'LazyLogin'
