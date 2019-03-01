# Edge React Hooks

## Companion hooks for edge-core-js

### Installation

#### npm

`npm install --save edge-react-hooks`

#### yarn

`yarn add edge-react-hooks`

### Example

```js
// component will re-render automatically if `wallet.name`, `pending`, or `error` changes
const WalletInfo = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  useEdgeCurrencyWallet(wallet, ['name']) // subscribe to `wallet.name`

  const { renameWallet, pending, error } = useRenameWallet()

  return (
    <div>
      <div>{wallet.name}</div>
      <button disable={pending} onClick={() => renameWallet('my other wallet')}>
        {pending ? '...' ? "Rename"}
      </button>
    </div>
  )
}
```
