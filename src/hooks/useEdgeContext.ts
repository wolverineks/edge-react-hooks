import { EdgeContext, EdgeContextOptions, makeEdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useEdgeContext = ({ apiKey, appId, authServer, hideKeys, path, plugins }: EdgeContextOptions) => {
  const { onSuccess, onError, pending, error, data: context } = useAsync<EdgeContext>({ pending: true })

  React.useEffect(() => {
    makeEdgeContext({ apiKey, appId, authServer, hideKeys, path, plugins }).then(onSuccess).catch(onError)
  }, [apiKey, appId, authServer, hideKeys, onError, onSuccess, path, plugins])

  return {
    context,
    error,
    pending,
  }
}
