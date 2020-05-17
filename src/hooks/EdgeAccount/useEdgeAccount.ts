import * as React from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate'
import { EdgeAccount } from '../../types'

type AccountProperties = (keyof EdgeAccount)[]

export const useEdgeAccount = (
  account: EdgeAccount,
  properties: AccountProperties = Object.keys(account) as AccountProperties,
) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map((property) => account.watch(property, forceUpdate))
    if (unsubscribes.length > 0) forceUpdate()
    const unsubscribe = () => unsubscribes.forEach((fn) => fn())

    return unsubscribe
  }

  React.useEffect(effect, [account, forceUpdate, properties])
}
