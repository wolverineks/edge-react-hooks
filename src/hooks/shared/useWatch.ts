import * as React from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate'

export const useWatch = <T extends { watch: Function }>(object: T, ...properties: (keyof T)[]) => {
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const unsubs = properties.map((property) => object.watch(property, forceUpdate))

    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [object, forceUpdate, properties])
}
