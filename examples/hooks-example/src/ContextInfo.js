// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEdgeContext } from 'edge-react-hooks'
import React from 'react'

import { LocalUsers } from './LocalUsers.js'

export const ContextInfo = ({ context }: { context: EdgeContext }) => {
  useEdgeContext(context, ['localUsers'])

  return (
    <div>
      <LocalUsers context={context} localUsers={context.localUsers} />
    </div>
  )
}
