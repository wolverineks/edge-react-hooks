import { EdgeContext } from 'edge-core-js'
import { useDeleteLocalAccount, useLoginMessages, useWatch } from 'edge-react-hooks'
import * as React from 'react'

import { useTimeout } from '../utils'

export const LocalUsers: React.FC<{ context: EdgeContext }> = ({ context }) => {
  useWatch(context, 'localUsers')

  if (!context.localUsers) {
    return (
      <div>
        <div>Previously Logged-In Accounts</div>
        <div> Loading.... </div>
      </div>
    )
  }

  if (context.localUsers.length <= 0) {
    return (
      <div>
        <div>Previously Logged-In Accounts</div>
        <div> ------ </div>
      </div>
    )
  }

  return (
    <div>
      <div>Previously Logged-In Accounts</div>
      {context.localUsers &&
        context.localUsers.map(({ username }) => <LocalUserRow context={context} username={username} key={username} />)}
    </div>
  )
}

const LocalUserRow: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  const { pending, deleteLocalAccount, error, reset } = useDeleteLocalAccount(context)
  const timeout = useTimeout()

  React.useEffect(() => {
    error && timeout(reset, 2500)
  }, [error, reset, timeout])

  return (
    <div key={username}>
      {username} -{' '}
      <button disabled={pending} onClick={() => deleteLocalAccount(username)}>
        {pending ? 0 : 'X'}
      </button>
      {error && <div>{error.message}</div>}
      <LoginMessages context={context} username={username} />
    </div>
  )
}

const LoginMessages: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  const { loginMessages } = useLoginMessages(context)

  if (!loginMessages) {
    return <div>Loading...</div>
  }

  if (Object.keys(loginMessages[username]).length <= 0) {
    return <div>No messages</div>
  }

  const { otpResetPending, recovery2Corrupt } = loginMessages[username]

  return (
    <div>
      <div key={username}>
        <div>otpResetPending: {otpResetPending.toString()}</div>
        <div>recovery2Corrupt: {recovery2Corrupt.toString()}</div>
      </div>
    </div>
  )
}
