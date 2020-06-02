import { EdgeAccount, EdgeCurrencyWallet, EdgeDenomination, EdgeMetaToken } from 'edge-core-js'
import {
  useChangeWalletState,
  useConvertCurrency,
  useEdgeAccount,
  useEdgeCurrencyWallet,
  useEnabledTokens,
  useOnNewTransactions,
} from 'edge-react-hooks'
import * as React from 'react'
import { Button, Image, ListGroup } from 'react-bootstrap'

import { Logo } from '../Components/Logo'
import { useSelectedWallet } from '../Providers/SelectedWalletProvider'
import { getFiatInfo, getSortedCurrencyWallets, nativeToDenomination, useCurrencySetting } from '../utils'

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

const ActiveWalletRow: React.FC<{ wallet: EdgeCurrencyWallet; account: EdgeAccount; onSelect: Function }> = ({
  account,
  wallet,
  onSelect,
}) => {
  useEdgeAccount(account)
  useEdgeCurrencyWallet(wallet)

  const selectedWallet = useSelectedWallet()
  const balance = React.useMemo(() => String(Math.random() * 1000000000), []) // wallet.balances[currencyCode]

  useOnNewTransactions(wallet, (transactions) =>
    alert(`${wallet.name} - ${transactions.length > 1 ? 'New Transactions' : 'New Transaction'}`),
  )

  return (
    <ListGroup>
      <ListGroup.Item variant={selectedWallet && wallet.id === selectedWallet.id ? 'primary' : undefined}>
        <span onClick={() => onSelect(wallet)} className={'float-left'}>
          <Logo account={account} walletType={wallet.type} />
          <DisplayAmount account={account} nativeAmount={balance} currencyInfo={wallet.currencyInfo} /> -{' '}
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

  return (
    <ListGroup variant={'flush'}>
      {tokenInfos.map((tokenInfo) => (
        <EnabledTokenRow account={account} wallet={wallet} key={tokenInfo.currencyCode} tokenInfo={tokenInfo} />
      ))}
    </ListGroup>
  )
}

const EnabledTokenRow: React.FC<{
  account: EdgeAccount
  wallet: EdgeCurrencyWallet
  tokenInfo: EdgeMetaToken
}> = ({ account, wallet, tokenInfo }) => {
  useEdgeAccount(account)
  useEdgeCurrencyWallet(wallet)

  const { symbolImage } = tokenInfo
  const balance = React.useMemo(() => String(Math.random() * 10000000000000000000), []) // wallet.balances[currencyCode]

  return (
    <ListGroup.Item>
      <span className={'float-left'}>
        <Image src={symbolImage} />
        <DisplayAmount account={account} nativeAmount={balance} currencyInfo={tokenInfo} /> -{' '}
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

export const DisplayAmount = ({
  account,
  nativeAmount,
  currencyInfo,
}: {
  account: EdgeAccount
  nativeAmount: string
  currencyInfo: { currencyCode: string; denominations: EdgeDenomination[] }
}) => {
  const { read } = useCurrencySetting(account, { currencyCode: currencyInfo.currencyCode })

  if (read.error) return <div>Error {read.error.message}</div>
  if (!read.data) return <div>Loading...</div>

  const denomination =
    currencyInfo.denominations.find(
      (denomination) => denomination.multiplier === read.data.displayDenominationMultiplier,
    ) || currencyInfo.denominations[0]

  return (
    <>
      {denomination.symbol} {nativeToDenomination({ denomination, nativeAmount })} {denomination.name}
    </>
  )
}

export const FiatAmount = ({
  account,
  currencyInfo,
  toCurrencyCode,
  nativeAmount: _nativeAmount,
}: {
  account: EdgeAccount
  currencyInfo: { currencyCode: string; denominations: EdgeDenomination[] }
  toCurrencyCode: string
  nativeAmount: string
}) => {
  // const exchangeDenomination = currencyInfo.denominations[0]
  const { data: fiatAmount } = useConvertCurrency(account.rateCache, {
    fromCurrency: currencyInfo.currencyCode,
    toCurrency: toCurrencyCode,
    amount: 1, // exchangeAmount
  })
  const fiatInfo = getFiatInfo({ currencyCode: toCurrencyCode })

  if (!fiatAmount) return <>Loading...</>

  return (
    <>
      {fiatInfo?.symbol} {fiatAmount.toFixed(2)} {fiatInfo?.currencyCode}
    </>
  )
}
