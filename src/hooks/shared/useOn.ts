import * as React from 'react'

export const useOnClose = (object: { on: Function }, callback: (response: undefined) => any) => {
  React.useEffect(() => {
    const unsubscribe = object.on('close', callback as any)

    return () => {
      unsubscribe()
    }
  }, [object, callback])
}
