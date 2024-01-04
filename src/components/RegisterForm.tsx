import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

function RegisterForm() {
  const dispatch = useAppDispatch()

  const errors = useAppSelector((store) => store.errors)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      className="formPanel"
      onSubmit={(e) => {
        e.preventDefault()

        dispatch({
          type: 'REGISTER',
          payload: {
            username: username,
            password: password,
          },
        })
      }}
    >
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:{' '}
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:{' '}
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  )
}

export default RegisterForm
