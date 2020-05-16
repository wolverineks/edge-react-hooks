import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import { useCreateAccount } from 'edge-react-hooks'
import React, { useEffect, useState } from 'react'

const onChange = (cb) => (event: SyntheticInputEvent<HTMLInputElement>) => cb(event.currentTarget.values)

export const CreateAccountForm: React.FC<{
  context: EdgeContext,
  onCreate: (EdgeAccount) => mixed,
}> = ({ context, onCreate }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')
  const [options] = useState({ otp: '' })

  const { createAccount, pending, account, error } = useCreateAccount()

  const handleCreate = () => createAccount(context, username, password, pin, options)

  useEffect(() => {
    account && onCreate(account)
  }, [account, onCreate])

  return (
    <div>
      <h1>Create User</h1>
      <div>
        <label>Username</label>
        <input disabled={pending} type={'username'} onChange={onChange(setUsername)} />
      </div>
      <div>
        <label>Password</label>
        <input disabled={pending} type={'password'} onChange={onChange(setPassword)} />
      </div>

      <div>
        <label>Pin</label>
        <input disabled={pending} type={'number'} onChange={onChange(setPin)} />
      </div>
      {error && <div>{error.message.toString()}</div>}
      <div>
        <button disabled={pending} onClick={handleCreate}>
          {pending ? 'Creating account...' : 'Create'}
        </button>
      </div>
    </div>
  )
}
