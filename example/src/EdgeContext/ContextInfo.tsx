import * as React from 'react'

import { LocalUsers } from './LocalUsers'

import { EdgeContext } from '../../../src/types'

export const ContextInfo: React.FC<{ context: EdgeContext }> = ({ context }) => (
  <div>
    <h1>Context</h1>
    {context && <LocalUsers context={context} />}
  </div>
)
