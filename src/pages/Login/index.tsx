import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'

export default function Login() {
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
