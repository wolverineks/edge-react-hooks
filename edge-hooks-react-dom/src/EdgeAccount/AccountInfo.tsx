import { EdgeAccount, EdgeContext } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { Disklet } from '../Disklet/Disklet'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo'
import { useSelectWallet, useSelectedWallet } from '../Providers/SelectedWalletProvider'
import { Settings } from '../Settings/Settings'
import { ActiveWalletList } from './ActiveWalletList'
import { ArchivedWalletList } from './ArchivedWalletList'
import { CreateWallet } from './CreateWallet'
import { DeletedWalletList } from './DeletedWalletList'

export const AccountInfo = ({ account, context }: { account: EdgeAccount; context: EdgeContext }) => {
  useEdgeAccount(account)

  const [tab, setTab] = React.useState('wallets')
  const selectedWallet = useSelectedWallet() || account.currencyWallets[account.activeWalletIds[0]]
  const selectWallet = useSelectWallet()

  React.useEffect(() => {
    const unsubs = Object.values(account.currencyConfig).map((currencyConfig) => {
      const { userSettings } = currencyConfig
      console.log({ currencyConfig: currencyConfig.currencyInfo.currencyCode, userSettings })

      return currencyConfig.watch('userSettings', (userSettings) => console.log({ userSettings }))
    })

    return () => unsubs.forEach((unsub) => unsub())
  }, [account.currencyConfig])

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
