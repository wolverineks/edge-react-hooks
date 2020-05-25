import { EdgeCurrencyWallet, EdgeSpendInfo } from 'edge-core-js'
import { useMaxSpendable, useNewTransaction, useParsedUri } from 'edge-react-hooks'
// import { useBroadcastTx, useSaveTx, useSignTx } from 'edge-react-hooks'
import * as React from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import QrReader from 'react-qr-reader'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Send: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  //   const { signTx } = useSignTx()
  //   const { broadcastTx } = useBroadcastTx()
  //   const { saveTx } = useSaveTx()
  const [uri, setUri] = React.useState('')
  const { parsedUri } = useParsedUri(wallet, { uri })
  const [error, setError] = React.useState()
  const [showScanner, setShowScanner] = React.useState(false)
  const [spendInfo] = React.useState<EdgeSpendInfo>({
    currencyCode: wallet.currencyInfo.currencyCode,
    spendTargets: [
      {
        nativeAmount: parsedUri?.nativeAmount,
        publicAddress: parsedUri?.publicAddress,
      },
    ],
  })
  const { transaction } = useNewTransaction(wallet, { spendInfo })
  const { maxSpendable } = useMaxSpendable(wallet, { spendInfo })

  React.useEffect(() => {
    console.log({ transaction, maxSpendable })
  }, [transaction, maxSpendable])

  React.useEffect(() => {
    parsedUri && setShowScanner(false)
  }, [parsedUri])

  return (
    <Form>
      <FormGroup>
        <FormLabel>To:</FormLabel>
        <FormControl value={parsedUri?.publicAddress} />
      </FormGroup>

      <FormGroup>
        <FormLabel>Amount:</FormLabel>
        <FormControl value-={parsedUri?.nativeAmount} />

        {/* {error && <Alert variant={'danger'}>{(error as Error).message}</Alert>} */}
      </FormGroup>

      <FormGroup>
        <Button onClick={() => setShowScanner(true)}>Scan</Button>
        {showScanner && (
          <QrReader delay={300} onError={setError} onScan={(data) => setUri(data || '')} style={{ width: '50%' }} />
        )}
      </FormGroup>

      <FormGroup>
        <Button onClick={() => {}}>Send</Button>
      </FormGroup>
    </Form>
  )
}
