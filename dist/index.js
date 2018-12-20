'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('edge-core-js');
var react = require('react');

// 

const useActiveWalletIds = (account) => {
  const [activeWalletIds, setActiveWalletIds] = react.useState(account ? account.archivedWalletIds : []);

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
  const [archivedWalletIds, setArchivedWalletIds] = react.useState(account ? account.activeWalletIds : []);

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



const initialState = {
  balances: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'READ_BALANCES_SUCCESS': {
      const { balances } = action;
      return { ...state, balances }
    }
    default:
      return state
  }
};

const useBalances = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer, initialState);

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({ type: 'READ_BALANCES_SUCCESS', balances: wallet.balances });

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'balances',
      (balances) => dispatch({ type: 'READ_BALANCES_SUCCESS', balances })
    );

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return state.balances
};

// 



const initialState$1 = {
  blockHeight: null
};

const reducer$1 = (state, action) => {
  switch (action.type) {
    case 'READ_BLOCK_HEIGHT_SUCCESS': {
      const { blockHeight } = action;
      return { ...state, blockHeight }
    }
    default:
      return state
  }
};

const useBlockHeight = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$1, initialState$1);

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({ type: 'READ_BLOCK_HEIGHT_SUCCESS', blockHeight: wallet.blockHeight });

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'blockHeight',
      (blockHeight) =>
        dispatch({ type: 'READ_BLOCK_HEIGHT_SUCCESS', blockHeight })
    );

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return state.blockHeight
};

// 



const initialState$2 = {
  dataDump: null,
  error: null,
  pending: false
};

const reducer$2 = (state, action) => {
  switch (action.type) {
    case 'READ_DATA_DUMP_START': {
      return { ...state, pending: true }
    }
    case 'READ_DATA_DUMP_SUCCESS': {
      const { dataDump } = action;
      return { ...state, dataDump, pending: false }
    }
    case 'READ_DATA_DUMP_ERROR': {
      const { error } = action;
      return { ...state, error, pending: false }
    }
    default:
      return state
  }
};

const useDataDump = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$2, initialState$2);

  const onSuccess = (dataDump) => dispatch({ type: 'READ_DATA_DUMP_SUCCESS', dataDump });
  const onError = (error) => dispatch({ type: 'READ_DATA_DUMP_ERROR', error });

  const getDataDump = () => {
    if (!wallet) return

    dispatch({ type: 'READ_DATA_DUMP_START' });
    wallet
      .dumpData()
      .then(onSuccess)
      .catch(onError);
  };

  return { ...state, getDataDump }
};

// 

const getDeletedWalletIds = (walletInfos) => {
  const deletedWalletInfos = walletInfos.filter(key => key.deleted);
  const deletedWalletIds = deletedWalletInfos.map((key) => key.id);

  return deletedWalletIds
};

const useDeletedWalletIds = (account) => {
  const initialState = account ? getDeletedWalletIds(account.allKeys) : [];
  const [deletedWalletIds, setDeletedWalletIds] = react.useState(initialState);

  const effect = () => {
    if (!account) return // mount with null
    setDeletedWalletIds(getDeletedWalletIds(account.allKeys)); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('allKeys', allKeys => {
      setDeletedWalletIds(getDeletedWalletIds(allKeys));
    }); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return deletedWalletIds
};

// 







const initialState$3 = {
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

const reducer$3 = (state, action) => {
  switch (action.type) {
    case 'READ_ENABLED_TOKENS_START': {
      return { ...state, readEnabledTokensPending: true }
    }
    case 'ENABLE_TOKENS_START': {
      return { ...state, enableTokensPending: true }
    }
    case 'DISABLE_TOKENS_START': {
      return { ...state, disableTokensPending: true }
    }
    case 'ADD_CUSTOM_TOKEN_START': {
      return { ...state, addCustomTokenPending: true }
    }

    case 'READ_ENABLED_TOKENS_SUCCESS': {
      const { enabledTokens } = action;
      return { ...state, enabledTokens, readEnabledTokensPending: false }
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
      const { error } = action;
      return { ...state, readEnabledtokensError: error, readEnabledTokensPending: false }
    }
    case 'ENABLE_TOKENS_ERROR': {
      const { error } = action;
      return { ...state, enableTokensPending: false, enableTokenError: error }
    }
    case 'DISABLE_TOKENS_ERROR': {
      const { error } = action;
      return { ...state, disableTokensPending: false, disableTokenError: error }
    }
    case 'ADD_CUSTOM_TOKEN_ERROR': {
      const { error } = action;
      return { ...state, addCustomTokenPending: false, addCustomTokenError: error }
    }
    default:
      return state
  }
};

const useEnabledTokens = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$3, initialState$3);

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
      .then((enabledTokens) =>
        dispatch({
          type: 'READ_ENABLED_TOKENS_SUCCESS',
          enabledTokens
        })
      )
      .catch((error) => dispatch({ type: 'READ_ENABLED_TOKENS_ERROR', error }));
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state, enableTokens, disableTokens, addCustomToken }
};

