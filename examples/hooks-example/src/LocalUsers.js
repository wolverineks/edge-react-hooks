// @flow

import { type EdgeContext } from 'edge-core-js'
import { useDeleteLocalAccount } from 'edge-react-hooks'
import React, { useEffect, useState } from 'react'

type Props = { context: EdgeContext, localUsers: $PropertyType<EdgeContext, 'localUsers'> }

export const LocalUsers = ({ context, localUsers }: Props) => {
  return (
    <div>
      <div>Previously Logged-In Accounts</div>
      {localUsers.map(({ username }) => (
        <LocalUserRow context={context} username={username} key={username} />
      ))}
    </div>
  )
}

const LocalUserRow = ({ context, username }: { context: EdgeContext, username: string }) => {
  const { pending, deleteLocalAccount, error, reset } = useDeleteLocalAccount()
  const timeout = useTimeout()

  useEffect(() => {
    error && timeout(reset, 2500)
  }, [error])

  return (
    <div key={username}>
      {username} -{' '}
      <button disabled={pending} onClick={() => deleteLocalAccount(context, username)}>
        {pending ? 0 : 'X'}
      </button>
      {error && <div key={1}>{error.message}</div>}
    </div>
  )
}

const useTimeout = () => {
  const [{ callback, delay }, set] = useState({ callback: () => null, delay: 0 })

  useEffect(() => {
    const id = setTimeout(callback, delay)
    return () => clearTimeout(id)
  }, [callback, delay])

  const timeout = (callback: () => mixed, delay: number) => {
    set({ callback, delay })
  }

  return timeout
}
