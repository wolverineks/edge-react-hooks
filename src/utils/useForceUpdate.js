// @flow

import { useState } from 'react'

export const useForceUpdate = () => {
  const [, setState] = useState(false)
  const forceUpdate = () => setState(state => !state)
  return forceUpdate
}