// 



const initialState$4 = {
  fiatCurrencyCode: null,
  pending: false,
  error: null
};

const reducer$4 = (state, action) => {
  switch (action.type) {
    case 'WRITE_FIAT_CURRENCY_CODE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_FIAT_CURRENCY_CODE_SUCCESS':
    case 'WRITE_FIAT_CURRENCY_CODE_SUCCESS': {
      const { fiatCurrencyCode } = action;
      return { ...state, pending: false, fiatCurrencyCode }
    }
    case 'WRITE_FIAT_CURRENCY_CODE_ERROR': {
      const { error } = action;
      return { ...state, pending: false, error }
    }
    default:
      return state
  }
};

const useFiatCurrencyCode = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$4, initialState$4);

  const onSuccess = (fiatCurrencyCode) => () =>
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode });
  const onError = (error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error });

  const setFiatCurrencyCode = (fiatCurrencyCode) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' });
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(onSuccess(fiatCurrencyCode))
      .catch(onError);
  };

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({
      type: 'READ_FIAT_CURRENCY_CODE_SUCCESS',
      fiatCurrencyCode: wallet.fiatCurrencyCode
    });

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'fiatCurrencyCode',
      (fiatCurrencyCode) =>
        dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode })
    );

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state, setFiatCurrencyCode }
};

// 




const initialState$5 = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer$5 = (state, action) => {
  switch (action.type) {
    case 'WRITE_START': {
      return { ...state, writePending: true, writeError: null }
    }
    case 'WRITE_SUCCESS': {
      const { data } = action;
      return { ...state, writePending: false, data }
    }
    case 'WRITE_ERROR': {
      const { error: writeError } = action;
      return { ...state, writePending: false, writeError }
    }
    case 'READ_START': {
      return { ...state, readPending: true, readError: null }
    }
    case 'READ_SUCCESS': {
      const { data } = action;
      return { ...state, readPending: false, data }
    }
    case 'READ_ERROR': {
      const { error: readError } = action;
      return { ...state, readPending: false, readError }
    }
    default:
      return state
  }
};

const useLocalStorage = (
  storageContext,
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$5, initialState$5);

  const onWriteSuccess = (data) => () => dispatch({ type: 'WRITE_SUCCESS', data });
  const onWriteError = (error) => dispatch({ type: 'WRITE_ERROR', error });
  const onReadSuccess = (data) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) });
  const onReadError = (error) => dispatch({ type: 'READ_ERROR', error });

  const setData = (data) => {
    if (!storageContext || !path) return
    dispatch({ type: 'WRITE_START' });
    storageContext.localDisklet
      .setText(path, JSON.stringify(data))
      .then(onWriteSuccess(data))
      .catch(onWriteError);
  };

  const effect = () => {
    if (!storageContext || !path) return // mount with null
    dispatch({ type: 'READ_START' });
    storageContext.localDisklet
      .getText(path)
      .then(onReadSuccess)
      .catch(onReadError); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      'localDisklet',
      (localDisklet) => {
        if (!storageContext || !path) return
        localDisklet
          .getText(path)
          .then(onReadSuccess)
          .catch(onReadError);
      }
    );

    return unsubscribe // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [storageContext]); // onUpdate

  return { ...state, setData }
};

// 

