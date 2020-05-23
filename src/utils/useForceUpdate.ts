import * as React from 'react'

export const useForceUpdate = () => {
  const [, setState] = React.useState(false)
  const forceUpdate = React.useCallback(() => setState((state) => !state), [])

  return forceUpdate
}
