import { EdgeContext } from 'edge-core-js'
import { useLoginWithPassword } from 'edge-react-hooks'
import * as React from 'react'

const onChange = (cb: Function) => (event: React.SyntheticEvent<HTMLInputElement>) => cb(event.currentTarget.value)

export const LoginForm: React.FC<{ context: EdgeContext; onLogin: Function }> = ({ context, onLogin }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { loginWithPassword, error, pending, account, reset } = useLoginWithPassword(context)

  const handleLogin = () => loginWithPassword({ username, password })
  React.useEffect(() => account && onLogin(account), [account, onLogin])

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label>Username</label>
        <input
          disabled={pending}
          type={'username'}
          onChange={(event) => {
            reset()
            onChange(setUsername)(event)
          }}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          disabled={pending}
          type={'password'}
          onChange={(event) => {
            reset()
            onChange(setPassword)(event)
          }}
        />
      </div>

      {error && <div>{(error as Error).message}</div>}

      <div>
        <button disabled={pending} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}
