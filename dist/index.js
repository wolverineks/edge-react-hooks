'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('edge-core-js');
var react = require('react');

// 




const initialState = { pending: false, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTIVATE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ACTIVATE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ACTIVATE_WALLET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useActivateWallet = (account, walletId) => {
  const [state, dispatch] = react.useReducer(reducer, initialState);

  const activateWallet = () => {
    if (!account || !walletId) return
    dispatch({ type: 'ACTIVATE_WALLET_START' });
    account
      .changeWalletStates({ [walletId]: { archived: false } })
      .then(() => dispatch({ type: 'ACTIVATE_WALLET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ACTIVATE_WALLET_ERROR', error }));
  };

  return { ...state, activateWallet }
};

// 


const useActiveWalletIds = (account) => {
  const [activeWalletIds, setActiveWalletIds] = react.useState(null);

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




const initialState$1 = { pending: false, error: null };

const reducer$1 = (state, action) => {
  switch (action.type) {
    case 'ADD_CUSTOM_TOKEN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ADD_CUSTOM_TOKEN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ADD_CUSTOM_TOKEN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useAddCustomToken = (wallet, tokenInfo) => {
  const [state, dispatch] = react.useReducer(reducer$1, initialState$1);

  const addCustomToken = () => {
    if (!wallet || !tokenInfo) return
    dispatch({ type: 'ADD_CUSTOM_TOKEN_START' });
    wallet
      .addCustomToken(tokenInfo)
      .then(() => dispatch({ type: 'ADD_CUSTOM_TOKEN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ADD_CUSTOM_TOKEN_ERROR', error }));
  };

  return { ...state, addCustomToken }
};

// 


const useAllKeys = (account) => {
  const [allKeys, setAllKeys] = react.useState(null);

  const effect = () => {
    if (!account) return // mount with null
    setAllKeys(account.allKeys); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('allKeys', setAllKeys); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return allKeys
};

// 


const useArchivedWalletIds = (account) => {
  const [archivedWalletIds, setArchivedWalletIds] = react.useState(null);

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




const initialState$2 = { pending: false, error: null };

const reducer$2 = (state, action) => {
  switch (action.type) {
    case 'ARCHIVE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ARCHIVE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ARCHIVE_WALLET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useArchiveWallet = (account, walletId) => {
  const [state, dispatch] = react.useReducer(reducer$2, initialState$2);

  const archiveWallet = () => {
    if (!account || !walletId) return
    dispatch({ type: 'ARCHIVE_WALLET_START' });
    account
      .changeWalletStates({ [walletId]: { archived: true } })
      .then(() => dispatch({ type: 'ARCHIVE_WALLET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ARCHIVE_WALLET_ERROR', error }));
  };

  return { ...state, archiveWallet }
};

// 


const useBalances = (wallet) => {
  const [balances, setBalances] = react.useState(null);

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
  const [blockHeight, setBlockHeight] = react.useState(null);

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




const initialState$3 = { pending: false, error: null };

const reducer$3 = (state, action) => {
  switch (action.type) {
    case 'BROADCAST_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'BROADCAST_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'BROADCAST_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useBroadcastTransaction = (
  wallet,
  transaction
) => {
  const [state, dispatch] = react.useReducer(reducer$3, initialState$3);

  const broadcastTransaction = () => {
    if (!wallet || !transaction) return
    dispatch({ type: 'BROADCAST_TRANSACTION_START' });
    wallet
      .broadcastTx(transaction)
      .then(() => dispatch({ type: 'BROADCAST_TRANSACTION_SUCCESS' }))
      .catch((error) => dispatch({ type: 'BROADCAST_TRANSACTION_ERROR', error }));
  };

  return { ...state, broadcastTransaction }
};

// 




const initialState$4 = { pending: false, error: null };

const reducer$4 = (state, action) => {
  switch (action.type) {
    case 'CANCEL_OTP_RESET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CANCEL_OTP_RESET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CANCEL_OTP_RESET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useCancelOtpReset = (account) => {
  const [state, dispatch] = react.useReducer(reducer$4, initialState$4);

  const cancelOtpReset = () => {
    if (!account) return
    dispatch({ type: 'CANCEL_OTP_RESET_START' });
    account
      .cancelOtpReset()
      .then(() => dispatch({ type: 'CANCEL_OTP_RESET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CANCEL_OTP_RESET_ERROR', error }));
  };

  return { ...state, cancelOtpReset }
};

// 




const initialState$5 = { pending: false, error: null };

const reducer$5 = (state, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_PASSWORD_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_PASSWORD_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useChangePassword = (account, password) => {
  const [state, dispatch] = react.useReducer(reducer$5, initialState$5);

  const changePassword = () => {
    if (!account || !password) return
    dispatch({ type: 'CHANGE_PASSWORD_START' });
    account
      .changePassword(password)
      .then(() => dispatch({ type: 'CHANGE_PASSWORD_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CHANGE_PASSWORD_ERROR', error }));
  };

  return { ...state, changePassword }
};

// 




const initialState$6 = { error: null, pending: false };

const reducer$6 = (state, action) => {
  switch (action.type) {
    case 'CHANGE_PIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_PIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_PIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useChangePin = (account, pin) => {
  const [state, dispatch] = react.useReducer(reducer$6, initialState$6);

  const changePin = () => {
    if (!account || !pin) return
    dispatch({ type: 'CHANGE_PIN_START' });
    account
      .changePin({ pin })
      .then(() => dispatch({ type: 'CHANGE_PIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CHANGE_PIN_ERROR', error }));
  };

  return { ...state, changePin }
};

// 




const initialState$7 = { pending: false, error: null };

const reducer$7 = (state, action) => {
  switch (action.type) {
    case 'CHANGE_RECOVERY_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_RECOVERY_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_RECOVERY_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useChangeRecovery = (
  account,
  questions,
  answers
) => {
  const [state, dispatch] = react.useReducer(reducer$7, initialState$7);

  const changeRecovery = () => {
    if (!account || !questions || !answers) return
    dispatch({ type: 'CHANGE_RECOVERY_START' });
    account
      .changeRecovery(questions, answers)
      .then(() => dispatch({ type: 'CHANGE_RECOVERY_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CHANGE_RECOVERY_ERROR', error }));
  };

  return { ...state, changeRecovery }
};

// 



const initialState$8 = { pending: false, error: null };

const reducer$8 = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STATES_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_STATES_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_STATES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useChangeWalletStates = (account, walletStates) => {
  const [state, dispatch] = react.useReducer(reducer$8, initialState$8);

  const activateWallet = () => {
    if (!account || !walletStates) return
    dispatch({ type: 'CHANGE_STATES_START' });
    account
      .changeWalletStates(walletStates)
      .then(() => dispatch({ type: 'CHANGE_STATES_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CHANGE_STATES_ERROR', error }));
  };

  return { ...state, activateWallet }
};

// 




const initialState$9 = { pending: false, error: null, passwordVerified: null };

const reducer$9 = (state, action) => {
  switch (action.type) {
    case 'CHECK_PASSWORD_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHECK_PASSWORD_SUCCESS': {
      return { ...state, pending: false, passwordVerified: action.passwordVerified }
    }
    case 'CHECK_PASSWORD_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useCheckPassword = (account, password) => {
  const [state, dispatch] = react.useReducer(reducer$9, initialState$9);

  const checkPassword = () => {
    if (!account || !password) return
    dispatch({ type: 'CHECK_PASSWORD_START' });
    account
      .checkPassword(password)
      .then((passwordVerified) => dispatch({ type: 'CHECK_PASSWORD_SUCCESS', passwordVerified }))
      .catch((error) => dispatch({ type: 'CHECK_PASSWORD_ERROR', error }));
  };

  return { ...state, checkPassword }
};

// 




const initialState$a = { error: null, pending: false, pinVerified: null };

const reducer$a = (state, action) => {
  switch (action.type) {
    case 'CHECK_PIN_START': {
      return { ...state, pending: true, error: null, pinVerified: null }
    }
    case 'CHECK_PIN_SUCCESS': {
      return { ...state, pending: false, pinVerified: true }
    }
    case 'CHECK_PIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useCheckPin = (account, pin) => {
  const [state, dispatch] = react.useReducer(reducer$a, initialState$a);

  const checkPin = () => {
    if (!account || !pin) return
    dispatch({ type: 'CHECK_PIN_START' });
    account
      .checkPin(pin)
      .then((pinVerified) => dispatch({ type: 'CHECK_PIN_SUCCESS', pinVerified }))
      .catch((error) => dispatch({ type: 'CHECK_PIN_ERROR', error }));
  };

  return { ...state, checkPin }
};

// 




const initialState$b = { pending: false, error: null, pinLoginEnabled: null };

const reducer$b = (state, action) => {
  switch (action.type) {
    case 'CHECK_PIN_LOGIN_ENABLED_START': {
      return { ...state, pending: true, error: null, pinLoginEnabled: null }
    }
    case 'CHECK_PIN_LOGIN_ENABLED_SUCCESS': {
      return { ...state, pending: false, pinLoginEnabled: action.pinLoginEnabled }
    }
    case 'CHECK_PIN_LOGIN_ENABLED_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useCheckPinLoginEnabled = (context, username) => {
  const [state, dispatch] = react.useReducer(reducer$b, initialState$b);

  const checkPinLoginEnabled = () => {
    if (!context || !username) return
    dispatch({ type: 'CHECK_PIN_LOGIN_ENABLED_START' });
    context
      .pinLoginEnabled(username)
      .then((pinLoginEnabled) => dispatch({ type: 'CHECK_PIN_LOGIN_ENABLED_SUCCESS', pinLoginEnabled }))
      .catch((error) => dispatch({ type: 'CHECK_PIN_LOGIN_ENABLED_ERROR', error }));
  };

  return { ...state, checkPinLoginEnabled }
};

// 




const initialState$c = { pending: false, error: null, usernameAvailability: null };

const reducer$c = (state, action) => {
  switch (action.type) {
    case 'CHECK_USERNAME_AVAILABILITY_START': {
      return { ...state, pending: true, error: null, usernameAvailability: null }
    }
    case 'CHECK_USERNAME_AVAILABILITY_SUCCESS': {
      return { ...state, pending: false, usernameAvailability: action.usernameAvailability }
    }
    case 'CHECK_USERNAME_AVAILABILITY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useCheckUsernameAvailability = (context, username) => {
  const [state, dispatch] = react.useReducer(reducer$c, initialState$c);

  const checkUsernameAvailability = () => {
    if (!context || !username) return
    dispatch({ type: 'CHECK_USERNAME_AVAILABILITY_START' });
    context
      .usernameAvailable(username)
      .then((usernameAvailability) =>
        dispatch({ type: 'CHECK_USERNAME_AVAILABILITY_SUCCESS', usernameAvailability })
      )
      .catch((error) => dispatch({ type: 'CHECK_USERNAME_AVAILABILITY_ERROR', error }));
  };

  return { ...state, checkUsernameAvailability }
};

// 



const initialState$d = { amount: null, pending: false, error: null };

const reducer$d = (state, action) => {
  switch (action.type) {
    case 'CONVERT_CURRENCY_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CONVERT_CURRENCY_SUCCESS': {
      return { ...state, pending: false, amount: action.amount }
    }
    case 'CONVERT_CURRENCY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useConvertCurrency = (
  account,
  fromCurrency,
  toCurrency,
  amount
) => {
  const [state, dispatch] = react.useReducer(reducer$d, initialState$d);

  const effect = () => {
    if (!account || !account.rateCache || !fromCurrency || !toCurrency || !amount) return // mount with null
    dispatch({ type: 'CONVERT_CURRENCY_START' });
    account.rateCache
      .convertCurrency(fromCurrency, toCurrency, amount)
      .then((amount) => dispatch({ type: 'CONVERT_CURRENCY_SUCCESS', amount }))
      .catch((error) => dispatch({ type: 'CONVERT_CURRENCY_ERROR', error })); // mount with account / null -> accoun / accounA -> accounB

    const unsubscribe = account.rateCache.on('update', () => {
      if (!account || !account.rateCache || !fromCurrency || !toCurrency || !amount) return
      account.rateCache
        .convertCurrency(fromCurrency, toCurrency, amount)
        .then((amount) => dispatch({ type: 'CONVERT_CURRENCY_SUCCESS', amount }))
        .catch((error) => dispatch({ type: 'CONVERT_CURRENCY_ERROR', error }));
    });
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account, fromCurrency, toCurrency, amount]); // onUpdate

  return state
};

// 



const initialState$e = { account: null, error: null, pending: false };

const reducer$e = (state, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CREATE_ACCOUNT_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'CREATE_ACCOUNT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useCreateAccount = (
  context,
  username,
  password,
  pin,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$e, initialState$e);

  const createAccount = () => {
    if (!context || !username) return
    dispatch({ type: 'CREATE_ACCOUNT_START' });
    context
      .createAccount(username, password || undefined, pin || undefined, options || undefined)
      .then((account) => dispatch({ type: 'CREATE_ACCOUNT_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'CREATE_ACCOUNT_ERROR', error }));
  };

  return { ...state, createAccount }
};

// 




const initialState$f = { pending: false, error: null };

const reducer$f = (state, action) => {
  switch (action.type) {
    case 'CREATE_CURRENCY_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CREATE_CURRENCY_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CREATE_CURRENCY_WALLET_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useCreateCurrencyWallet = (
  account,
  type,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$f, initialState$f);

  const createCurrencyWallet = () => {
    if (!account || !type) return
    dispatch({ type: 'CREATE_CURRENCY_WALLET_START' });
    account
      .createCurrencyWallet(type, options || undefined)
      .then(() => dispatch({ type: 'CREATE_CURRENCY_WALLET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CREATE_CURRENCY_WALLET_ERROR', error }));
  };

  return { ...state, createCurrencyWallet }
};

// 




const initialState$g = { pending: false, error: null };

const reducer$g = (state, action) => {
  switch (action.type) {
    case 'CREATE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CREATE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CREATE_WALLET_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useCreateWallet = (account, type, keys) => {
  const [state, dispatch] = react.useReducer(reducer$g, initialState$g);

  const createWallet = () => {
    if (!account || !type || !keys) return
    dispatch({ type: 'CREATE_WALLET_START' });
    account
      .createWallet(type, keys)
      .then(() => dispatch({ type: 'CREATE_WALLET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CREATE_WALLET_ERROR', error }));
  };

  return { ...state, createWallet }
};

// 


const useCurrencyWallets = (account) => {
  const [currencyWallets, setCurrencyWallets] = react.useState(account ? account.currencyWallets : null);

  const effect = () => {
    if (!account) return // mount with null
    setCurrencyWallets(account.currencyWallets); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('currencyWallets', setCurrencyWallets); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [account]); // onUpdate

  return currencyWallets
};

// 



const initialState$h = { dataDump: null, error: null, pending: false };

const reducer$h = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$h, initialState$h);

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
  const [deletedWalletIds, setDeletedWalletIds] = react.useState(
    account ? getDeletedWalletIds(account.allKeys) : null
  );

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




const initialState$i = { pending: false, error: null };

const reducer$i = (state, action) => {
  switch (action.type) {
    case 'DELETE_LOCAL_USER_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_LOCAL_USER_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_LOCAL_USER_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useDeleteLocalUser = (context, username) => {
  const [state, dispatch] = react.useReducer(reducer$i, initialState$i);

  const deleteLocalUser = () => {
    if (!context || !username) return
    dispatch({ type: 'DELETE_LOCAL_USER_START' });
    context
      .deleteLocalAccount(username)
      .then(() => dispatch({ type: 'DELETE_LOCAL_USER_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_LOCAL_USER_ERROR', error }));
  };

  return { ...state, deleteLocalUser }
};

// 




const initialState$j = { pending: false, error: null };

const reducer$j = (state, action) => {
  switch (action.type) {
    case 'DELETE_PASSWORD_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_PASSWORD_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_PASSWORD_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useDeletePassword = (account) => {
  const [state, dispatch] = react.useReducer(reducer$j, initialState$j);

  const deletePassword = () => {
    if (!account) return
    dispatch({ type: 'DELETE_PASSWORD_START' });
    account
      .deletePassword()
      .then(() => dispatch({ type: 'DELETE_PASSWORD_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_PASSWORD_ERROR', error }));
  };

  return { ...state, deletePassword }
};

// 




const initialState$k = { pending: false, error: null };

const reducer$k = (state, action) => {
  switch (action.type) {
    case 'DELETE_PIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_PIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_PIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useDeletePin = (account) => {
  const [state, dispatch] = react.useReducer(reducer$k, initialState$k);

  const deletePin = () => {
    if (!account) return
    dispatch({ type: 'DELETE_PIN_START' });
    account
      .deletePin()
      .then(() => dispatch({ type: 'DELETE_PIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_PIN_ERROR', error }));
  };

  return { ...state, deletePin }
};

// 




const initialState$l = { pending: false, error: null };

const reducer$l = (state, action) => {
  switch (action.type) {
    case 'DELETE_RECOVERY_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_RECOVERY_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_RECOVERY_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useDeleteRecovery = (account) => {
  const [state, dispatch] = react.useReducer(reducer$l, initialState$l);

  const deleteRecovery = () => {
    if (!account) return
    dispatch({ type: 'DELETE_RECOVERY_START' });
    account
      .deleteRecovery()
      .then(() => dispatch({ type: 'DELETE_RECOVERY_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_RECOVERY_ERROR', error }));
  };

  return { ...state, deleteRecovery }
};

// 



const initialState$m = { pending: false, error: null };

const reducer$m = (state, action) => {
  switch (action.type) {
    case 'DELETE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_WALLET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useDeleteWallet = (account, walletId) => {
  const [state, dispatch] = react.useReducer(reducer$m, initialState$m);

  const deleteWallet = () => {
    if (!account) return
    dispatch({ type: 'DELETE_WALLET_START' });
    account
      .changeWalletStates({ [walletId]: { deleted: true } })
      .then(() => dispatch({ type: 'DELETE_WALLET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_WALLET_ERROR', error }));
  };

  return { ...state, deleteWallet }
};

// 




const initialState$n = { error: null, pending: false };

const reducer$n = (state, action) => {
  switch (action.type) {
    case 'DISABLE_OTP_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DISABLE_OTP_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DISABLE_OTP_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useDisableOtp = (account) => {
  const [state, dispatch] = react.useReducer(reducer$n, initialState$n);

  const disableOtp = () => {
    if (!account) return
    dispatch({ type: 'DISABLE_OTP_START' });
    account
      .disableOtp()
      .then(() => dispatch({ type: 'DISABLE_OTP_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DISABLE_OTP_ERROR', error }));
  };

  return { ...state, disableOtp }
};

// 




const initialState$o = { error: null, pending: false };

const reducer$o = (state, action) => {
  switch (action.type) {
    case 'DISABLE_PIN_LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DISABLE_PIN_LOGIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DISABLE_PIN_LOGIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useDisablePinLogin = (account) => {
  const [state, dispatch] = react.useReducer(reducer$o, initialState$o);

  const disablePinLogin = () => {
    if (!account) return
    dispatch({ type: 'DISABLE_PIN_LOGIN_START' });
    account
      .changePin({ enableLogin: false })
      .then(() => dispatch({ type: 'DISABLE_PIN_LOGIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DISABLE_PIN_LOGIN_ERROR', error }));
  };

  return { ...state, disablePinLogin }
};

// 




const initialState$p = { pending: false, error: null };

const reducer$p = (state, action) => {
  switch (action.type) {
    case 'DISABLE_TOKENS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DISABLE_TOKENS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DISABLE_TOKENS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useDisableTokens = (wallet, tokens) => {
  const [state, dispatch] = react.useReducer(reducer$p, initialState$p);

  const disableTokens = () => {
    if (!wallet || !tokens) return
    dispatch({ type: 'DISABLE_TOKENS_START' });
    wallet
      .disableTokens(tokens)
      .then(() => dispatch({ type: 'DISABLE_TOKENS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DISABLE_TOKENS_ERROR', error }));
  };

  return { ...state, disableTokens }
};

// 




const initialState$q = { enabledTokens: null, error: null, pending: false };

const reducer$q = (state, action) => {
  switch (action.type) {
    case 'READ_ENABLED_TOKENS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_ENABLED_TOKENS_SUCCESS': {
      return { ...state, pending: false, enabledTokens: action.enabledTokens }
    }
    case 'READ_ENABLED_TOKENS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useEnabledTokens = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$q, initialState$q);

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

  return state
};

// 




const initialState$r = { error: null, pending: false };

const reducer$r = (state, action) => {
  switch (action.type) {
    case 'ENABLE_OTP_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENABLE_OTP_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ENABLE_OTP_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useEnableOtp = (account) => {
  const [state, dispatch] = react.useReducer(reducer$r, initialState$r);

  const enableOtp = () => {
    if (!account) return
    dispatch({ type: 'ENABLE_OTP_START' });
    account
      .enableOtp()
      .then(() => dispatch({ type: 'ENABLE_OTP_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ENABLE_OTP_ERROR', error }));
  };

  return { ...state, enableOtp }
};

// 




const initialState$s = { error: null, pending: false };

const reducer$s = (state, action) => {
  switch (action.type) {
    case 'ENABLE_PIN_LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENABLE_PIN_LOGIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ENABLE_PIN_LOGIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
};

const useEnablePinLogin = (account) => {
  const [state, dispatch] = react.useReducer(reducer$s, initialState$s);

  const enablePinLogin = () => {
    if (!account) return
    dispatch({ type: 'ENABLE_PIN_LOGIN_START' });
    account
      .changePin({ enableLogin: true })
      .then(() => dispatch({ type: 'ENABLE_PIN_LOGIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ENABLE_PIN_LOGIN_ERROR', error }));
  };

  return { ...state, enablePinLogin }
};

// 




const initialState$t = { pending: false, error: null };

const reducer$t = (state, action) => {
  switch (action.type) {
    case 'ENABLE_TOKENS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENABLE_TOKENS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ENABLE_TOKENS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useEnableTokens = (wallet, tokens) => {
  const [state, dispatch] = react.useReducer(reducer$t, initialState$t);

  const enableTokens = () => {
    if (!wallet || !tokens) return
    dispatch({ type: 'ENABLE_TOKENS_START' });
    wallet
      .enableTokens(tokens)
      .then(() => dispatch({ type: 'ENABLE_TOKENS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ENABLE_TOKENS_ERROR', error }));
  };

  return { ...state, enableTokens }
};

// 



const initialState$u = { pending: false, error: null, uri: null };

const reducer$u = (state, action) => {
  switch (action.type) {
    case 'ENCODE_URI_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENCODE_URI_SUCCESS': {
      return { ...state, pending: false, uri: action.uri }
    }
    case 'ENCODE_URI_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useEncodeUri = (wallet, uri) => {
  const [state, dispatch] = react.useReducer(reducer$u, initialState$u);

  const encodeUri = () => {
    if (!wallet || !uri) return // mount with null
    dispatch({ type: 'ENCODE_URI_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .encodeUri(uri)
      .then((uri) => dispatch({ type: 'ENCODE_URI_SUCCESS', uri }))
      .catch((error) => dispatch({ type: 'ENCODE_URI_ERROR', error }));
  };

  return { ...state, encodeUri }
};

// 



const initialState$v = { pending: false, error: null, csv: null };

const reducer$v = (state, action) => {
  switch (action.type) {
    case 'EXPORT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'EXPORT_SUCCESS': {
      return { ...state, pending: false, csv: action.csv }
    }
    case 'EXPORT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useExportToCsv = (
  wallet,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$v, initialState$v);

  const exportToCsv = () => {
    if (!wallet || !options) return // mount with null
    dispatch({ type: 'EXPORT_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .exportTransactionsToCSV(options)
      .then((csv) => dispatch({ type: 'EXPORT_SUCCESS', csv }))
      .catch((error) => dispatch({ type: 'EXPORT_ERROR', error }));
  };

  return { ...state, exportToCsv }
};

// 



const initialState$w = { pending: false, error: null, qbo: null };

const reducer$w = (state, action) => {
  switch (action.type) {
    case 'EXPORT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'EXPORT_SUCCESS': {
      return { ...state, pending: false, qbo: action.qbo }
    }
    case 'EXPORT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useExportToQbo = (
  wallet,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$w, initialState$w);

  const exportToQbo = () => {
    if (!wallet || !options) return // mount with null
    dispatch({ type: 'EXPORT_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .exportTransactionsToQBO(options)
      .then((qbo) => dispatch({ type: 'EXPORT_SUCCESS', qbo }))
      .catch((error) => dispatch({ type: 'EXPORT_ERROR', error }));
  };

  return { ...state, exportToQbo }
};

// 




const initialState$x = { pending: false, error: null, lobby: null };

const reducer$x = (state, action) => {
  switch (action.type) {
    case 'FETCH_LOBBY_START': {
      return { ...state, pending: true, error: null, lobby: null }
    }
    case 'FETCH_LOBBY_SUCCESS': {
      return { ...state, pending: false, lobby: action.lobby }
    }
    case 'FETCH_LOBBY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useFetchLobby = (account, lobbyId) => {
  const [state, dispatch] = react.useReducer(reducer$x, initialState$x);

  const fetchLobby = () => {
    if (!account) return
    dispatch({ type: 'FETCH_LOBBY_START' });
    account
      .fetchLobby(lobbyId)
      .then((lobby) => dispatch({ type: 'FETCH_LOBBY_SUCCESS', lobby }))
      .catch((error) => dispatch({ type: 'FETCH_LOBBY_ERROR', error }));
  };

  return { ...state, fetchLobby }
};

// 




const initialState$y = { pending: false, error: null, loginMessages: null };

const reducer$y = (state, action) => {
  switch (action.type) {
    case 'FETCH_LOGIN_MESSAGES_START': {
      return { ...state, pending: true, error: null, loginMessages: null }
    }
    case 'FETCH_LOGIN_MESSAGES_SUCCESS': {
      return { ...state, pending: false, loginMessages: action.loginMessages }
    }
    case 'FETCH_LOGIN_MESSAGES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useFetchLoginMessages = (context) => {
  const [state, dispatch] = react.useReducer(reducer$y, initialState$y);

  const fetchLoginMessages = () => {
    if (!context) return
    dispatch({ type: 'FETCH_LOGIN_MESSAGES_START' });
    context
      .fetchLoginMessages()
      .then((loginMessages) => dispatch({ type: 'FETCH_LOGIN_MESSAGES_SUCCESS', loginMessages }))
      .catch((error) => dispatch({ type: 'FETCH_LOGIN_MESSAGES_ERROR', error }));
  };

  return { ...state, fetchLoginMessages }
};

// 




const initialState$z = { pending: false, error: null, recovery2Questions: null };

const reducer$z = (state, action) => {
  switch (action.type) {
    case 'FETCH_RECOVERY_2_QUESTIONS_START': {
      return { ...state, pending: true, error: null, recovery2Questions: null }
    }
    case 'FETCH_RECOVERY_2_QUESTIONS_SUCCESS': {
      return { ...state, pending: false, recovery2Questions: action.recovery2Questions }
    }
    case 'FETCH_RECOVERY_2_QUESTIONS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useFetchRecovery2Questions = (
  context,
  recovery2Key,
  username
) => {
  const [state, dispatch] = react.useReducer(reducer$z, initialState$z);

  const fetchRecovery2Questions = () => {
    if (!context || !recovery2Key || !username) return
    dispatch({ type: 'FETCH_RECOVERY_2_QUESTIONS_START' });
    context
      .fetchRecovery2Questions(recovery2Key, username)
      .then(recovery2Questions => dispatch({ type: 'FETCH_RECOVERY_2_QUESTIONS_SUCCESS', recovery2Questions }))
      .catch((error) => dispatch({ type: 'FETCH_RECOVERY_2_QUESTIONS_ERROR', error }));
  };

  return { ...state, fetchRecovery2Questions }
};

// 

const useFiatCurrencyCode = (wallet) => {
  const [fiatCurrencyCode, setFiatCurrencyCode] = react.useState(null);

  const effect = () => {
    if (!wallet) return // mount with null
    setFiatCurrencyCode(wallet.fiatCurrencyCode);
    const unsubscribe = wallet.watch('fiatCurrencyCode', setFiatCurrencyCode); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return fiatCurrencyCode
};

// 




const initialState$A = { pending: false, error: null, username: null };

const reducer$A = (state, action) => {
  switch (action.type) {
    case 'FIX_USERNAME_START': {
      return { ...state, pending: true, error: null, username: null }
    }
    case 'FIX_USERNAME_SUCCESS': {
      return { ...state, pending: false, username: action.username }
    }
    case 'FIX_USERNAME_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useFixUsername = (context, username) => {
  const [state, dispatch] = react.useReducer(reducer$A, initialState$A);

  const fixUsername = () => {
    if (!context || !username) return
    dispatch({ type: 'FIX_USERNAME_START' });
    Promise.resolve(context.fixUsername(username))
      .then((username) => dispatch({ type: 'FIX_USERNAME_SUCCESS', username }))
      .catch((error) => dispatch({ type: 'FIX_USERNAME_ERROR', error }));
  };

  return { ...state, fixUsername }
};

// 


const initialState$B = { pending: false, error: null, paymentProtocolInfo: null };

const reducer$B = (state, action) => {
  switch (action.type) {
    case 'GET_PAYMENT_PROTOCOL_INFO_START': {
      return { ...state, pending: true, error: null }
    }
    case 'GET_PAYMENT_PROTOCOL_INFO_SUCCESS': {
      return { ...state, pending: false, paymentProtocolInfo: action.paymentProtocolInfo }
    }
    case 'GET_PAYMENT_PROTOCOL_INFO_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useGetPaymentProtocolInfo = (
  wallet,
  paymentProtocolUrl
) => {
  const [state, dispatch] = react.useReducer(reducer$B, initialState$B);

  const getPaymentProtocolInfo = () => {
    if (!wallet || !paymentProtocolUrl) return
    dispatch({ type: 'GET_PAYMENT_PROTOCOL_INFO_START' });
    wallet
      .getPaymentProtocolInfo(paymentProtocolUrl)
      .then((paymentProtocolInfo) =>
        dispatch({ type: 'GET_PAYMENT_PROTOCOL_INFO_SUCCESS', paymentProtocolInfo })
      )
      .catch((error) => dispatch({ type: 'GET_PAYMENT_PROTOCOL_INFO_ERROR', error }));
  };

  return { ...state, getPaymentProtocolInfo }
};

// 




const initialState$C = { pending: false, error: null, recovery2Key: null };

const reducer$C = (state, action) => {
  switch (action.type) {
    case 'GET_RECOVERY_2_KEY_START': {
      return { ...state, pending: true, error: null, recovery2Key: null }
    }
    case 'GET_RECOVERY_2_KEY_SUCCESS': {
      return { ...state, pending: false, recovery2Key: action.recovery2Key }
    }
    case 'GET_RECOVERY_2_KEY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useGetRecovery2Key = (context, username) => {
  const [state, dispatch] = react.useReducer(reducer$C, initialState$C);

  const getRecovery2Key = () => {
    if (!context || !username) return
    dispatch({ type: 'GET_RECOVERY_2_KEY_START' });
    context
      .getRecovery2Key(username)
      .then((recovery2Key) => dispatch({ type: 'GET_RECOVERY_2_KEY_SUCCESS', recovery2Key }))
      .catch((error) => dispatch({ type: 'GET_RECOVERY_2_KEY_ERROR', error }));
  };

  return { ...state, getRecovery2Key }
};

// 




const initialState$D = { pending: false, error: null, recoveryQuestionChoices: null };

const reducer$D = (state, action) => {
  switch (action.type) {
    case 'GET_RECOVERY_QUESTIONS_CHOICES_START': {
      return { ...state, pending: true, error: null, recoveryQuestionChoices: null }
    }
    case 'GET_RECOVERY_QUESTIONS_CHOICES_SUCCESS': {
      return { ...state, pending: false, recoveryQuestionChoices: action.recoveryQuestionChoices }
    }
    case 'GET_RECOVERY_QUESTIONS_CHOICES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useListRecoveryQuestionChoices = (context, username) => {
  const [state, dispatch] = react.useReducer(reducer$D, initialState$D);

  const listRecoveryQuestionChoices = () => {
    if (!context || !username) return
    dispatch({ type: 'GET_RECOVERY_QUESTIONS_CHOICES_START' });
    context
      .listRecoveryQuestionChoices()
      .then((recoveryQuestionChoices) =>
        dispatch({ type: 'GET_RECOVERY_QUESTIONS_CHOICES_SUCCESS', recoveryQuestionChoices })
      )
      .catch((error) => dispatch({ type: 'GET_RECOVERY_QUESTIONS_CHOICES_ERROR', error }));
  };

  return { ...state, listRecoveryQuestionChoices }
};

// 




const initialState$E = { pending: false, error: null, usernames: null };

const reducer$E = (state, action) => {
  switch (action.type) {
    case 'READ_USERNAMES_START': {
      return { ...state, pending: true, error: null, usernames: null }
    }
    case 'READ_USERNAMES_SUCCESS': {
      return { ...state, pending: false, usernames: action.usernames }
    }
    case 'READ_USERNAMES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useListUsernames = (context) => {
  const [state, dispatch] = react.useReducer(reducer$E, initialState$E);

  const listUsernames = () => {
    if (!context) return
    dispatch({ type: 'READ_USERNAMES_START' });
    context
      .listUsernames()
      .then((usernames) => dispatch({ type: 'READ_USERNAMES_SUCCESS', usernames }))
      .catch((error) => dispatch({ type: 'READ_USERNAMES_ERROR', error }));
  };

  return { ...state, listUsernames }
};

// 





const initialState$F = { data: null, error: null, pending: false };

const reducer$F = (state, action) => {
  switch (action.type) {
    case 'READ_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_SUCCESS': {
      return { ...state, pending: false, data: action.data }
    }
    case 'READ_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLocalStorageRead = (
  storageContext,
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$F, initialState$F);

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

  return state
};

// 





const initialState$G = { error: null, pending: false };

const reducer$G = (state, action) => {
  switch (action.type) {
    case 'WRITE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'WRITE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'WRITE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLocalStorageWrite = (
  storageContext,
  path,
  data
) => {
  const [state, dispatch] = react.useReducer(reducer$G, initialState$G);

  const setData = () => {
    if (!storageContext || !path || !data) return
    dispatch({ type: 'WRITE_START' });
    storageContext.localDisklet
      .setText(path, JSON.stringify(data))
      .then(() => dispatch({ type: 'WRITE_SUCCESS' }))
      .catch((error) => dispatch({ type: 'WRITE_ERROR', error }));
  };

  return { ...state, setData }
};

// 

const useLocalUsers = (context) => {
  const [localUsers, setLocalUsers] = react.useState(null);

  const effect = () => {
    if (!context) return // mount with null
    setLocalUsers(context.localUsers);
    const unsubscribe = context.watch('localUsers', setLocalUsers); // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [context]); // onUpdate

  return localUsers
};

// 



const initialState$H = { pending: false, error: null };

const reducer$H = (state, action) => {
  switch (action.type) {
    case 'LOCK_RECEIVE_ADDRESS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOCK_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'LOCK_RECEIVE_ADDRESS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLockReceiveAddress = (
  wallet,
  receiveAddress
) => {
  const [state, dispatch] = react.useReducer(reducer$H, initialState$H);

  const lockReceiveAddress = () => {
    if (!wallet || !receiveAddress) return // mount with null
    dispatch({ type: 'LOCK_RECEIVE_ADDRESS_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .lockReceiveAddress(receiveAddress)
      .then(() => dispatch({ type: 'LOCK_RECEIVE_ADDRESS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'LOCK_RECEIVE_ADDRESS_ERROR', error }));
  };

  return { ...state, lockReceiveAddress }
};

// 




const initialState$I = { account: null, error: null, pending: false };

const reducer$I = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLoginWithKey = (
  context,
  username,
  key,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$I, initialState$I);

  const loginWithKey = () => {
    if (!context || !username || !key) return
    dispatch({ type: 'LOGIN_START' });
    context
      .loginWithKey(username, key, options || undefined)
      .then((account) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'LOGIN_ERROR', error }));
  };

  return { ...state, loginWithKey }
};

// 




const initialState$J = { account: null, error: null, pending: false };

const reducer$J = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLoginWithPassword = (
  context,
  username,
  password,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$J, initialState$J);

  const loginWithPassword = () => {
    if (!context || !username || !password) return
    dispatch({ type: 'LOGIN_START' });
    context
      .loginWithPassword(username, password, options || undefined)
      .then((account) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'LOGIN_ERROR', error }));
  };

  return { ...state, loginWithPassword }
};

// 




const initialState$K = { account: null, error: null, pending: false };

const reducer$K = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLoginWithPin = (
  context,
  username,
  pin,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$K, initialState$K);

  const loginWithPin = () => {
    if (!context || !username || !pin) return
    dispatch({ type: 'LOGIN_START' });
    context
      .loginWithPIN(username, pin, options || undefined)
      .then((account) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'LOGIN_ERROR', error }));
  };

  return { ...state, loginWithPin }
};

// 




const initialState$L = { account: null, error: null, pending: false };

const reducer$L = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLoginWithRecovery2 = (
  context,
  recovery2Key,
  username,
  answers,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$L, initialState$L);

  const loginWithRecovery2 = () => {
    if (!context || !recovery2Key || !username || !answers) return
    dispatch({ type: 'LOGIN_START' });
    context
      .loginWithRecovery2(recovery2Key, username, answers, options || undefined)
      .then((account) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'LOGIN_ERROR', error }));
  };

  return { ...state, loginWithRecovery2 }
};

// 




const initialState$M = { error: null, pending: false };

const reducer$M = (state, action) => {
  switch (action.type) {
    case 'LOGOUT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGOUT_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'LOGOUT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useLogout = (account) => {
  const [state, dispatch] = react.useReducer(reducer$M, initialState$M);

  const logout = () => {
    if (!account) return
    dispatch({ type: 'LOGOUT_START' });
    account
      .logout()
      .then(() => dispatch({ type: 'LOGOUT_SUCCESS' }))
      .catch((error) => dispatch({ type: 'LOGOUT_ERROR', error }));
  };

  return { ...state, logout }
};

// 



const initialState$N = { pending: false, error: null };

const reducer$N = (state, action) => {
  switch (action.type) {
    case 'MAKE_SPEND_START': {
      return { ...state, pending: true, error: null }
    }
    case 'MAKE_SPEND_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'MAKE_SPEND_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useMakeSpend = (wallet, spendInfo) => {
  const [state, dispatch] = react.useReducer(reducer$N, initialState$N);

  const makeSpend = () => {
    if (!wallet || !spendInfo) return
    dispatch({ type: 'MAKE_SPEND_START' });
    wallet
      .makeSpend(spendInfo)
      .then((transaction) => dispatch({ type: 'MAKE_SPEND_SUCCESS', transaction }))
      .catch((error) => dispatch({ type: 'MAKE_SPEND_ERROR', error }));
  };

  return { ...state, makeSpend }
};

// 




const initialState$O = { pending: false, error: null, maxSpendable: null };

const reducer$O = (state, action) => {
  switch (action.type) {
    case 'GET_MAX_SPENDABLE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'GET_MAX_SPENDABLE_SUCCESS': {
      return { ...state, pending: false, maxSpendable: action.maxSpendable }
    }
    case 'GET_MAX_SPENDABLE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useMaxSpendable = (wallet, spendInfo) => {
  const [state, dispatch] = react.useReducer(reducer$O, initialState$O);

  const getMaxSpendable = () => {
    if (!wallet || !spendInfo) return // mount with null
    dispatch({ type: 'GET_MAX_SPENDABLE_START' });
    wallet
      .getMaxSpendable(spendInfo)
      .then((maxSpendable) => dispatch({ type: 'GET_MAX_SPENDABLE_SUCCESS', maxSpendable }))
      .catch((error) => dispatch({ type: 'GET_MAX_SPENDABLE_ERROR', error }));
  };

  return { ...state, getMaxSpendable }
};

// 


const useName = (wallet) => {
  const [name, setName] = react.useState(wallet ? wallet.name : null);

  const effect = () => {
    if (!wallet) return // mount with null
    setName(wallet.name); // mount with wallet / null -> wallet / walletA -> walletB (2)
    const unsubscribe = wallet.watch('name', setName); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return name
};

// 


const useOtpKey = (account) => {
  const [otpKey, setOtpKey] = react.useState(account ? account.otpKey : null);

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
  const [otpResetDate, setOtpResetDate] = react.useState(account ? account.otpResetDate : null);

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



const initialState$P = { pending: false, error: null, uri: null };

const reducer$P = (state, action) => {
  switch (action.type) {
    case 'PARSE_URI_START': {
      return { ...state, pending: true, error: null }
    }
    case 'PARSE_URI_SUCCESS': {
      return { ...state, pending: false, uri: action.uri }
    }
    case 'PARSE_URI_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useParseUri = (wallet, uri) => {
  const [state, dispatch] = react.useReducer(reducer$P, initialState$P);

  const parseUri = () => {
    if (!wallet || !uri) return // mount with null
    dispatch({ type: 'PARSE_URI_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .parseUri(uri)
      .then((uri) => dispatch({ type: 'PARSE_URI_SUCCESS', uri }))
      .catch((error) => dispatch({ type: 'PARSE_URI_ERROR', error }));
  };

  return { ...state, parseUri }
};

// 




const initialState$Q = { pending: false, error: null, receiveAddress: null };

const reducer$Q = (state, action) => {
  switch (action.type) {
    case 'READ_RECEIVE_ADDRESS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, pending: false, receiveAddress: action.receiveAddress }
    }
    case 'READ_RECEIVE_ADDRESS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useReceiveAddress = (
  wallet,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$Q, initialState$Q);

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_RECEIVE_ADDRESS_START' });
    wallet
      .getReceiveAddress(options || undefined)
      .then((receiveAddress) => dispatch({ type: 'READ_RECEIVE_ADDRESS_SUCCESS', receiveAddress }))
      .catch((error) => dispatch({ type: 'READ_RECEIVE_ADDRESS_ERROR', error }));

    const unsubscribe = wallet.on('newTransactions', () => {
      if (!wallet) return
      dispatch({ type: 'READ_RECEIVE_ADDRESS_START' });
      wallet
        .getReceiveAddress(options || undefined)
        .then((receiveAddress) =>
          dispatch({ type: 'READ_RECEIVE_ADDRESS_SUCCESS', receiveAddress })
        )
        .catch((error) => dispatch({ type: 'READ_RECEIVE_ADDRESS_ERROR', error }));
    }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return state
};

// 



const initialState$R = { pending: false, error: null };

const reducer$R = (state, action) => {
  switch (action.type) {
    case 'RENAME_START': {
      return { ...state, pending: true, error: null }
    }
    case 'RENAME_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'RENAME_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useRename = (wallet, name) => {
  const [state, dispatch] = react.useReducer(reducer$R, initialState$R);

  const rename = () => {
    if (!wallet || !name) return
    dispatch({ type: 'RENAME_START' });
    wallet
      .renameWallet(name)
      .then(() => dispatch({ type: 'RENAME_SUCCESS' }))
      .catch((error) => dispatch({ type: 'RENAME_ERROR', error }));
  };

  return { ...state, rename }
};

// 




const initialState$S = { pending: false, error: null, pendingLogin: null };

const reducer$S = (state, action) => {
  switch (action.type) {
    case 'REQUEST_EDGE_LOGIN_START': {
      return { ...state, pending: true, error: null, pendingLogin: null }
    }
    case 'REQUEST_EDGE_LOGIN_SUCCESS': {
      return { ...state, pending: false, pendingLogin: action.pendingLogin }
    }
    case 'REQUEST_EDGE_LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useRequestEdgeLogin = (
  context,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$S, initialState$S);

  const requestEdgeLogin = () => {
    if (!context || !options) return
    dispatch({ type: 'REQUEST_EDGE_LOGIN_START' });
    context
      .requestEdgeLogin(options)
      .then((pendingLogin) => dispatch({ type: 'REQUEST_EDGE_LOGIN_SUCCESS', pendingLogin }))
      .catch((error) => dispatch({ type: 'REQUEST_EDGE_LOGIN_ERROR', error }));
  };

  return { ...state, requestEdgeLogin }
};

// 




const initialState$T = { pending: false, error: null };

const reducer$T = (state, action) => {
  switch (action.type) {
    case 'REQUEST_OTP_RESET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'REQUEST_OTP_RESET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'REQUEST_OTP_RESET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useRequestOtpReset = (
  context,
  username,
  otpResetToken
) => {
  const [state, dispatch] = react.useReducer(reducer$T, initialState$T);

  const requestOtpReset = () => {
    if (!context || !username || !otpResetToken) return
    dispatch({ type: 'REQUEST_OTP_RESET_START' });
    context
      .requestOtpReset(username, otpResetToken)
      .then((resetDate) => dispatch({ type: 'REQUEST_OTP_RESET_SUCCESS' }))
      .catch((error) => dispatch({ type: 'REQUEST_OTP_RESET_ERROR', error }));
  };

  return { ...state, requestOtpReset }
};

// 



const initialState$U = { pending: false, error: null };

const reducer$U = (state, action) => {
  switch (action.type) {
    case 'RESYNC_START': {
      return { ...state, pending: true, error: null }
    }
    case 'RESYNC_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'RESYNC_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useResyncBlockchain = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$U, initialState$U);

  const resyncBlockchain = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'RESYNC_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .resyncBlockchain()
      .then(() => dispatch({ type: 'RESYNC_SUCCESS' }))
      .catch((error) => dispatch({ type: 'RESYNC_ERROR', error }));
  };

  return { ...state, resyncBlockchain }
};

// 



const initialState$V = { pending: false, error: null };

const reducer$V = (state, action) => {
  switch (action.type) {
    case 'SAVE_RECEIVE_ADDRESS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SAVE_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SAVE_RECEIVE_ADDRESS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSaveReceiveAddress = (
  wallet,
  receiveAddress
) => {
  const [state, dispatch] = react.useReducer(reducer$V, initialState$V);

  const saveReceiveAddress = () => {
    if (!wallet || !receiveAddress) return // mount with null
    dispatch({ type: 'SAVE_RECEIVE_ADDRESS_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .saveReceiveAddress(receiveAddress)
      .then(() => dispatch({ type: 'SAVE_RECEIVE_ADDRESS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SAVE_RECEIVE_ADDRESS_ERROR', error }));
  };

  return { ...state, saveReceiveAddress }
};

// 



const initialState$W = { pending: false, error: null };

const reducer$W = (state, action) => {
  switch (action.type) {
    case 'SAVE_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SAVE_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SAVE_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSaveTransaction = (
  wallet,
  transaction
) => {
  const [state, dispatch] = react.useReducer(reducer$W, initialState$W);

  const saveTransaction = () => {
    if (!wallet || !transaction) return // mount with null
    dispatch({ type: 'SAVE_TRANSACTION_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .saveTx(transaction)
      .then(() => dispatch({ type: 'SAVE_TRANSACTION_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SAVE_TRANSACTION_ERROR', error }));
  };

  return { ...state, saveTransaction }
};

// 



const initialState$X = { pending: false, error: null };

const reducer$X = (state, action) => {
  switch (action.type) {
    case 'SAVE_TRANSACTION_METADATA_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SAVE_TRANSACTION_METADATA_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SAVE_TRANSACTION_METADATA_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSaveTransactionMetadata = (
  wallet,
  txid,
  currencyCode,
  metadata
) => {
  const [state, dispatch] = react.useReducer(reducer$X, initialState$X);

  const saveTransactionMetadata = () => {
    if (!wallet || !txid || !currencyCode || !metadata) return
    dispatch({ type: 'SAVE_TRANSACTION_METADATA_START' });
    wallet
      .saveTxMetadata(txid, currencyCode, metadata)
      .then(() => dispatch({ type: 'SAVE_TRANSACTION_METADATA_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SAVE_TRANSACTION_METADATA_ERROR', error }));
  };

  return { ...state, saveTransactionMetadata }
};

// 



const initialState$Y = { pending: false, error: null };

const reducer$Y = (state, action) => {
  switch (action.type) {
    case 'WRITE_FIAT_CURRENCY_CODE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'WRITE_FIAT_CURRENCY_CODE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'WRITE_FIAT_CURRENCY_CODE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSetFiatCurrencyCode = (
  wallet,
  fiatCurrencyCode
) => {
  const [state, dispatch] = react.useReducer(reducer$Y, initialState$Y);

  const setFiatCurrencyCode = () => {
    if (!wallet || !fiatCurrencyCode) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' });
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(() => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS' }))
      .catch((error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error }));
  };

  return { ...state, setFiatCurrencyCode }
};

// 



const initialState$Z = { pending: false, error: null };

const reducer$Z = (state, action) => {
  switch (action.type) {
    case 'SBS_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SBS_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SBS_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSignBroadcastAndSaveTransaction = (
  wallet,
  transaction
) => {
  const [state, dispatch] = react.useReducer(reducer$Z, initialState$Z);

  const signBroadcastAndSaveTransaction = () => {
    if (!wallet || !transaction) return
    dispatch({ type: 'SBS_TRANSACTION_START' });
    Promise.resolve(transaction)
      .then(signTx(wallet))
      .then(broadcastTx(wallet))
      .then(saveTx(wallet))
      .then(() => dispatch({ type: 'SBS_TRANSACTION_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SBS_TRANSACTION_ERROR', error }));
  };

  return { ...state, signBroadcastAndSaveTransaction }
};

const signTx = (wallet) => (transaction) => {
  return wallet.signTx(transaction).then(() => transaction)
};
const broadcastTx = (wallet) => (transaction) => {
  return wallet.broadcastTx(transaction).then(() => transaction)
};
const saveTx = (wallet) => (transaction) => {
  return wallet.saveTx(transaction).then(() => transaction)
};

// 



const initialState$_ = { pending: false, error: null };

const reducer$_ = (state, action) => {
  switch (action.type) {
    case 'SIGN_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SIGN_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SIGN_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSignTransaction = (
  wallet,
  transaction
) => {
  const [state, dispatch] = react.useReducer(reducer$_, initialState$_);

  const signTransaction = () => {
    if (!wallet || !transaction) return // mount with null
    dispatch({ type: 'SIGN_TRANSACTION_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .signTx(transaction)
      .then(() => dispatch({ type: 'SIGN_TRANSACTION_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SIGN_TRANSACTION_ERROR', error }));
  };

  return { ...state, signTransaction }
};

// 



const initialState$10 = { pending: false, error: null };

const reducer$10 = (state, action) => {
  switch (action.type) {
    case 'START_ENGINE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'START_ENGINE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'START_ENGINE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useStartEngine = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$10, initialState$10);

  const startEngine = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'START_ENGINE_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .startEngine()
      .then(() => dispatch({ type: 'START_ENGINE_SUCCESS' }))
      .catch((error) => dispatch({ type: 'START_ENGINE_ERROR', error }));
  };

  return { ...state, startEngine }
};

// 



const initialState$11 = { pending: false, error: null };

const reducer$11 = (state, action) => {
  switch (action.type) {
    case 'STOP_ENGINE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'STOP_ENGINE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'STOP_ENGINE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useStopEngine = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$11, initialState$11);

  const stopEngine = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'STOP_ENGINE_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .stopEngine()
      .then(() => dispatch({ type: 'STOP_ENGINE_SUCCESS' }))
      .catch((error) => dispatch({ type: 'STOP_ENGINE_ERROR', error }));
  };

  return { ...state, stopEngine }
};

// 



const initialState$12 = { pending: false, error: null };

const reducer$12 = (state, action) => {
  switch (action.type) {
    case 'SWEEP_PRIVATE_KEYS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SWEEP_PRIVATE_KEYS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SWEEP_PRIVATE_KEYS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSweepPrivateKeys = (
  wallet,
  spendInfo
) => {
  const [state, dispatch] = react.useReducer(reducer$12, initialState$12);

  const sweepPrivateKeys = () => {
    if (!wallet || !spendInfo) return // mount with null
    dispatch({ type: 'SWEEP_PRIVATE_KEYS_START' }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .sweepPrivateKeys(spendInfo)
      .then(() => dispatch({ type: 'SWEEP_PRIVATE_KEYS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SWEEP_PRIVATE_KEYS_ERROR', error }));
  };

  return { ...state, sweepPrivateKeys }
};

// 



const initialState$13 = { pending: false, error: null };

const reducer$13 = (state, action) => {
  switch (action.type) {
    case 'SYNC_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SYNC_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SYNC_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSync = (storageContext) => {
  const [state, dispatch] = react.useReducer(reducer$13, initialState$13);

  const sync = () => {
    if (!storageContext) return // mount with null
    dispatch({ type: 'SYNC_START' }); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB (2)
    storageContext
      .sync()
      .then(() => dispatch({ type: 'SYNC_SUCCESS' }))
      .catch((error) => dispatch({ type: 'SYNC_ERROR', error }));
  };

  return { ...state, sync }
};

// 




const initialState$14 = { data: null, error: null, pending: false };

const reducer$14 = (state, action) => {
  switch (action.type) {
    case 'READ_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_SUCCESS': {
      return { ...state, pending: false, data: action.data }
    }
    case 'READ_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSyncedStorageRead = (
  storageContext,
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$14, initialState$14);

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

  return state
};

// 




const initialState$15 = { error: null, pending: false };

const reducer$15 = (state, action) => {
  switch (action.type) {
    case 'WRITE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'WRITE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'WRITE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useSyncedStorageWrite = (
  storageContext,
  path,
  data
) => {
  const [state, dispatch] = react.useReducer(reducer$15, initialState$15);

  const setData = () => {
    if (!storageContext || !path || !data) return
    dispatch({ type: 'WRITE_START' });
    storageContext.disklet
      .setText(path, JSON.stringify(data))
      .then(() => dispatch({ type: 'WRITE_SUCCESS' }))
      .catch((error) => dispatch({ type: 'WRITE_ERROR', error }));
  };

  return { ...state, setData }
};

// 


const useSyncRatio = (wallet) => {
  const [syncRatio, setSyncRatio] = react.useState(wallet ? wallet.syncRatio : null);

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



const initialState$16 = { pending: false, error: null, transactionCount: null };

const reducer$16 = (state, action) => {
  switch (action.type) {
    case 'READ_TRANSACTION_COUNT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_TRANSACTION_COUNT_SUCCESS': {
      return { ...state, pending: false, transactionCount: action.transactionCount }
    }
    case 'READ_TRANSACTION_COUNT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useTransactionCount = (
  wallet,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$16, initialState$16);

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_TRANSACTION_COUNT_START' });
    wallet
      .getNumTransactions(options || undefined)
      .then((transactionCount) => dispatch({ type: 'READ_TRANSACTION_COUNT_SUCCESS', transactionCount }))
      .catch((error) => dispatch({ type: 'READ_TRANSACTION_COUNT_ERROR', error }));

    const unsubscribe = wallet.on('newTransactions', () => {
      if (!wallet) return
      dispatch({ type: 'READ_TRANSACTION_COUNT_START' });
      wallet
        .getNumTransactions(options || undefined)
        .then((transactionCount) => dispatch({ type: 'READ_TRANSACTION_COUNT_SUCCESS', transactionCount }))
        .catch((error) => dispatch({ type: 'READ_TRANSACTION_COUNT_ERROR', error }));
    }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state }
};

// 




const initialState$17 = { pending: false, error: null, transactions: null };

const reducer$17 = (state, action) => {
  switch (action.type) {
    case 'READ_TRANSACTIONS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_TRANSACTIONS_SUCCESS': {
      return { ...state, pending: false, transactions: action.transactions }
    }
    case 'READ_TRANSACTIONS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useTransactions = (
  wallet,
  options
) => {
  const [state, dispatch] = react.useReducer(reducer$17, initialState$17);

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_TRANSACTIONS_START' });
    wallet
      .getTransactions(options || undefined)
      .then((transactions) => dispatch({ type: 'READ_TRANSACTIONS_SUCCESS', transactions }))
      .catch((error) => dispatch({ type: 'READ_TRANSACTIONS_ERROR', error }));

    const unsubscribe = wallet.on('newTransactions', () => {
      if (!wallet) return
      dispatch({ type: 'READ_TRANSACTIONS_START' });
      wallet
        .getTransactions(options || undefined)
        .then((transactions) => dispatch({ type: 'READ_TRANSACTIONS_SUCCESS', transactions }))
        .catch((error) => dispatch({ type: 'READ_TRANSACTIONS_ERROR', error }));
    }); // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  react.useEffect(effect, []); // onMount
  react.useEffect(effect, [wallet]); // onUpdate

  return { ...state }
};

// 




const initialState$18 = { pending: false, error: null, passwordStatus: null };

const reducer$18 = (state, action) => {
  switch (action.type) {
    case 'VALIDATE_PASSWORD_START': {
      return { ...state, pending: true, error: null, passwordStatus: null }
    }
    case 'VALIDATE_PASSWORD_SUCCESS': {
      return { ...state, pending: false, passwordStatus: action.passwordStatus }
    }
    case 'VALIDATE_PASSWORD_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
};

const useValidatePassword = (context, password) => {
  const [state, dispatch] = react.useReducer(reducer$18, initialState$18);

  const validatePassword = () => {
    if (!context || !password) return
    dispatch({ type: 'VALIDATE_PASSWORD_START' });
    Promise.resolve(context.checkPasswordRules(password))
      .then((passwordStatus) => dispatch({ type: 'VALIDATE_PASSWORD_SUCCESS', passwordStatus }))
      .catch((error) => dispatch({ type: 'VALIDATE_PASSWORD_ERROR', error }));
  };

  return { ...state, validatePassword }
};

//

exports.useActivateWallet = useActivateWallet;
exports.useActiveWalletIds = useActiveWalletIds;
exports.useAddCustomToken = useAddCustomToken;
exports.useAllKeys = useAllKeys;
exports.useArchivedWalletIds = useArchivedWalletIds;
exports.useArchiveWallet = useArchiveWallet;
exports.useBalances = useBalances;
exports.useBlockHeight = useBlockHeight;
exports.useBroadcastTransaction = useBroadcastTransaction;
exports.useCancelOtpReset = useCancelOtpReset;
exports.useChangePassword = useChangePassword;
exports.useChangePin = useChangePin;
exports.useChangeRecovery = useChangeRecovery;
exports.useChangeWalletStates = useChangeWalletStates;
exports.useCheckPassword = useCheckPassword;
exports.useCheckPin = useCheckPin;
exports.useCheckPinLoginEnabled = useCheckPinLoginEnabled;
exports.useCheckUsernameAvailability = useCheckUsernameAvailability;
exports.useConvertCurrency = useConvertCurrency;
exports.useCreateAccount = useCreateAccount;
exports.useCreateCurrencyWallet = useCreateCurrencyWallet;
exports.useCreateWallet = useCreateWallet;
exports.useCurrencyWallets = useCurrencyWallets;
exports.useDataDump = useDataDump;
exports.useDeletedWalletIds = useDeletedWalletIds;
exports.useDeleteLocalUser = useDeleteLocalUser;
exports.useDeletePassword = useDeletePassword;
exports.useDeletePin = useDeletePin;
exports.useDeleteRecovery = useDeleteRecovery;
exports.useDeleteWallet = useDeleteWallet;
exports.useDisableOtp = useDisableOtp;
exports.useDisablePinLogin = useDisablePinLogin;
exports.useDisableTokens = useDisableTokens;
exports.useEnabledTokens = useEnabledTokens;
exports.useEnableOtp = useEnableOtp;
exports.useEnablePinLogin = useEnablePinLogin;
exports.useEnableTokens = useEnableTokens;
exports.useEncodeUri = useEncodeUri;
exports.useExportToCsv = useExportToCsv;
exports.useExportToQbo = useExportToQbo;
exports.useFetchLobby = useFetchLobby;
exports.useFetchLoginMessages = useFetchLoginMessages;
exports.useFetchRecovery2Questions = useFetchRecovery2Questions;
exports.useFiatCurrencyCode = useFiatCurrencyCode;
exports.useFixUsername = useFixUsername;
exports.useGetPaymentProtocolInfo = useGetPaymentProtocolInfo;
exports.useGetRecovery2Key = useGetRecovery2Key;
exports.useListRecoveryQuestionChoices = useListRecoveryQuestionChoices;
exports.useListUsernames = useListUsernames;
exports.useLocalStorageRead = useLocalStorageRead;
exports.useLocalStorageWrite = useLocalStorageWrite;
exports.useLocalUsers = useLocalUsers;
exports.useLockReceiveAddress = useLockReceiveAddress;
exports.useLoginWithKey = useLoginWithKey;
exports.useLoginWithPassword = useLoginWithPassword;
exports.useLoginWithPin = useLoginWithPin;
exports.useLoginWithRecovery2 = useLoginWithRecovery2;
exports.useLogout = useLogout;
exports.useMakeSpend = useMakeSpend;
exports.useMaxSpendable = useMaxSpendable;
exports.useName = useName;
exports.useOtpKey = useOtpKey;
exports.useOtpResetDate = useOtpResetDate;
exports.useParseUri = useParseUri;
exports.useReceiveAddress = useReceiveAddress;
exports.useRename = useRename;
exports.useRequestEdgeLogin = useRequestEdgeLogin;
exports.useRequestOtpReset = useRequestOtpReset;
exports.useResyncBlockchain = useResyncBlockchain;
exports.useSaveReceiveAddress = useSaveReceiveAddress;
exports.useSaveTransaction = useSaveTransaction;
exports.useSaveTransactionMetadata = useSaveTransactionMetadata;
exports.useSetFiatCurrencyCode = useSetFiatCurrencyCode;
exports.useSignBroadcastAndSaveTransaction = useSignBroadcastAndSaveTransaction;
exports.useSignTransaction = useSignTransaction;
exports.useStartEngine = useStartEngine;
exports.useStopEngine = useStopEngine;
exports.useSweepPrivateKeys = useSweepPrivateKeys;
exports.useSync = useSync;
exports.useSyncedStorageRead = useSyncedStorageRead;
exports.useSyncedStorageWrite = useSyncedStorageWrite;
exports.useSyncRatio = useSyncRatio;
exports.useTransactionCount = useTransactionCount;
exports.useTransactions = useTransactions;
exports.useValidatePassword = useValidatePassword;
//# sourceMappingURL=index.js.map
