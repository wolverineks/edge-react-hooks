import { EdgeAccount, EdgeContext } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { Disklet } from '../Disklet/Disklet'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo'
import { useSelectWallet, useSelectedWallet } from '../Providers/SelectedWalletProvider'
import { Settings } from '../Settings/Settings'
import { useAccountBalance } from '../utils/hooks'
import { ActiveWalletList } from './ActiveWalletList'
import { ArchivedWalletList } from './ArchivedWalletList'
import { CreateWallet } from './CreateWallet'
import { DeletedWalletList } from './DeletedWalletList'

export const AccountInfo = ({ account, context }: { account: EdgeAccount; context: EdgeContext }) => {
  useEdgeAccount(account)

  const [tab, setTab] = React.useState('wallets')
  const selectedWallet = useSelectedWallet() || account.currencyWallets[account.activeWalletIds[0]]
  const selectWallet = useSelectWallet()
  const balance = useAccountBalance(account)

  return (
    <Tabs
      id={'accountTabs'}
      defaultActiveKey={'wallets'}
      activeKey={tab}
      onSelect={(tab: any) => setTab(tab || 'wallets')}
      transition={false}
    >
      <Tab eventKey={'wallets'} title={'Wallets'}>
        <Tabs variant={'pills'} id={'walletLists'} defaultActiveKey={'active'} transition={false}>
          <Tab eventKey={'active'} title={'Active'}>
            <div>ACCOUNT BALANCE: {balance}</div>
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
          <Tab eventKey={'create'} title={'Create'}>
            <CreateWallet account={account} key={account.activeWalletIds.length} />
          </Tab>
        </Tabs>
      </Tab>

      <Tab eventKey={'wallet'} title={'Wallet'}>
        {selectedWallet && <WalletInfo key={selectedWallet.id} wallet={selectedWallet} account={account} />}
      </Tab>

      <Tab eventKey={'storage'} title={'Storage'}>
        <Disklet disklet={account.disklet} path={'/'} title={'Disklet'} />
        <Disklet disklet={account.localDisklet} path={'/'} title={'Local Disklet'} />
      </Tab>

      <Tab eventKey={'settings'} title={'Settings'}>
        <Settings account={account} context={context} />
      </Tab>
    </Tabs>
  )
}
