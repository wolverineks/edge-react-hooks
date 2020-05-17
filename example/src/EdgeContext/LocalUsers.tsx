import { useDeleteLocalAccount, useEdgeContext } from 'edge-react-hooks'
import * as React from 'react'

import { EdgeContext } from '../../../src/types'

const properties: (keyof EdgeContext)[] = ['localUsers']

export const LocalUsers: React.FC<{ context: EdgeContext }> = ({ context }) => {
  useEdgeContext(context, properties)

  return (
    <div>
      <div>Previously Logged-In Accounts</div>
      {context.localUsers.map(({ username }) => (
        <LocalUserRow context={context} username={username} key={username} />
      ))}
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
    </div>
  )
}

const useTimeout = () => {
  const [{ callback, delay }, set] = React.useState({ callback: () => null, delay: 0 })

  React.useEffect(() => {
    const id = setTimeout(callback, delay)
    return () => clearTimeout(id)
  }, [callback, delay])

  const timeout = React.useCallback((callback: () => any, delay: number) => {
    set({ callback, delay })
  }, [])

  return timeout
}
