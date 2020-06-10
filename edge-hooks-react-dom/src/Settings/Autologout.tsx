import { EdgeAccount } from 'edge-core-js'
import { useFile, useWrite } from 'edge-react-hooks'
import * as React from 'react'
import { Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap'

import { defaultSyncedSettings, useLoadAccountSetting } from '../Providers/SettingsProvider'

export const useWriteAutoLogoutDelay = (account: EdgeAccount) =>
  useWrite<number>(account.disklet, {
    path: `Settings/AutoLogoutDelay.json`,
    stringify: JSON.stringify,
  })

export const useReadAutoLogoutDelay = (account: EdgeAccount) => {
  const write = useWriteAutoLogoutDelay(account)
  const read = useFile<number>(account.disklet, {
    path: `Settings/AutoLogoutDelay.json`,
    parse: JSON.parse,
  })
  useLoadAccountSetting({ key: 'autoLogoutDelay', value: read.data })

  React.useEffect(() => {
    if (read.error) {
      write.execute({ data: defaultSyncedSettings.autoLogoutDelay }).then(() => read.execute())
    }
  }, [read, read.error, write])

  return read
}

export const useAutologoutDelay = (account: EdgeAccount) => ({
  read: useReadAutoLogoutDelay(account),
  write: useWriteAutoLogoutDelay(account),
})

export const AutoLogout = ({ account }: { account: EdgeAccount }) => {
  const { read, write } = useAutologoutDelay(account)

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <ListGroupItem>AutoLogout: Loading...</ListGroupItem>
  const pending = write.status === 'loading'

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroupItem>
        <Form>
          <FormGroup>
            <FormLabel>AutoLogout: {read.data}</FormLabel>
            <FormControl
              disabled={pending}
              onChange={(event) =>
                write.execute({ data: Number(event.currentTarget.value) }).then(() => read.execute())
              }
              defaultValue={read.data}
            />
          </FormGroup>
        </Form>
      </ListGroupItem>
    </ListGroup>
  )
}
