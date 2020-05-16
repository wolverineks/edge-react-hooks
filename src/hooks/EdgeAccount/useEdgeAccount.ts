import * as React from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'
import { EdgeAccount } from '../../types.js'

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
