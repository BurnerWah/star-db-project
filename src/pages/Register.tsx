import { RequireNotAuth } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
  const navigate = useNavigate()

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate('/login')
          }}
        >
          Login
        </Button>
      </center>
    </div>
  )
}

export function Component() {
  return (
    <RequireNotAuth>
      <Register />
    </RequireNotAuth>
  )
}
