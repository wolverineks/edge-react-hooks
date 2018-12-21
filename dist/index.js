'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('edge-core-js');
var react = require('react');

// 


const useActiveWalletIds = (account) => {
  const [activeWalletIds, setActiveWalletIds] = react.useState<State>(account ? account.archivedWalletIds : null);

  const effect = () => {
    if (!account) return // mount with null
    setActiveWalletIds(account.activeWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('activeWalletIds', setActiveWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return activeWalletIds
};

// 


const useArchivedWalletIds = (account) => {
  const [archivedWalletIds, setArchivedWalletIds] = react.useState<State>(account ? account.activeWalletIds : null);

  const effect = () => {
    if (!account) return // mount with null
    setArchivedWalletIds(account.archivedWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('archivedWalletIds', setArchivedWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return archivedWalletIds
};

// 


const useBalances = (wallet) => {
  const [balances, setBalances] = react.useState<State>(wallet ? wallet.balances : null);

  const effect = () => {
    if (!wallet) return // mount with null
    setBalances(wallet.balances);
    const unsubscribe = wallet.watch('balances', setBalances); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return balances
};

// 


const useBlockHeight = (wallet) => {
  const [blockHeight, setBlockHeight] = react.useState<State>(wallet ? wallet.blockHeight : null);

  const effect = () => {
    if (!wallet) return // mount with null
    setBlockHeight(wallet.blockHeight);
    const unsubscribe = wallet.watch('blockHeight', setBlockHeight); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return blockHeight
};

// 



const initialState = {
  dataDump: null,
  error: null,
  pending: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'READ_DATA_DUMP_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_DATA_DUMP_SUCCESS': {
      return { ...state, pending: false, dataDump: action.dataDump }
    }

    case 'READ_DATA_DUMP_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
};

const useDataDump = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer, initialState);

  const getDataDump = () => {
    if (!wallet) return
    dispatch({ type: 'READ_DATA_DUMP_START' });
    wallet
      .dumpData()
      .then((dataDump) => dispatch({ type: 'READ_DATA_DUMP_SUCCESS', dataDump }))
      .catch((error) => dispatch({ type: 'READ_DATA_DUMP_ERROR', error }));
  };

  return { ...state, getDataDump }
};

// 


const useDeletedWalletIds = (account) => {
  const [deletedWalletIds, setDeletedWalletIds] = react.useState<State>(account ? getDeletedWalletIds(account.allKeys) : null);

  const effect = () => {
    if (!account) return // mount with null
    setDeletedWalletIds(getDeletedWalletIds(account.allKeys)); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('allKeys', allKeys => setDeletedWalletIds(getDeletedWalletIds(allKeys))); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return deletedWalletIds
};

const getDeletedWalletIds = (walletInfos) => {
  const deletedWalletInfos = walletInfos.filter(key => key.deleted);
  const deletedWalletIds = deletedWalletInfos.map((key) => key.id);

  return deletedWalletIds
};

// 







const initialState$1 = {
  addCustomTokenError: null,
  addCustomTokenPending: false,

  disableTokensError: null,
  disableTokensPending: false,

  enableTokensError: null,
  enableTokensPending: false,

  enabledTokens: null,

  readEnabledTokensError: null,
  readEnabledTokensPending: false
};

const reducer$1 = (state, action) => {
  switch (action.type) {
    case 'READ_ENABLED_TOKENS_START': {
      return { ...state, readEnabledTokensPending: true, readEnabledTokensError: null }
    }
    case 'ENABLE_TOKENS_START': {
      return { ...state, enableTokensPending: true, enableTokensError: null }
    }
    case 'DISABLE_TOKENS_START': {
      return { ...state, disableTokensPending: true, disableTokensError: null }
    }
    case 'ADD_CUSTOM_TOKEN_START': {
      return { ...state, addCustomTokenPending: true, addCustomTokenError: null }
    }

    case 'READ_ENABLED_TOKENS_SUCCESS': {
      return { ...state, readEnabledTokensPending: false, enabledTokens: action.enabledTokens }
    }
    case 'ENABLE_TOKENS_SUCCESS': {
      return { ...state, enableTokensPending: false }
    }
    case 'DISABLE_TOKENS_SUCCESS': {
      return { ...state, disableTokensPending: false }
    }
    case 'ADD_CUSTOM_TOKEN_SUCCESS': {
      return { ...state, addCustomTokenPending: false }
    }

    case 'READ_ENABLED_TOKENS_ERROR': {
      return { ...state, readEnabledTokensPending: false, readEnabledtokensError: action.error }
    }
    case 'ENABLE_TOKENS_ERROR': {
      return { ...state, enableTokensPending: false, enableTokenError: action.error }
    }
    case 'DISABLE_TOKENS_ERROR': {
      return { ...state, disableTokensPending: false, disableTokenError: action.error }
    }
    case 'ADD_CUSTOM_TOKEN_ERROR': {
      return { ...state, addCustomTokenPending: false, addCustomTokenError: action.error }
    }

    default:
      return state
  }
};

const useEnabledTokens = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$1, initialState$1);

  const enableTokens = (tokens) => {
    if (!wallet) return
    dispatch({ type: 'ENABLE_TOKENS_START' });
    wallet
      .enableTokens(tokens)
      .then(() => dispatch({ type: 'ENABLE_TOKENS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ENABLE_TOKENS_ERROR', error }));
  };

  const disableTokens = (tokens) => {
    if (!wallet) return
    dispatch({ type: 'DISABLE_TOKENS_START' });
    wallet
      .disableTokens(tokens)
      .then(() => dispatch({ type: 'DISABLE_TOKENS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DISABLE_TOKENS_ERROR', error }));
  };

  const addCustomToken = (tokenInfo) => {
    if (!wallet) return
    dispatch({ type: 'ADD_CUSTOM_TOKEN_START' });
    wallet
      .addCustomToken(tokenInfo)
      .then(() => dispatch({ type: 'ADD_CUSTOM_TOKEN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ADD_CUSTOM_TOKEN_ERROR', error }));
  };

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_ENABLED_TOKENS_START' });
    wallet
      .getEnabledTokens()
      .then((enabledTokens) => dispatch({ type: 'READ_ENABLED_TOKENS_SUCCESS', enabledTokens }))
      .catch((error) => dispatch({ type: 'READ_ENABLED_TOKENS_ERROR', error }));
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state, enableTokens, disableTokens, addCustomToken }
};

// 



const initialState$2 = {
  fiatCurrencyCode: null,
  pending: false,
  error: null
};

const reducer$2 = (state, action) => {
  switch (action.type) {
    case 'WRITE_FIAT_CURRENCY_CODE_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_FIAT_CURRENCY_CODE_SUCCESS':
    case 'WRITE_FIAT_CURRENCY_CODE_SUCCESS': {
      return { ...state, pending: false, fiatCurrencyCode: action.fiatCurrencyCode }
    }

    case 'WRITE_FIAT_CURRENCY_CODE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
};

const useFiatCurrencyCode = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$2, initialState$2);

  const setFiatCurrencyCode = (fiatCurrencyCode) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' });
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(() => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode }))
      .catch((error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error }));
  };

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode: wallet.fiatCurrencyCode });
    const unsubscribe = wallet.watch(
      'fiatCurrencyCode',
      (fiatCurrencyCode) =>
        dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode })
    ); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state, setFiatCurrencyCode }
};

