import { EdgeContextOptions, makeEdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useMutation } from 'react-query'

export const useNewEdgeContext = ({ apiKey, appId, authServer, hideKeys, path, plugins }: EdgeContextOptions) => {
  const [execute, { data: context, ...rest }] = useMutation(() =>
    makeEdgeContext({ apiKey, appId, authServer, hideKeys, path, plugins }),
  )
  React.useEffect(() => {
    execute()
  }, [execute, apiKey, appId, authServer, hideKeys, path, plugins])

  return { context, ...rest }
}
