import { EdgeAccount } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { Disklet } from '../Disklet/Disklet'
import { useSelectWallet, useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo'
import { ActiveWalletList } from './ActiveWalletList'
import { ArchivedWalletList } from './ArchivedWalletList'
import { CreateWallet } from './CreateWallet'
import { DeletedWalletList } from './DeletedWalletList'

export const AccountInfo = ({ account }: { account: EdgeAccount }) => {
  useEdgeAccount(account)

  const [tab, setTab] = React.useState('wallets')
  const selectedWallet = useSelectedWallet() || account.currencyWallets[account.activeWalletIds[0]]
  const selectWallet = useSelectWallet()

  return (
    <Tabs id={'accountTabs'} defaultActiveKey={'wallets'} activeKey={tab} onSelect={setTab} transition={false}>
      <Tab eventKey={'wallets'} title={'Wallets'}>
        <Tabs variant={'pills'} id={'walletLists'} defaultActiveKey={'active'} transition={false}>
          <Tab eventKey={'active'} title={'Active'}>
            <ActiveWalletList
              account={account}
              onSelect={(wallet) => {
                selectWallet(wallet)
                setTab('wallet')
              }}
            />
          </Tab>
          <Tab eventKey={'archived'} title={'Archived'}>
            <ArchivedWalletList account={account} />
          </Tab>
          <Tab eventKey={'deleted'} title={'Deleted'}>
            <DeletedWalletList account={account} />
          </Tab>
        </Tabs>
      </Tab>

      <Tab eventKey={'newWallet'} title={'New Wallet'}>
        <CreateWallet account={account} key={account.activeWalletIds.length} />
      </Tab>

      <Tab eventKey={'wallet'} title={'Wallet'}>
        {selectedWallet && <WalletInfo key={selectedWallet.id} wallet={selectedWallet} />}
      </Tab>

      <Tab eventKey={'storage'} title={'Storage'}>
        <Disklet disklet={account.disklet} path={'/'} title={'Disklet'} />
        <Disklet disklet={account.localDisklet} path={'/'} title={'Local Disklet'} />
      </Tab>
    </Tabs>
  )
}
