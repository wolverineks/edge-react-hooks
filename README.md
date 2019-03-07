# Edge React Hooks

## Companion hooks for edge-core-js

### Installation

#### npm

`npm install --save edge-react-hooks`

#### yarn

`yarn add edge-react-hooks`

### Properties (`useEdgeContext`, `useEdgeAccount`, `useEdgeCurrencyWallet`)

These hooks enable you to use a mutable **Edge Object** (`EdgeContext | EdgeAccount | EdgeCurrencyWallet`) in a function component. By default they subscribe to each of the properties of the supplied **Edge Object** and cause the consuming component to re-render if any of the properties of the **Edge Object** change. For performance optimizations, you can pass as a second argument an array of properties to limit the subscriptions.

### Methods

You can think of `edge-react-hooks` like `useRenameWallet()` as mini redux stores with redux-thunk built in.

To use them, you can destructure the return value:

```js
const { renameWallet, pending, error } = useRenameWallet()
```

|       name       | type                             |
| :--------------: | :------------------------------- |
| `{named method}` | `(EdgeObject, ...args) => mixed` |
|      reset       | `() => mixed`                    |
|     pending      | `boolean`                        |
|      error       | `void | Error`                   |
|  `{named data}`  | `void | any`                     |

Calling the `{named method}` is like dispatching a thunk to the redux store, and results in multiple changes of the state with accompanying re-renders of the consuming component.

### Example

```js
// component will re-render automatically only if `wallet.name`, `pending`, or `error` changes
const WalletInfo = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  useEdgeCurrencyWallet(wallet, ['name']) // subscribe to `wallet.name`, omitting the array subscribes to all properties

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

```js
// component will re-render automatically if ANY wallet property changes, or if `pending`, or `error` changes
const WalletInfo = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const { renameWallet, pending, error } = useRenameWallet()

  return (
    <UseEdgeCurrencyWallet>{(wallet: EdgeCurrencyWallet) =>
      <div>
        <div>{wallet.name}</div>
        <button disable={pending} onClick={() => renameWallet('my other wallet')}>
          {pending ? '...' ? "Rename"}
        </button>
      </div>
    }</UseEdgeCurrencyWallet>
  )
}
```
