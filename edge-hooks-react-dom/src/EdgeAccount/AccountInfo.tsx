import { EdgeAccount } from 'edge-core-js'
import { useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { Disklet } from '../Disklet/Disklet'
import { useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo'
import { ActiveWalletList } from './ActiveWalletList'
import { ArchivedWalletList } from './ArchivedWalletList'
import { CreateWallet } from './CreateWallet'
import { DeletedWalletList } from './DeletedWalletList'

export const AccountInfo = ({ account }: { account: EdgeAccount }) => {
  const selectedWallet = useSelectedWallet() || account.currencyWallets[account.activeWalletIds[0]]
  const [key, setKey] = React.useState('wallets')
  useWatch(account, 'username')
  useWatch(account, 'activeWalletIds')
  useWatch(selectedWallet, 'name')
  React.useEffect(() => {
    document.title = `${account.username}: ${selectedWallet.name || ''}`
  }, [account.username, selectedWallet.name])

  return (
    <Tabs id={'accountTabs'} defaultActiveKey={'wallets'} activeKey={key} onSelect={setKey} transition={false}>
      <Tab eventKey={'wallets'} title={'Wallets'}>
        <Tabs variant={'pills'} id={'walletLists'} defaultActiveKey={'active'} transition={false}>
          <Tab eventKey={'active'} title={'Active'}>
            <ActiveWalletList account={account} onSelect={() => setKey('wallet')} />
          </Tab>
          <Tab eventKey={'archived'} title={'Archived'}>
            <ArchivedWalletList account={account} />
          </Tab>
          <Tab eventKey={'deleted'} title={'Deleted'}>
            <DeletedWalletList account={account} />
          </Tab>
          <Tab eventKey={'storage'} title={'Storage'}>
            <Disklet disklet={account.disklet} path={'/'} title={'Disklet'} />
            <Disklet disklet={account.localDisklet} path={'/'} title={'Local Disklet'} />
          </Tab>
        </Tabs>
      </Tab>

      <Tab eventKey={'newWallet'} title={'New Wallet'}>
        <CreateWallet account={account} key={account.activeWalletIds.length} />
      </Tab>

      <Tab eventKey={'wallet'} title={'Wallet'}>
        <WalletInfo key={selectedWallet.id} account={account} wallet={selectedWallet} />
      </Tab>
    </Tabs>
  )
}
