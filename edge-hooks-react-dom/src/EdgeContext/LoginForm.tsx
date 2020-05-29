import { EdgeContext } from 'edge-core-js'
import { useEdgeContext, useLoginWithPassword } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Form, FormGroup } from 'react-bootstrap'

import { useSetAccount } from '../EdgeAccount/useAccount'

export const LoginForm: React.FC<{ context: EdgeContext }> = ({ context }) => {
  useEdgeContext(context)
  const setAccount = useSetAccount()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { execute: loginWithPassword, error, status, reset } = useLoginWithPassword(context)
  const pending = status === 'loading'

  const handleChangeUsername = (event: { currentTarget: { value: React.SetStateAction<string> } }) => {
    reset()
    setUsername(event.currentTarget.value)
  }

  const handleChangePassword = (event: { currentTarget: { value: React.SetStateAction<string> } }) => {
    reset()
    setPassword(event.currentTarget.value)
  }

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    loginWithPassword({ username, password }).then(setAccount)
  }

  return (
    <Form>
      <FormGroup>
        <Form.Label>Username</Form.Label>
        <Form.Control type={'username'} disabled={pending} onChange={handleChangeUsername} />
      </FormGroup>

      <FormGroup>
        <Form.Label>Password</Form.Label>
        <Form.Control type={'password'} disabled={pending} onChange={handleChangePassword} />
      </FormGroup>

      {error && <Alert variant={'danger'}>{error.message}</Alert>}

      <FormGroup>
        <Button variant="primary" disabled={pending} onClick={handleLogin}>
          {pending ? '...' : 'Login'}
        </Button>
      </FormGroup>
    </Form>
  )
}
