'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('edge-core-js');
var react = require('react');

// 


const useActiveWalletIds = (account) => {
  const [activeWalletIds, setActiveWalletIds] = react.useState(account ? account.activeWalletIds : null);

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




const initialState: State = { pending: false, error: null };

const reducer = (state, action) => {
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

const useAddCustomToken = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer, initialState);

  const addCustomToken = (tokenInfo) => {
    if (!wallet) return
    dispatch({ type: 'ADD_CUSTOM_TOKEN_START' });
    wallet
      .addCustomToken(tokenInfo)
      .then(() => dispatch({ type: 'ADD_CUSTOM_TOKEN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ADD_CUSTOM_TOKEN_ERROR', error }));
  };

  return { ...state, addCustomToken }
};

// 


const useArchivedWalletIds = (account) => {
  const [archivedWalletIds, setArchivedWalletIds] = react.useState(
    account ? account.activeWalletIds : null
  );

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
  const [balances, setBalances] = react.useState(wallet ? wallet.balances : null);

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
  const [blockHeight, setBlockHeight] = react.useState(wallet ? wallet.blockHeight : null);

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




const initialState$1 = { pending: false, error: null };

const reducer$1 = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$1, initialState$1);

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




const initialState$2 = { pending: false, error: null };

const reducer$2 = (state, action) => {
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

const useChangePassword = (account) => {
  const [state, dispatch] = react.useReducer(reducer$2, initialState$2);

  const changePassword = (password) => {
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




const initialState$3 = { error: null, pending: false };

const reducer$3 = (state, action) => {
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

const useChangePin = (account) => {
  const [state, dispatch] = react.useReducer(reducer$3, initialState$3);

  const changePin = (pin) => {
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




const initialState$4 = { pending: false, error: null, passwordVerified: null };

const reducer$4 = (state, action) => {
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

const useCheckPassword = (account) => {
  const [state, dispatch] = react.useReducer(reducer$4, initialState$4);

  const checkPassword = (password) => {
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




const initialState$5 = { error: null, pending: false, pinVerified: null };

const reducer$5 = (state, action) => {
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

const useCheckPin = (account) => {
  const [state, dispatch] = react.useReducer(reducer$5, initialState$5);

  const checkPin = (pin) => {
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



const initialState$6 = { amount: null, pending: false, error: null };

const reducer$6 = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$6, initialState$6);

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
  react.useEffect(effect, [account]); // onUpdate

  return state
};

// 



const initialState$7 = { account: null, error: null, pending: false };

const reducer$7 = (state, action) => {
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

const useCreateAccount = (context) => {
  const [state, dispatch] = react.useReducer(reducer$7, initialState$7);

  const createAccount = (username, password, pin, options) => {
    if (!context) return
    dispatch({ type: 'CREATE_ACCOUNT_START' });
    context
      .createAccount(username, password, pin, options)
      .then((account) => dispatch({ type: 'CREATE_ACCOUNT_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'CREATE_ACCOUNT_ERROR', error }));
  };

  return { ...state, createAccount }
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



const initialState$8 = { dataDump: null, error: null, pending: false };

const reducer$8 = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$8, initialState$8);

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




const initialState$9 = { pending: false, error: null };

const reducer$9 = (state, action) => {
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

const useDeleteLocalUser = (context) => {
  const [state, dispatch] = react.useReducer(reducer$9, initialState$9);

  const deleteLocalUser = (username) => {
    if (!context) return
    dispatch({ type: 'DELETE_LOCAL_USER_START' });
    context
      .deleteLocalAccount(username)
      .then(() => dispatch({ type: 'DELETE_LOCAL_USER_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_LOCAL_USER_ERROR', error }));
  };

  return { ...state, deleteLocalUser }
};

// 




const initialState$a = { pending: false, error: null };

const reducer$a = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$a, initialState$a);

  const deletePassword = (password) => {
    if (!account || !password) return
    dispatch({ type: 'DELETE_PASSWORD_START' });
    account
      .deletePassword()
      .then(() => dispatch({ type: 'DELETE_PASSWORD_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_PASSWORD_ERROR', error }));
  };

  return { ...state, deletePassword }
};

// 




const initialState$b = { pending: false, error: null };

const reducer$b = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$b, initialState$b);

  const enablePinLogin = () => {
    if (!account) return
    dispatch({ type: 'DELETE_PIN_START' });
    account
      .deletePin()
      .then(() => dispatch({ type: 'DELETE_PIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_PIN_ERROR', error }));
  };

  return { ...state, enablePinLogin }
};

// 




const initialState$c = { error: null, pending: false };

const reducer$c = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$c, initialState$c);

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




const initialState$d = { error: null, pending: false };

const reducer$d = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$d, initialState$d);

  const disablePinLogin = (pin) => {
    if (!account || !pin) return
    dispatch({ type: 'DISABLE_PIN_LOGIN_START' });
    account
      .changePin({ enableLogin: false })
      .then(() => dispatch({ type: 'DISABLE_PIN_LOGIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DISABLE_PIN_LOGIN_ERROR', error }));
  };

  return { ...state, disablePinLogin }
};

// 




const initialState$e = { pending: false, error: null };

const reducer$e = (state, action) => {
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

const useDisableTokens = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$e, initialState$e);

  const disableTokens = (tokens) => {
    if (!wallet) return
    dispatch({ type: 'DISABLE_TOKENS_START' });
    wallet
      .disableTokens(tokens)
      .then(() => dispatch({ type: 'DISABLE_TOKENS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DISABLE_TOKENS_ERROR', error }));
  };

  return { ...state, disableTokens }
};

// 




const initialState$f = { enabledTokens: null, error: null, pending: false };

const reducer$f = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$f, initialState$f);

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




const initialState$g = { error: null, pending: false };

const reducer$g = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$g, initialState$g);

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




const initialState$h = { error: null, pending: false };

const reducer$h = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$h, initialState$h);

  const enablePinLogin = (pin) => {
    if (!account || !pin) return
    dispatch({ type: 'ENABLE_PIN_LOGIN_START' });
    account
      .changePin({ enableLogin: true })
      .then(() => dispatch({ type: 'ENABLE_PIN_LOGIN_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ENABLE_PIN_LOGIN_ERROR', error }));
  };

  return { ...state, enablePinLogin }
};

// 




const initialState$i = { pending: false, error: null };

const reducer$i = (state, action) => {
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

const useEnableTokens = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$i, initialState$i);

  const disableTokens = (tokens) => {
    if (!wallet) return
    dispatch({ type: 'ENABLE_TOKENS_START' });
    wallet
      .enableTokens(tokens)
      .then(() => dispatch({ type: 'ENABLE_TOKENS_SUCCESS' }))
      .catch((error) => dispatch({ type: 'ENABLE_TOKENS_ERROR', error }));
  };

  return { ...state, disableTokens }
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





const initialState$j = { data: null, error: null, pending: false };

const reducer$j = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$j, initialState$j);

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





const initialState$k = { error: null, pending: false };

const reducer$k = (state, action) => {
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
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$k, initialState$k);

  const setData = (data) => {
    if (!storageContext || !path) return
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




const initialState$l = { account: null, error: null, pending: false };

const reducer$l = (state, action) => {
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

const useLoginWithPassword = (context) => {
  const [state, dispatch] = react.useReducer(reducer$l, initialState$l);

  const loginWithPassword = (username, password, options) => {
    if (!context) return
    dispatch({ type: 'LOGIN_START' });
    context
      .loginWithPassword(username, password, options)
      .then((account) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error) => dispatch({ type: 'LOGIN_ERROR', error }));
  };

  return { ...state, loginWithPassword }
};

// 




const initialState$m = { error: null, pending: false };

const reducer$m = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$m, initialState$m);

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




const initialState$n = { pending: false, error: null, receiveAddress: null };

const reducer$n = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$n, initialState$n);

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






const initialState$o = {
  changeRecoveryError: null,
  changeRecoveryPending: false,
  deleteRecoveryError: null,
  deleteRecoveryPending: false
};

const reducer$o = (state, action) => {
  switch (action.type) {
    case 'CHANGE_RECOVERY_START': {
      return { ...state, changeRecoveryPending: true, changeRecoveryError: null }
    }
    case 'DELETE_RECOVERY_START': {
      return { ...state, deleteRecoveryPending: true, deleteRecoveryError: null }
    }

    case 'CHANGE_RECOVERY_SUCCESS': {
      return { ...state, changeRecoveryPending: false }
    }
    case 'DELETE_RECOVERY_SUCCESS': {
      return { ...state, deleteRecoveryPending: false }
    }

    case 'CHANGE_RECOVERY_ERROR': {
      return { ...state, changeRecoveryPending: true, changeRecoveryError: action.error }
    }
    case 'DELETE_RECOVERY_ERROR': {
      return { ...state, deleteRecoveryPending: true, deleteRecoveryError: action.error }
    }

    default:
      return state
  }
};

const useRecovery = (account) => {
  const [state, dispatch] = react.useReducer(reducer$o, initialState$o);

  const changeRecovery = (questions, answers) => {
    if (!account || !questions || !answers) return
    dispatch({ type: 'CHANGE_RECOVERY_START' });
    account
      .changeRecovery(questions, answers)
      .then(() => dispatch({ type: 'CHANGE_RECOVERY_SUCCESS' }))
      .catch((error) => dispatch({ type: 'CHANGE_RECOVERY_ERROR', error }));
  };

  const deleteRecovery = () => {
    if (!account) return
    dispatch({ type: 'DELETE_RECOVERY_START' });
    account
      .deleteRecovery()
      .then(() => dispatch({ type: 'DELETE_RECOVERY_SUCCESS' }))
      .catch((error) => dispatch({ type: 'DELETE_RECOVERY_ERROR', error }));
  };

  return { ...state, changeRecovery, deleteRecovery }
};

// 



const initialState$p = { pending: false, error: null };

const reducer$p = (state, action) => {
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

const useRename = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$p, initialState$p);

  const rename = (name) => {
    if (!wallet) return
    dispatch({ type: 'RENAME_START' });
    wallet
      .renameWallet(name)
      .then(() => dispatch({ type: 'RENAME_SUCCESS', name }))
      .catch((error) => dispatch({ type: 'RENAME_ERROR', error }));
  };

  return { ...state, rename }
};

