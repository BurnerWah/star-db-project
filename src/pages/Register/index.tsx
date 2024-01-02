import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm/RegisterForm.tsx'

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate('/login')
          }}
        >
          Login
        </button>
      </center>
    </div>
  )
}

export default RegisterPage
