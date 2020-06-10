import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Image } from 'react-bootstrap'

import { getLogo } from '../utils/utils'

export const Logo: React.FC<{ walletType: string; account: EdgeAccount }> = ({ walletType, account }) => {
  const logo = getLogo(account, { walletType })

  return <Image src={logo} />
}
