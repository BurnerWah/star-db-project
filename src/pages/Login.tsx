import { RequireNotAuth } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div>
      <LoginForm />

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
