import { EdgeAccount, EdgeContext } from 'edge-core-js'
import { useChangePin, usePinLoginEnabled } from 'edge-react-hooks'
import * as React from 'react'
import { Form, FormGroup, ListGroup, ListGroupItem } from 'react-bootstrap'

export const PinLogin = ({ context, account }: { context: EdgeContext; account: EdgeAccount }) => {
  const { execute, data, error, status } = usePinLoginEnabled(context, { username: account.username })
  const changePin = useChangePin(account)

  if (status === 'error') return <ListGroupItem>Error: {(error as Error).message}</ListGroupItem>
  if (status === 'idle' || status === 'loading') return <ListGroupItem>Loading...</ListGroupItem>

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroupItem>
        Pin Login: {String(data)}
        <Form>
          <FormGroup>
            <Form.Check
              type={'switch'}
              checked={data as any}
              label={'Pin Login Enabled'}
              id={'pinLoginEnabled'}
              disabled={changePin.status === 'loading'}
              onChange={() => changePin.execute({ options: { enableLogin: !data } as any }).then(() => execute())}
            />
          </FormGroup>
        </Form>
      </ListGroupItem>
    </ListGroup>
  )
}
