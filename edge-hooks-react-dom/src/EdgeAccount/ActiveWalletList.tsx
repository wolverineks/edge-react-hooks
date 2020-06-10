import { EdgeAccount, EdgeCurrencyWallet, EdgeMetaToken } from 'edge-core-js'
import {
  useChangeWalletState,
  useEdgeAccount,
  useEdgeCurrencyWallet,
  useEnabledTokens,
  useOnNewTransactions,
} from 'edge-react-hooks'
import * as React from 'react'
import { Button, Image, ListGroup } from 'react-bootstrap'

import { DisplayAmount } from '../Components/DisplayAmount'
import { FiatAmount } from '../Components/FiatAmount'
import { Logo } from '../Components/Logo'
import { useSelectedWallet } from '../Providers/SelectedWalletProvider'
import { getSortedCurrencyWallets } from '../utils/utils'

export const ActiveWalletList: React.FC<{ account: EdgeAccount; onSelect: (wallet: EdgeCurrencyWallet) => any }> = ({
  account,
  onSelect,
}) => {
  useEdgeAccount(account)
  const wallets = getSortedCurrencyWallets(account)

  return (
    <ListGroup variant={'flush'}>
      {wallets.map((wallet, index) =>
        wallet ? (
          <ActiveWalletRow account={account} wallet={wallet} key={wallet.id} onSelect={onSelect} />
        ) : (
          <ListGroup.Item key={index}>Loading...</ListGroup.Item>
        ),
      )}
    </ListGroup>
  )
}

const ActiveWalletRow: React.FC<{
  wallet: EdgeCurrencyWallet
  account: EdgeAccount
  onSelect: (wallet: EdgeCurrencyWallet) => any
}> = ({ account, wallet, onSelect }) => {
  useEdgeAccount(account)
  useEdgeCurrencyWallet(wallet)

  const selectedWallet = useSelectedWallet()
  const balance = wallet.balances[wallet.currencyInfo.currencyCode]

  useOnNewTransactions(wallet, (transactions) =>
    alert(`${wallet.name} - ${transactions.length > 1 ? 'New Transactions' : 'New Transaction'}`),
  )

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroup.Item variant={selectedWallet && wallet.id === selectedWallet.id ? 'primary' : undefined}>
        <span onClick={() => onSelect(wallet)} className={'float-left'}>
          <Logo account={account} walletType={wallet.type} /> {wallet.name}{' '}
          <DisplayAmount nativeAmount={balance} currencyInfo={wallet.currencyInfo} /> -{' '}
          <FiatAmount
            account={account}
            currencyInfo={wallet.currencyInfo}
            toCurrencyCode={wallet.fiatCurrencyCode}
            nativeAmount={balance}
          />
        </span>

        <span className={'float-right'}>
          <WalletButtons account={account} wallet={wallet} />
        </span>
      </ListGroup.Item>

      <EnabledTokensList account={account} wallet={wallet} />
    </ListGroup>
  )
}

const WalletButtons = ({ account, wallet }: { account: EdgeAccount; wallet: EdgeCurrencyWallet }) => {
  const { execute: changeWalletState, status } = useChangeWalletState(account)
  const pending = status === 'loading'
  const archiveWallet = () => changeWalletState({ walletId: wallet.id, walletState: { archived: true } })
  const deleteWallet = () => changeWalletState({ walletId: wallet.id, walletState: { deleted: true } })

  return (
    <>
      <Button variant={'danger'} disabled={pending} onClick={deleteWallet}>
        Delete
      </Button>
      <Button variant={'warning'} disabled={pending} onClick={archiveWallet}>
        Archive
      </Button>
    </>
  )
}

export const EnabledTokensList: React.FC<{
  account: EdgeAccount
  wallet: EdgeCurrencyWallet
}> = ({ account, wallet }) => {
  useEdgeAccount(account)
  useEdgeCurrencyWallet(wallet)

  const enabledTokens = useEnabledTokens(wallet)
  if (enabledTokens.error) return <div>Error {enabledTokens.error.message}</div>
  if (enabledTokens.status === 'loading' || !enabledTokens.data) return <div>Loading...</div>

  const tokenInfos = wallet.currencyInfo.metaTokens.filter((tokenInfo) =>
    enabledTokens.data.includes(tokenInfo.currencyCode),
  )

  return enabledTokens.data.length > 0 ? (
    <ListGroup.Item>
      <ListGroup variant={'flush'}>
        {tokenInfos.map((tokenInfo) => (
          <EnabledTokenRow account={account} wallet={wallet} key={tokenInfo.currencyCode} tokenInfo={tokenInfo} />
        ))}
      </ListGroup>
    </ListGroup.Item>
  ) : null
}

const EnabledTokenRow: React.FC<{
  account: EdgeAccount
  wallet: EdgeCurrencyWallet
  tokenInfo: EdgeMetaToken
}> = ({ account, wallet, tokenInfo }) => {
  useEdgeAccount(account)
  useEdgeCurrencyWallet(wallet)

  const { symbolImage } = tokenInfo
  const balance = wallet.balances[tokenInfo.currencyCode]

  return (
    <ListGroup.Item>
      <span className={'float-left'}>
        <Image src={symbolImage} />
        <DisplayAmount nativeAmount={balance} currencyInfo={tokenInfo} /> -{' '}
        <FiatAmount
          account={account}
          currencyInfo={tokenInfo}
          toCurrencyCode={wallet.fiatCurrencyCode}
          nativeAmount={balance}
        />
      </span>
    </ListGroup.Item>
  )
}
