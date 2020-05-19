import { EdgeAccount, EdgeContext } from 'edge-core-js'
import { useCreateAccount } from 'edge-react-hooks'
import React from 'react'

const onChange = (cb: Function) => (event: React.SyntheticEvent<HTMLInputElement>) => cb(event.currentTarget.value)

export const CreateAccountForm: React.FC<{
  context: EdgeContext
  onCreate: (account: EdgeAccount) => any
}> = ({ context, onCreate }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pin, setPin] = React.useState('')
  const [options] = React.useState({ otp: '' })

  const { createAccount, pending, account, error } = useCreateAccount(context)

  const handleCreate = () => createAccount(username, password, pin, options)

  React.useEffect(() => {
    account && onCreate(account as EdgeAccount)
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
