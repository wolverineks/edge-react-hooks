import { EdgeAccount, EdgeContext } from 'edge-core-js'
import { useCreateAccount } from 'edge-react-hooks'
import React from 'react'
import { Alert, Button, Card, Form, FormGroup } from 'react-bootstrap'

const onChange = (cb: Function) => (event: any) => cb(event.currentTarget.value)

export const CreateAccountForm: React.FC<{
  context: EdgeContext
  onCreate: (account: EdgeAccount) => any
}> = ({ context, onCreate }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pin, setPin] = React.useState('')
  const [options] = React.useState({ otp: '' })

  const { createAccount, pending, account, error } = useCreateAccount(context)

  const handleCreate = () => createAccount({ username, password, pin, options })

  React.useEffect(() => {
    account && onCreate(account as EdgeAccount)
  }, [account, onCreate])

  return (
    <Form>
      <FormGroup>
        <Form.Label>Username</Form.Label>
        <Form.Control required disabled={pending} type={'username'} onChange={onChange(setUsername)} />
      </FormGroup>

      <FormGroup>
        <Form.Label>Password</Form.Label>
        <Form.Control required disabled={pending} type={'password'} onChange={onChange(setPassword)} />
      </FormGroup>

      <FormGroup>
        <Form.Label>Pin</Form.Label>
        <Form.Control required disabled={pending} type={'number'} onChange={onChange(setPin)} />
      </FormGroup>

      {error && <Alert variant={'danger'}>{(error as Error).message.toString()}</Alert>}
      <FormGroup>
        <Button variant={'primary'} disabled={pending} onClick={handleCreate}>
          {pending ? 'Creating account...' : 'Create'}
        </Button>
      </FormGroup>
    </Form>
  )
}
