import { EdgeAccount, EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { ListGroup } from 'react-bootstrap'

import { AutoLogout } from './Autologout'
import { Currencies } from './Currencies'
import { DefaultFiat } from './DefaultFiat'
import { PinLogin } from './PinLogin'

export const Settings = ({ account, context }: { account: EdgeAccount; context: EdgeContext }) => {
  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <AutoLogout account={account} />
      <DefaultFiat account={account} />
      <PinLogin context={context} account={account} />
      <Currencies account={account} />
    </ListGroup>
  )
}
