// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEdgeContext } from 'edge-react-hooks'
import React from 'react'

export const ContextInfo = ({ context }: { context: EdgeContext }) => {
  useEdgeContext(context, [])

  return (
    <div>
      Context
      <div>
        Previously Logged-In Accounts
        {context.localUsers.map(({ username }) => (
          <div key={username}>
            {username} - <button onClick={() => context.deleteLocalAccount(username)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}