// 




const initialState$3 = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer$3 = (state, action) => {
  switch (action.type) {
    case 'READ_START': {
      return { ...state, readPending: true, readError: null }
    }
    case 'WRITE_START': {
      return { ...state, writePending: true, writeError: null }
    }

    case 'READ_SUCCESS': {
      return { ...state, readPending: false, data: action.data }
    }
    case 'WRITE_SUCCESS': {
      return { ...state, writePending: false, data: action.data }
    }

    case 'WRITE_ERROR': {
      return { ...state, writePending: false, writeError: action.error }
    }
    case 'READ_ERROR': {
      return { ...state, readPending: false, readError: action.error }
    }
    default:
      return state
  }
};

const useLocalStorage = (
  storageContext,
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$3, initialState$3);

  const setData = (data) => {
    if (!storageContext || !path) return
    dispatch({ type: 'WRITE_START' });
    storageContext.localDisklet
      .setText(path, JSON.stringify(data))
      .then(() => dispatch({ type: 'WRITE_SUCCESS', data }))
      .catch((error) => dispatch({ type: 'WRITE_ERROR', error }));
  };

  const effect = () => {
    if (!storageContext || !path) return // mount with null
    dispatch({ type: 'READ_START' });
    storageContext.localDisklet
      .getText(path)
      .then((data) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
      .catch((error) => dispatch({ type: 'READ_ERROR', error })); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      'localDisklet',
      (localDisklet) => {
        if (!storageContext || !path) return
        localDisklet
          .getText(path)
          .then((data) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
          .catch((error) => dispatch({ type: 'READ_ERROR', error }));
      }
    );
    return unsubscribe // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [storageContext]); // onUpdate

  return { ...state, setData }
};

// 




const initialState$4 = { deletePending: false, localUsers: null };

const reducer$4 = (state, action) => {
  switch (action.type) {
    case 'READ_LOCAL_USERS_SUCCESS': {
      return { ...state, localUsers: action.localUsers }
    }

    case 'DELETE_LOCAL_USER_START': {
      return { ...state, deletePending: true, error: null }
    }

    case 'DELETE_LOCAL_USER_SUCCESS': {
      return { ...state, deletePending: false }
    }

    case 'DELETE_LOCAL_USER_ERROR': {
      return { ...state, deletePending: false, error: action.error }
    }

    default:
      return state
  }
};

const useLocalUsers = (context) => {
  const [state, dispatch] = react.useReducer(reducer$4, initialState$4);

  const deleteLocalUser = (username) => {
    if (!context) return
    dispatch({ type: 'DELETE_LOCAL_USER_START' });
    context
      .deleteLocalAccount(username)
      .then(() => dispatch({ type: 'DELETE_LOCAL_USER_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_LOCAL_USER_ERROR', error }));
  };

  const effect = () => {
    if (!context) return // mount with null
    dispatch({ type: 'READ_LOCAL_USERS_SUCCESS', localUsers: context.localUsers });
    const unsubscribe = context.watch('localUsers', (localUsers) =>
      dispatch({ type: 'READ_LOCAL_USERS_SUCCESS', localUsers })
    ); // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [context]); // onUpdate

  return { ...state, deleteLocalUser }
};

// 



const initialState$5 = {
  name: null,
  pending: false,
  error: null
};

const reducer$5 = (state, action) => {
  switch (action.type) {
    case 'WRITE_NAME_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_NAME_SUCCESS':
    case 'WRITE_NAME_SUCCESS': {
      return { ...state, pending: false, name: action.name }
    }

    case 'WRITE_NAME_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
};

const useName = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$5, initialState$5);

  const setName = (name) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_NAME_START' });
    wallet
      .renameWallet(name)
      .then(() => dispatch({ type: 'WRITE_NAME_SUCCESS', name }))
      .catch((error) => dispatch({ type: 'WRITE_NAME_ERROR', error }));
  };

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_NAME_SUCCESS', name: wallet.name });
    const unsubscribe = wallet.watch('name', (name) =>
      dispatch({ type: 'WRITE_NAME_SUCCESS', name })
    ); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state, setName }
};

