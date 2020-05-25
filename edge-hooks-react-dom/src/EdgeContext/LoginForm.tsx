import { EdgeContext } from 'edge-core-js'
import { useLoginWithPassword } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Card, Form, FormGroup } from 'react-bootstrap'

const onChange = (cb: Function) => (event: any) => cb(event.currentTarget.value)

export const LoginForm: React.FC<{ context: EdgeContext; onLogin: Function }> = ({ context, onLogin }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { loginWithPassword, error, pending, account, reset } = useLoginWithPassword(context)

  const handleLogin = () => loginWithPassword({ username, password })
  React.useEffect(() => account && onLogin(account), [account, onLogin])

  return (
    <Form>
      <FormGroup>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type={'username'}
          disabled={pending}
          onChange={(event) => {
            reset()
            onChange(setUsername)(event)
          }}
        />
      </FormGroup>

      <FormGroup>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={'password'}
          disabled={pending}
          onChange={(event) => {
            reset()
            onChange(setPassword)(event)
          }}
        />
      </FormGroup>

      {error && <Alert variant={'danger'}>{(error as Error).message}</Alert>}

      <FormGroup>
        <Button variant="primary" disabled={pending} onClick={handleLogin}>
          {pending ? '...' : 'Login'}
        </Button>
      </FormGroup>
    </Form>
  )
}
