import { type EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useLoginWithPassword } from 'edge-react-hooks'

const onChange = (cb) => (event: SyntheticInputEvent<HTMLInputElement>) => cb(event.currentTarget.value)

export const LoginForm: React.FC<{ context: EdgeContext, onLogin: Functin }> = ({ context, onLogin }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { loginWithPassword, error, pending, account } = useLoginWithPassword()

  const handleLogin = () => loginWithPassword(context, username, password)
  React.useEffect(() => account && onLogin(account), [account, onLogin])

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label>Username</label>
        <input disabled={pending} type={'username'} onChange={onChange(setUsername)} />
      </div>

      <div>
        <label>Password</label>
        <input disabled={pending} type={'password'} onChange={onChange(setPassword)} />
      </div>

      {error && <div>{error.message}</div>}

      <div>
        <button disabled={pending} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}
