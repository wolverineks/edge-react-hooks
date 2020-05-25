import { EdgeContext } from 'edge-core-js'
import { useDeleteLocalAccount, useLoginMessages, useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Card, ListGroup } from 'react-bootstrap'

import { useTimeout } from '../utils'

export const LocalUsers: React.FC<{ context: EdgeContext }> = ({ context }) => {
  useWatch(context, 'localUsers')

  return (
    <Card>
      <Card.Header>
        <Card.Title>Previously Logged-In Accounts</Card.Title>
      </Card.Header>

      <ListGroup>
        {!context.localUsers ? (
          <Card.Text>Loading...</Card.Text>
        ) : context.localUsers.length <= 0 ? (
          <Card.Text>------</Card.Text>
        ) : (
          context.localUsers.map(({ username }) => (
            <LocalUserRow context={context} username={username} key={username} />
          ))
        )}
      </ListGroup>
    </Card>
  )
}

const LocalUserRow: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  const { pending, deleteLocalAccount, error, reset } = useDeleteLocalAccount(context)
  const timeout = useTimeout()

  React.useEffect(() => {
    error && timeout(reset, 2500)
  }, [error, reset, timeout])

  return (
    <ListGroup.Item key={username}>
      {username} -{' '}
      <Button variant="danger" disabled={pending} onClick={() => deleteLocalAccount({ username })}>
        {pending ? '...' : 'X'}
      </Button>
      <LoginMessages context={context} username={username} />
      {error && <Alert variant={'danger'}>{(error as Error).message}</Alert>}
    </ListGroup.Item>
  )
}

const LoginMessages: React.FC<{ context: EdgeContext; username: string }> = ({ context, username }) => {
  const { loginMessages, pending, status, error } = useLoginMessages(context)

  if (!loginMessages) return null

  const { otpResetPending, recovery2Corrupt } = loginMessages[username]

  return (
    <ListGroup key={username}>
      {status === 'error' ? (
        <ListGroup.Item>{(error as Error).message}.</ListGroup.Item>
      ) : pending ? (
        <ListGroup.Item>Loading...</ListGroup.Item>
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
