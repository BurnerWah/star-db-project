import { RequireNotAuth } from '@/components/auth'
import { RegisterForm } from '@/components/forms/register'
import { AuthLayout } from '@/layouts/auth'

export default function Register() {
  return (
    <AuthLayout otherPage={{ to: '/login', text: 'Login' }} title="Register">
      <RegisterForm />
    </AuthLayout>
  )
}

export function Component() {
  return (
    <RequireNotAuth>
      <Register />
    </RequireNotAuth>
  )
}

Component.displayName = 'LazyRegister'
