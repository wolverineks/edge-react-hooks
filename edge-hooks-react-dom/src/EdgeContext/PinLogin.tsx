import { EdgeContext } from 'edge-core-js'
import { useDeleteLocalAccount, useEdgeContext, useLoginMessages, useLoginWithPin } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Card, Col, Form, FormControl, FormLabel, ListGroup } from 'react-bootstrap'

import { useSetAccount } from '../Providers/AccountProvider'
import { useTimeout } from '../utils/utils'

export const PinLogin: React.FC<{ context: EdgeContext }> = ({ context }) => {
  useEdgeContext(context)
  const accountsWithPinLogin = context.localUsers.filter(({ pinLoginEnabled }) => pinLoginEnabled)

  return (
    <ListGroup>
      {accountsWithPinLogin.length <= 0 ? (
        <Card.Text>------</Card.Text>
      ) : (
        accountsWithPinLogin.map(({ username }) => (
          <LocalUserRow context={context} username={username} key={username} />
        ))
      )}
    </ListGroup>
  )
}

const LocalUserRow: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  useEdgeContext(context)

  const [pin, setPin] = React.useState('')

  const deleteLocalAccount = useDeleteLocalAccount(context)
  const loginWithPin = useLoginWithPin(context)
  const pending = loginWithPin.status === 'loading' || deleteLocalAccount.status === 'loading'
  const setAccount = useSetAccount()

  const timeout = useTimeout()
  React.useEffect(() => {
    deleteLocalAccount.error && timeout(deleteLocalAccount.reset, 2500)
  }, [deleteLocalAccount.error, deleteLocalAccount.reset, timeout])

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    loginWithPin.execute({ username, pin }).then(setAccount)
  }
  const handleDeleteLocalAccount = () => deleteLocalAccount.execute({ username })

  return (
    <ListGroup.Item>
      <Form>
        <Form.Row>
          <FormLabel>{username} - PIN</FormLabel>
          <Col>
            <FormControl
              onChange={(event) => {
                loginWithPin.reset()
                setPin(event.currentTarget.value)
              }}
            />
          </Col>

          <Col>
            <Button variant="primary" disabled={pending} onClick={handleLogin}>
              {loginWithPin.status === 'loading' ? '...' : 'Login'}
            </Button>
            <Button variant="danger" disabled={pending} onClick={handleDeleteLocalAccount}>
              {deleteLocalAccount.status === 'loading' ? '...' : 'Remove Account'}
            </Button>
          </Col>

          {loginWithPin.error && <Alert variant={'danger'}>{loginWithPin.error.message}</Alert>}
          {deleteLocalAccount.error && <Alert variant={'danger'}>{deleteLocalAccount.error.message}</Alert>}
        </Form.Row>
      </Form>
      <LoginMessages context={context} username={username} />
    </ListGroup.Item>
  )
}

const LoginMessages: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  const loginMessages = useLoginMessages(context, { username })

  return loginMessages.status === 'success' ? (
    <ListGroup key={username}>
      {Object.keys(loginMessages).length <= 0 ? (
        <ListGroup.Item>No messages</ListGroup.Item>
      ) : (
        <>
          <ListGroup.Item>otpResetPending: {loginMessages.data.otpResetPending.toString()}</ListGroup.Item>
          <ListGroup.Item>recovery2Corrupt: {loginMessages.data.recovery2Corrupt.toString()}</ListGroup.Item>
        </>
      )}
    </ListGroup>
  ) : loginMessages.status === 'error' ? (
    <ListGroup key={username}>
      <ListGroup.Item>{loginMessages.error.message}</ListGroup.Item>
    </ListGroup>
  ) : (
    <ListGroup key={username}>
      <ListGroup.Item>Loading...</ListGroup.Item>
    </ListGroup>
  )
}
