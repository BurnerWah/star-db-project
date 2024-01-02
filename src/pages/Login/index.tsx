import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm.tsx'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate('/registration')
          }}
        >
          Register
        </button>
      </center>
    </div>
  )
}

export default LoginPage
