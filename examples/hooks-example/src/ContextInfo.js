// @flow

import { type EdgeContext } from 'edge-core-js'
import React from 'react'

import { LocalUsers } from './LocalUsers.js'

export const ContextInfo = ({ context }: { context: EdgeContext }) => {
  return (
    <div>
      <h1>Context</h1>
      {context && <LocalUsers context={context} />}
    </div>
  )
}
