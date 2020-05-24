import { EdgeCurrencyWallet } from 'edge-core-js'
// import { useBroadcastTx, useSaveTx, useSignTx } from 'edge-react-hooks'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Send: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  //   const { signTx } = useSignTx()
  //   const { broadcastTx } = useBroadcastTx()
  //   const { saveTx } = useSaveTx()

  return (
    <div>
      <h1>Send</h1>

      <div>
        <label>
          To: <input onChange={() => null} />
        </label>
      </div>

      <div>
        <label>
          Amount: <input onChange={() => null} />
        </label>
      </div>
      <button onClick={() => null}>Send</button>
    </div>
  )
}
