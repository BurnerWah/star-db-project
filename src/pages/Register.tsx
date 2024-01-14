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

export const Component = () => (
  <RequireNotAuth>
    <Register />
  </RequireNotAuth>
)

Component.displayName = 'LazyRegister'
