import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap'

import { fiatCurrencyInfos } from '../utils/fiatInfos'
import { useDefaultFiatCurrencyCode } from '../utils/hooks'
import { getFiatInfo } from '../utils/utils'

export const DefaultFiat = ({ account }: { account: EdgeAccount }) => {
  const { read, write } = useDefaultFiatCurrencyCode(account)

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <ListGroupItem>Default Fiat: Loading...</ListGroupItem>

  const pending = write.status === 'loading'
  const defaultFiatInfo = getFiatInfo({ currencyCode: read.data })

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroupItem>
        <Form>
          <FormGroup>
            <FormLabel>Default Fiat: {read.data}</FormLabel>
            <FormControl
              as={'select'}
              disabled={pending}
              onChange={(event) => write.execute({ data: event.currentTarget.value }).then(() => read.execute())}
              defaultValue={read.data}
            >
              {defaultFiatInfo && (
                <option key={defaultFiatInfo.isoCurrencyCode} value={defaultFiatInfo.isoCurrencyCode}>
                  {defaultFiatInfo.symbol} - {defaultFiatInfo.currencyCode}
                </option>
              )}
              {fiatCurrencyInfos.map((info) => (
                <option key={info.isoCurrencyCode} value={info.isoCurrencyCode}>
                  {info.symbol} - {info.currencyCode}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Form>
      </ListGroupItem>
    </ListGroup>
  )
}
