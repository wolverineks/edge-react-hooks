// @flow

import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import { useLoginWithPassword } from 'edge-react-hooks'
import React, { useEffect, useState } from 'react'

export const LoginForm = ({ context, onLogin }: { context: EdgeContext, onLogin: EdgeAccount => mixed }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loginWithPassword, pending, account, error } = useLoginWithPassword()

  const handleLogin = () => loginWithPassword(context, username, password, {})

  useEffect(() => {
    account && onLogin(account)
  }, [account])

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username</label>
        <input
          disabled={pending}
          type={'username'}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          disabled={pending}
          type={'password'}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => setPassword(event.target.value)}
        />
      </div>
      {error && <div>{error.message.toString()}</div>}
      <div>
        <button disabled={pending} onClick={handleLogin}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}
