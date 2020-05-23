import * as React from 'react'

export const fileName = (path: string) => (path.match(/\w*\.\w*/) || [])[0] || ''

export const useInterval = (callback: Function, interval = 1000) => {
  React.useEffect(() => {
    const id = setInterval(callback, interval)
    return () => clearInterval(id)
  }, [callback, interval])
}