const useLocalUsers = (context) => {
  const [localUsers, setLocalUsers] = react.useState(context ? context.localUsers : []);

  const effect = () => {
    if (!context) return // mount with null
    const unsubscribe = context.watch('localUsers', setLocalUsers); // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [context]); // onUpdate

  return localUsers
};

// 



const initialState$6 = {
  name: null,
  pending: false,
  error: null
};

const reducer$6 = (state, action) => {
  switch (action.type) {
    case 'WRITE_NAME_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_NAME_SUCCESS':
    case 'WRITE_NAME_SUCCESS': {
      const { name } = action;
      return { ...state, pending: false, name }
    }
    case 'WRITE_NAME_ERROR': {
      const { error } = action;
      return { ...state, pending: false, error }
    }
    default:
      return state
  }
};

const useName = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$6, initialState$6);

  const onSuccess = (name) => () => dispatch({ type: 'WRITE_NAME_SUCCESS', name });
  const onError = (error) => dispatch({ type: 'WRITE_NAME_ERROR', error });

  const setName = (name) => {
    if (!wallet) return

    dispatch({ type: 'WRITE_NAME_START' });

    wallet
      .renameWallet(name)
      .then(onSuccess(name))
      .catch(onError);
  };

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({
      type: 'READ_NAME_SUCCESS',
      name: wallet.name
    });

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'name',
      (name) => dispatch({ type: 'WRITE_NAME_SUCCESS', name })
    );

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state, setName }
};

// 

const useOtpKey = (account) => {
  const [otpKey, setOtpKey] = react.useState(account ? account.otpKey : []);

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
  const [otpResetDate, setOtpResetDate] = react.useState(account ? account.otpResetDate : []);

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




const initialState$7 = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer$7 = (state, action) => {
  switch (action.type) {
    case 'WRITE_START': {
      return { ...state, writePending: true, writeError: null }
    }
    case 'WRITE_SUCCESS': {
      const { data } = action;
      return { ...state, writePending: false, data }
    }
    case 'WRITE_ERROR': {
      const { error: writeError } = action;
      return { ...state, writePending: false, writeError }
    }
    case 'READ_START': {
      return { ...state, readPending: true, readError: null }
    }
    case 'READ_SUCCESS': {
      const { data } = action;
      return { ...state, readPending: false, data }
    }
    case 'READ_ERROR': {
      const { error: readError } = action;
      return { ...state, readPending: false, readError }
    }
    default:
      return state
  }
};

const useSyncedStorage = (
  storageContext,
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$7, initialState$7);

  const onWriteSuccess = (data) => () => dispatch({ type: 'WRITE_SUCCESS', data });
  const onWriteError = (error) => dispatch({ type: 'WRITE_ERROR', error });
  const onReadSuccess = (data) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) });
  const onReadError = (error) => dispatch({ type: 'READ_ERROR', error });

  const setData = (data) => {
    if (!storageContext || !path) return
    dispatch({ type: 'WRITE_START' });
    storageContext.disklet
      .setText(path, JSON.stringify(data))
      .then(onWriteSuccess(data))
      .catch(onWriteError);
  };

  const effect = () => {
    if (!storageContext || !path) return // mount with null
    dispatch({ type: 'READ_START' });
    storageContext.disklet
      .getText(path)
      .then(onReadSuccess)
      .catch(onReadError); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      'disklet',
      (disklet) => {
        if (!storageContext || !path) return
        disklet
          .getText(path)
          .then(onReadSuccess)
          .catch(onReadError);
      }
    );

    return unsubscribe // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [storageContext]); // onUpdate

  return { ...state, setData }
};

// 



const initialState$8 = {
  syncRatio: null
};

const reducer$8 = (state, action) => {
  switch (action.type) {
    case 'READ_SYNC_RATIO_SUCCESS': {
      const { syncRatio } = action;
      return { ...state, syncRatio }
    }
    default:
      return state
  }
};

const useSyncRatio = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$8, initialState$8);

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({ type: 'READ_SYNC_RATIO_SUCCESS', syncRatio: wallet.syncRatio });

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'syncRatio',
      (syncRatio) =>
        dispatch({ type: 'READ_SYNC_RATIO_SUCCESS', syncRatio })
    );

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return state.syncRatio
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