// 



const initialState$q = { pending: false, error: null };

const reducer$q = (state, action) => {
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

const useSetFiatCurrencyCode = (wallet) => {
  const [state, dispatch] = react.useReducer(reducer$q, initialState$q);

  const setFiatCurrencyCode = (fiatCurrencyCode) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' });
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(() => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode }))
      .catch((error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error }));
  };

  return { ...state, setFiatCurrencyCode }
};

// 



const initialState$r = { pending: false, error: null };

const reducer$r = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$r, initialState$r);

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



const initialState$s = { pending: false, error: null };

const reducer$s = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$s, initialState$s);

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



const initialState$t = { pending: false, error: null };

const reducer$t = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$t, initialState$t);

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




const initialState$u = { data: null, error: null, pending: false };

const reducer$u = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$u, initialState$u);

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




const initialState$v = { error: null, pending: false };

const reducer$v = (state, action) => {
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
  path
) => {
  const [state, dispatch] = react.useReducer(reducer$v, initialState$v);

  const setData = (data) => {
    if (!storageContext || !path) return
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



const initialState$w = { pending: false, error: null, transactionCount: null };

const reducer$w = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$w, initialState$w);

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




const initialState$x = { pending: false, error: null, transactions: null };

const reducer$x = (state, action) => {
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
  const [state, dispatch] = react.useReducer(reducer$x, initialState$x);

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

exports.useSetFiatCurrencyCode = useSetFiatCurrencyCode;
exports.useRename = useRename;
exports.useLogout = useLogout;
exports.useEnableTokens = useEnableTokens;
exports.useEnablePinLogin = useEnablePinLogin;
exports.useEnableOtp = useEnableOtp;
exports.useDisableTokens = useDisableTokens;
exports.useDisablePinLogin = useDisablePinLogin;
exports.useDisableOtp = useDisableOtp;
exports.useAddCustomToken = useAddCustomToken;
exports.useDeleteLocalUser = useDeleteLocalUser;
exports.useActiveWalletIds = useActiveWalletIds;
exports.useArchivedWalletIds = useArchivedWalletIds;
exports.useCancelOtpReset = useCancelOtpReset;
exports.useDeletedWalletIds = useDeletedWalletIds;
exports.useLocalUsers = useLocalUsers;
exports.useOtpKey = useOtpKey;
exports.useOtpResetDate = useOtpResetDate;
exports.useLocalStorageRead = useLocalStorageRead;
exports.useLocalStorageWrite = useLocalStorageWrite;
exports.useSyncedStorageRead = useSyncedStorageRead;
exports.useSyncedStorageWrite = useSyncedStorageWrite;
exports.useFiatCurrencyCode = useFiatCurrencyCode;
exports.useBalances = useBalances;
exports.useName = useName;
exports.useDataDump = useDataDump;
exports.useBlockHeight = useBlockHeight;
exports.useSyncRatio = useSyncRatio;
exports.useSync = useSync;
exports.useEnabledTokens = useEnabledTokens;
exports.useCurrencyWallets = useCurrencyWallets;
exports.useTransactionCount = useTransactionCount;
exports.useTransactions = useTransactions;
exports.useStartEngine = useStartEngine;
exports.useStopEngine = useStopEngine;
exports.useReceiveAddress = useReceiveAddress;
exports.useCreateAccount = useCreateAccount;
exports.useLoginWithPassword = useLoginWithPassword;
exports.useConvertCurrency = useConvertCurrency;
exports.useCheckPassword = useCheckPassword;
exports.useChangePassword = useChangePassword;
exports.useDeletePassword = useDeletePassword;
exports.useDeletePin = useDeletePin;
exports.useChangePin = useChangePin;
exports.useCheckPin = useCheckPin;
exports.useRecovery = useRecovery;
//# sourceMappingURL=index.js.map
