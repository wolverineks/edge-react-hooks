import * as React from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'
import { EdgeContext } from '../../types.js'

type ContextProperties = (keyof EdgeContext)[]

export const useEdgeContext = (
  context: EdgeContext,
  properties: ContextProperties = Object.keys(context) as ContextProperties,
) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map((property) => context.watch(property, forceUpdate), [])
    if (unsubscribes.length > 0) forceUpdate()
    const unsubscribe = () => unsubscribes.forEach((fn) => fn())

    return unsubscribe
  }

  React.useEffect(effect, [context, forceUpdate, properties])
}
