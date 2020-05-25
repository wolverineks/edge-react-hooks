import { EdgeContext } from 'edge-core-js'
import { useDeleteLocalAccount, useLoginMessages, useLoginWithPin, useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Card, Col, Form, FormControl, FormGroup, FormLabel, ListGroup, Row } from 'react-bootstrap'

import { useTimeout } from '../utils'

export const PinLogin: React.FC<{ context: EdgeContext; onLogin: Function }> = ({ context, onLogin }) => {
  useWatch(context, 'localUsers')

  return (
    <ListGroup>
      {!context.localUsers ? (
        <Card.Text>Loading...</Card.Text>
      ) : context.localUsers.length <= 0 ? (
        <Card.Text>------</Card.Text>
      ) : (
        context.localUsers.map(({ username }) => (
          <LocalUserRow context={context} username={username} key={username} onLogin={onLogin} />
        ))
      )}
    </ListGroup>
  )
}

const LocalUserRow: React.FC<{ context: EdgeContext; username: string; onLogin: Function }> = ({
  context,
  username,
  onLogin,
}) => {
  const {
    pending: deleteAccountPending,
    deleteLocalAccount,
    error: deleteAccountError,
    reset: deleteAccountReset,
  } = useDeleteLocalAccount(context)
  const {
    loginWithPIN,
    pending: loginWithPinPending,
    error: loginWithPinError,
    account,
    reset: loginWithPinReset,
  } = useLoginWithPin(context)
  const [pin, setPin] = React.useState('')
  const pending = loginWithPinPending || deleteAccountPending

  React.useEffect(() => account && onLogin(account), [account, onLogin])
  const timeout = useTimeout()

  React.useEffect(() => {
    deleteAccountError && timeout(deleteAccountReset, 2500)
  }, [deleteAccountError, deleteAccountReset, timeout])

  return (
    <ListGroup.Item>
      <Form>
        <Form.Row>
          <FormLabel>{username} - PIN</FormLabel>
          <Col>
            <FormControl
              type={'password'}
              onChange={(event) => {
                loginWithPinReset()
                setPin(event.currentTarget.value)
              }}
            />
          </Col>

          <Col>
            <Button variant="primary" disabled={pending} onClick={() => loginWithPIN({ username, pin })}>
              {loginWithPinPending ? '...' : 'Login'}
            </Button>
            <Button variant="danger" disabled={pending} onClick={() => deleteLocalAccount({ username })}>
              {deleteAccountPending ? '...' : 'Remove Account'}
            </Button>
          </Col>

          {loginWithPinError && <Alert variant={'danger'}>{(loginWithPinError as Error).message}</Alert>}
          {deleteAccountError && <Alert variant={'danger'}>{(deleteAccountError as Error).message}</Alert>}
        </Form.Row>
      </Form>
      <LoginMessages context={context} username={username} />
    </ListGroup.Item>
  )
}

const LoginMessages: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  const { loginMessages, pending, status, error } = useLoginMessages(context)

  if (!loginMessages || pending) return null

  const { otpResetPending, recovery2Corrupt } = loginMessages[username]

  return (
    <ListGroup key={username}>
      {status === 'error' ? (
        <ListGroup.Item>{(error as Error).message}.</ListGroup.Item>
      ) : Object.keys(loginMessages[username]).length <= 0 ? (
        <ListGroup.Item>No messages</ListGroup.Item>
      ) : (
        <>
          <ListGroup.Item>otpResetPending: {otpResetPending.toString()}</ListGroup.Item>
          <ListGroup.Item>recovery2Corrupt: {recovery2Corrupt.toString()}</ListGroup.Item>
        </>
      )}
    </ListGroup>
  )
}
