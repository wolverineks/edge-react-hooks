# Edge React Hooks

## Companion hooks for edge-core-js

### Installation

#### npm

`npm install --save edge-react-hooks`

#### yarn

`yarn add edge-react-hooks`

### Properties (`useWatch`)

These hooks enable you to use a mutable **Edge Object** (`EdgeContext | EdgeAccount | EdgeCurrencyWallet`) in a function component. They subscribe to the property of the supplied **Edge Object** and cause the consuming component to re-render if the property of the **Edge Object** changes.

### Async Properties (e.g. 'useLocalUsers')

An async property is data that is available through an async function, but which is automatically loaded.

```typescript
const { loginMessages, pending, error } = useLoginMessages(context)
```

### Async Methods

You can think of async method hooks like `useRenameWallet()` as mini redux stores with redux-thunk built in.

To use them, you can destructure the return value:

```typescript
const { renameWallet, pending, error } = useRenameWallet(account, walletName)
```

|       name       | type                      |
| :--------------: | :------------------------ |
| `{named method}` | `() => void`              |
|     pending      | `boolean`                 |
|      error       | `Error | undefined`       |
|  `{named data}`  | `typeof data | undefined` |

Calling the `{named method}` is like dispatching a thunk to the redux store, and results in multiple changes of the state with accompanying re-renders of the consuming component.

### Example

```typescript
// component will re-render automatically only if `wallet.name`, `pending`, or `error` changes
const WalletInfo = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  useWatch(wallet, 'name') // re-render when `wallet.name` changes
  const { enabledTokens, pending, error } = useEnabledTokens(wallet) // async property
  const { renameWallet, pending, error } = useRenameWallet(wallet) // async method

  return (
    <div>
      <div>{wallet.name}</div>
      <button disable={pending} onClick={() => renameWallet(  'my other wallet')}>
        {pending ? '...' ? "Rename"}
      </button>

      <div>
      {enabledTokens.map(token => (
        <div>{token}</div>
      ))}
      </div>
    </div>
  )
}
```
