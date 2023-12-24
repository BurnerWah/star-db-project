import { AppDispatch } from '@typings/actions'
import { FormEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errors = useSelector((store) => store.errors)
  const dispatch = useDispatch<AppDispatch>()

  const login: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      })
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' })
    }
  } // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:{' '}
          <input
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  )
}

export default LoginForm
