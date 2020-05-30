import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Image } from 'react-bootstrap'

import { getLogo, getLogoDark } from '../utils'

export const Logo: React.FC<{ walletType: string; account: EdgeAccount; dark?: boolean }> = ({
  walletType,
  account,
  dark,
}) => {
  const logo = dark ? getLogoDark(account, { walletType }) : getLogo(account, { walletType })

  return <Image src={logo} />
}