// 


const useOtpKey = (account) => {
  const [otpKey, setOtpKey] = react.useState<State>(account ? account.otpKey : null);

  const effect = () => {
    if (!account) return // mount with null
    setOtpKey(account.otpKey); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('otpKey', setOtpKey); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return otpKey
};

// 


const useOtpResetDate = (account) => {
  const [otpResetDate, setOtpResetDate] = react.useState<State>(account ? account.otpResetDate : null);

  const effect = () => {
    if (!account) return // mount with null
    setOtpResetDate(account.otpResetDate); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('otpResetDate', setOtpResetDate); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return otpResetDate
};

// 




const initialState$6 = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer$6 = (state, action) => {
  switch (action.type) {
    case 'READ_START': {
      return { ...state, readPending: true, readError: null }
    }
    case 'WRITE_START': {
      return { ...state, writePending: true, writeError: null }
    }

    case 'READ_SUCCESS': {
      return { ...state, readPending: false, data: action.data }
    }
    case 'WRITE_SUCCESS': {
      return { ...state, writePending: false, data: action.data }
    }

    case 'READ_ERROR': {
      return { ...state, readPending: false, readError: action.error }
    }
    case 'WRITE_ERROR': {
      return { ...state, writePending: false, writeError: action.error }
    }

    default:
      return state
  }
};

const useSyncedStorage = (
  storageContext,
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$6, initialState$6);

  const setData = (data) => {
    if (!storageContext || !path) return
    dispatch({ type: 'WRITE_START' });
    storageContext.disklet
      .setText(path, JSON.stringify(data))
      .then(() => dispatch({ type: 'WRITE_SUCCESS', data }))
      .catch((error) => dispatch({ type: 'WRITE_ERROR', error }));
  };

  const effect = () => {
    if (!storageContext || !path) return // mount with null
    dispatch({ type: 'READ_START' });
    storageContext.disklet
      .getText(path)
      .then((data) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
      .catch((error) => dispatch({ type: 'READ_ERROR', error })); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      'disklet',
      (disklet) => {
        if (!storageContext || !path) return
        disklet
          .getText(path)
          .then((data) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
          .catch((error) => dispatch({ type: 'READ_ERROR', error }));
      }
    );
    return unsubscribe // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [storageContext]); // onUpdate

  return { ...state, setData }
};

// 


const useSyncRatio = (wallet) => {
  const [syncRatio, setSyncRatio] = react.useState<State>(wallet ? wallet.syncRatio : null);

  const effect = () => {
    if (!wallet) return // mount with null
    setSyncRatio(wallet.syncRatio);
    const unsubscribe = wallet.watch('syncRatio', setSyncRatio); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return syncRatio
};

//

exports.useActiveWalletIds = useActiveWalletIds;
exports.useArchivedWalletIds = useArchivedWalletIds;
exports.useDeletedWalletIds = useDeletedWalletIds;
exports.useLocalUsers = useLocalUsers;
exports.useOtpKey = useOtpKey;
exports.useOtpResetDate = useOtpResetDate;
exports.useLocalStorage = useLocalStorage;
exports.useSyncedStorage = useSyncedStorage;
exports.useFiatCurrencyCode = useFiatCurrencyCode;
exports.useBalances = useBalances;
exports.useName = useName;
exports.useDataDump = useDataDump;
exports.useBlockHeight = useBlockHeight;
exports.useSyncRatio = useSyncRatio;
exports.useEnabledTokens = useEnabledTokens;
//# sourceMappingURL=index.js.map
