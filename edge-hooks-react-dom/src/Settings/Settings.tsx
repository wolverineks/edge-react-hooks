import { EdgeAccount, EdgeContext, EdgeCurrencyInfo, EdgeDenomination } from 'edge-core-js'
import { useChangePin, useEdgeAccount, useFile, usePinLoginEnabled } from 'edge-react-hooks'
import * as React from 'react'
import { Form, FormGroup, Image, ListGroup, ListGroupItem } from 'react-bootstrap'

import { getCurrencyInfos } from '../utils'

export const Settings = ({ account, context }: { account: EdgeAccount; context: EdgeContext }) => {
  useEdgeAccount(account)
  const pinLoginEnabled = usePinLoginEnabled(context, { username: account.username })
  const changePin = useChangePin(account)
  const { data: settings, status, error } = useFile<Settings>(account.disklet, {
    path: '/Settings.json',
    parse: JSON.parse,
  })
  const currencyInfos = getCurrencyInfos(account)

  if (status === 'loading' || status === 'idle' || !settings) return <div>Loading...</div>
  if (status === 'error' && error) return <div>{error.message}</div>

  return (
    <ListGroup>
      <ListGroupItem>Auto Logout: {settings.autoLogoutTimeInSeconds}</ListGroupItem>
      <ListGroupItem>Country Code: {settings.countryCode}</ListGroupItem>
      <ListGroupItem>Custom Tokens: {String(settings.customTokens)}</ListGroupItem>
      <ListGroupItem>Default Fiat: {settings.defaultFiat}</ListGroupItem>
      <ListGroupItem>Merchant Mode: {settings.merchantMode}</ListGroupItem>
      <ListGroupItem>Perferred Swap Plugin ID: {settings.preferredSwapPluginId}</ListGroupItem>
      <ListGroupItem>
        Pin Login: {String(pinLoginEnabled.data)}{' '}
        <Form>
          <FormGroup>
            <Form.Check
              type={'switch'}
              checked={pinLoginEnabled.data as any}
              label={'Pin Login Enabled'}
              id={'pinLoginEnabled'}
              disabled={changePin.status === 'loading'}
              onChange={() =>
                changePin
                  .execute({ options: { enableLogin: !pinLoginEnabled.data } as any })
                  .then(() => pinLoginEnabled.execute())
              }
            />
          </FormGroup>
        </Form>
      </ListGroupItem>
      <ListGroup>
        {currencyInfos.map((currencyInfo) =>
          (settings as any)[currencyInfo.currencyCode] ? (
            <CurrencySetting
              key={currencyInfo.currencyCode}
              currencyInfo={currencyInfo}
              settings={(settings as any)[currencyInfo.currencyCode] as CurrencySetting}
            />
          ) : null,
        )}
      </ListGroup>
    </ListGroup>
  )
}

const CurrencySetting: React.FC<{ settings: CurrencySetting; currencyInfo: EdgeCurrencyInfo }> = ({
  settings,
  currencyInfo: { currencyCode, displayName, denominations, symbolImage },
}) => {
  return (
    <ListGroupItem>
      {currencyCode}:
      <ListGroup>
        <ListGroupItem>
          <Image src={symbolImage} />
        </ListGroupItem>
        <ListGroupItem>Name: {displayName}</ListGroupItem>
        <ListGroupItem>Denomination: {settings.denomination}</ListGroupItem>
        <ListGroupItem>
          Denominations:
          <ListGroup>
            {denominations.map((denomination) => (
              <Denomination key={denomination.name} denomination={denomination} />
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
  )
}

const Denomination: React.FC<{ denomination: EdgeDenomination }> = ({ denomination: { name, multiplier, symbol } }) => {
  return (
    <ListGroupItem>
      denomination: {name}, {multiplier}, {symbol}
    </ListGroupItem>
  )
}

type CurrencySetting = {
  denomination: string
}

interface PasswordRecoveryReminderSettings {
  '20': boolean
  '200': boolean
  '2000': boolean
  '20000': boolean
  '200000': boolean
}

interface Settings {
  autoLogoutTimeInSeconds: number
  defaultFiat: string
  defaultIsoFiat: string
  merchantMode: boolean
  preferredSwapPluginId: string
  countryCode: string
  customTokens: []
  mostRecentWallets: []
  passwordRecoveryRemindersShown: PasswordRecoveryReminderSettings

  // Chains
  BCH: CurrencySetting
  BNB: CurrencySetting
  BTC: CurrencySetting
  DASH: CurrencySetting
  DGB: CurrencySetting
  DOGE: CurrencySetting
  EOS: CurrencySetting
  ETH: CurrencySetting
  FTC: CurrencySetting
  LTC: CurrencySetting
  QTUM: CurrencySetting
  RBTC: CurrencySetting
  RVN: CurrencySetting
  SMART: CurrencySetting
  UFO: CurrencySetting
  VTC: CurrencySetting
  XLM: CurrencySetting
  XMR: CurrencySetting
  XRP: CurrencySetting
  XTZ: CurrencySetting
  XZC: CurrencySetting

  // Tokens?
  AGLD: CurrencySetting
  ANT: CurrencySetting
  BAT: CurrencySetting
  BNT: CurrencySetting
  BRZ: CurrencySetting
  CBAT: CurrencySetting
  CDAI: CurrencySetting
  CETH: CurrencySetting
  CREP: CurrencySetting
  CSAI: CurrencySetting
  CUSDC: CurrencySetting
  CWBTC: CurrencySetting
  CZRX: CurrencySetting
  DAI: CurrencySetting
  ETHBNT: CurrencySetting
  FUN: CurrencySetting
  GNO: CurrencySetting
  GNT: CurrencySetting
  GUSD: CurrencySetting
  HERC: CurrencySetting
  HUR: CurrencySetting
  IND: CurrencySetting
  KIN: CurrencySetting
  KNC: CurrencySetting
  LINK: CurrencySetting
  MANA: CurrencySetting
  MET: CurrencySetting
  MKR: CurrencySetting
  NEXO: CurrencySetting
  NMR: CurrencySetting
  OMG: CurrencySetting
  OXT: CurrencySetting
  PAX: CurrencySetting
  POLY: CurrencySetting
  REP: CurrencySetting
  RIF: CurrencySetting
  SAI: CurrencySetting
  SALT: CurrencySetting
  STORJ: CurrencySetting
  TUSD: CurrencySetting
  USDC: CurrencySetting
  USDS: CurrencySetting
  USDT: CurrencySetting
  WINGS: CurrencySetting
  ZRX: CurrencySetting
}
