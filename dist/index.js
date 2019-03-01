'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var edgeCoreJs = require('edge-core-js');
var React = require('react');
var React__default = _interopDefault(React);
var reactUseAsync = require('react-use-async');

// 
class UseEdgeAccount extends React__default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.unsubscribes = [], this.mounted = false, this.safeUpdate = () => this.mounted && this.forceUpdate(), _temp;
  }

  componentDidMount() {
    const {
      account,
      watch: properties
    } = this.props;
    this.mounted = true;
    this.unsubscribes = properties.map(property => account.watch(property, () => this.safeUpdate()));
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribes.forEach(fn => fn());
  }

  render() {
    const {
      children,
      account
    } = this.props;
    return children(account);
  }

}

// 
class UseEdgeContext extends React__default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.unsubscribes = [], this.mounted = false, this.safeUpdate = () => this.mounted && this.forceUpdate(), _temp;
  }

  componentDidMount() {
    const {
      context,
      watch: properties
    } = this.props;
    this.mounted = true;
    this.unsubscribes = properties.map(property => context.watch(property, () => this.safeUpdate()));
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribes.forEach(fn => fn());
  }

  render() {
    const {
      children,
      context
    } = this.props;
    return children(context);
  }

}

// 
class UseEdgeCurrencyWallet extends React__default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.unsubscribes = [], this.mounted = false, this.safeUpdate = () => this.mounted && this.forceUpdate(), _temp;
  }

  componentDidMount() {
    const {
      wallet,
      watch: properties
    } = this.props;
    this.mounted = true;
    this.unsubscribes = properties.map(property => wallet.watch(property, () => this.safeUpdate()));
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribes.forEach(fn => fn());
  }

  render() {
    const {
      children,
      wallet
    } = this.props;
    return children(wallet);
  }

}

// 
const useActivateWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const activateWallet = (account, walletId) => {
    onStart();
    return account.changeWalletStates({
      [walletId]: {
        archived: false
      }
    }).then(onSuccess).catch(onError);
  };

  return {
    activateWallet,
    error,
    pending
  };
};

// 
const useArchiveWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const archiveWallet = (account, walletId) => {
    onStart();
    return account.changeWalletStates({
      [walletId]: {
        archived: true
      }
    }).then(onSuccess).catch(onError);
  };

  return {
    archiveWallet,
    error,
    pending
  };
};

// 
const useCancelOtpReset = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const cancelOtpReset = account => {
    onStart();
    return account.cancelOtpReset().then(onSuccess).catch(onError);
  };

  return {
    cancelOtpReset,
    error,
    pending
  };
};

// 
const useChangePassword = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const changePassword = (account, password) => {
    onStart();
    return account.changePassword(password).then(onSuccess).catch(onError);
  };

  return {
    changePassword,
    error,
    pending
  };
};

// 
const useChangePin = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const changePin = (account, options) => {
    onStart();
    return account.changePin(options).then(onSuccess).catch(onError);
  };

  return {
    changePin,
    error,
    pending,
    pin: data
  };
};

// 
const useChangeRecovery = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const changeRecovery = (account, questions, answers) => {
    onStart();
    return account.changeRecovery(questions, answers).then(onSuccess).catch(onError);
  };

  return {
    changeRecovery,
    error,
    pending,
    recovery: data
  };
};

// 
const useChangeWalletStates = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const changeWalletStates = (account, walletStates) => {
    onStart();
    return account.changeWalletStates(walletStates).then(onSuccess).catch(onError);
  };

  return {
    changeWalletStates,
    error,
    pending
  };
};

// 
const useCheckPassword = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const checkPassword = (account, password) => {
    onStart();
    return account.checkPassword(password).then(onSuccess).catch(onError);
  };

  return {
    checkPassword,
    error,
    passwordVerified: data,
    pending
  };
};

// 
const useCheckPin = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const checkPin = (account, pin) => {
    onStart();
    return account.checkPin(pin).then(onSuccess).catch(onError);
  };

  return {
    checkPin,
    error,
    pending,
    pinVerified: data
  };
};

// 
const useCreateCurrencyWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const createCurrencyWallet = (account, type, options) => {
    onStart();
    return account.createCurrencyWallet(type, options).then(onSuccess).catch(onError);
  };

  return {
    createCurrencyWallet,
    error,
    pending,
    wallet: data
  };
};

// 
const useCreateWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const createWallet = (account, type, keys) => {
    onStart();
    return account.createWallet(type, keys).then(onSuccess).catch(onError);
  };

  return {
    createWallet,
    data: data,
    error,
    pending
  };
};

// 
const useDeletePassword = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const deletePassword = account => {
    onStart();
    return account.deletePassword().then(onSuccess).catch(onError);
  };

  return {
    deletePassword,
    error,
    pending
  };
};

// 
const useDeletePin = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const deletePin = account => {
    onStart();
    return account.deletePin().then(onSuccess).catch(onError);
  };

  return {
    deletePin,
    error,
    pending
  };
};

// 
const useDeleteRecovery = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const deleteRecovery = account => {
    onStart();
    return account.deleteRecovery().then(onSuccess).catch(onError);
  };

  return {
    deleteRecovery,
    error,
    pending
  };
};

// 
const useDeleteWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const deleteWallet = (account, walletId) => {
    onStart();
    return account.changeWalletStates({
      [walletId]: {
        deleted: true
      }
    }).then(onSuccess).catch(onError);
  };

  return {
    deleteWallet,
    error,
    pending
  };
};

// 
const useDisableOtp = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const disableOtp = account => {
    onStart();
    return account.disableOtp().then(onSuccess).catch(onError);
  };

  return {
    disableOtp,
    error,
    pending
  };
};

// 
const useEnableOtp = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const enableOtp = (account, timeout) => {
    onStart();
    return account.enableOtp(timeout).then(onSuccess).catch(onError);
  };

  return {
    enableOtp,
    error,
    pending
  };
};

// 
const useFetchLobby = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const fetchLobby = (account, lobbyId) => {
    onStart();
    return account.fetchLobby(lobbyId).then(onSuccess).catch(onError);
  };

  return {
    error,
    fetchLobby,
    lobby: data,
    pending
  };
};

// 
const useFetchSwapQuote = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const fetchSwapQuote = (account, request) => {
    onStart();
    return account.fetchSwapQuote(request).then(onSuccess).catch(onError);
  };

  return {
    error,
    fetchSwapQuote,
    pending,
    swapQuote: data
  };
};

// 
const useGetFirstWalletInfo = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getFirstWalletInfo = (account, type) => {
    onStart();
    return Promise.resolve(account.getFirstWalletInfo(type)).then(onSuccess).catch(onError);
  };

  return {
    error,
    getFirstWalletInfo,
    pending,
    walletInfo: data
  };
};

// 
const useGetWalletInfo = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getWalletInfo = (account, id) => {
    onStart();
    return Promise.resolve(account.getWalletInfo(id)).then(onSuccess).catch(onError);
  };

  return {
    error,
    getWalletInfo,
    pending,
    walletInfo: data
  };
};

// 
const useListSplittableWalletTypes = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const listSplittableWalletTypes = (account, id) => {
    onStart();
    return account.listSplittableWalletTypes(id).then(onSuccess).catch(onError);
  };

  return {
    error,
    listSplittableWalletTypes,
    pending,
    splittalbleWalletTypes: data
  };
};

// 
const useListWalletIds = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const listWalletIds = account => {
    onStart();
    return Promise.resolve(account.listWalletIds()).then(onSuccess).catch(onError);
  };

  return {
    error,
    listWalletIds,
    pending,
    walletIds: data
  };
};

// 
const useLogout = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const logout = account => {
    onStart();
    return account.logout().then(onSuccess).catch(onError);
  };

  return {
    error,
    logout,
    pending
  };
};

// 
const useRestoreWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const restoreWallet = (account, walletId) => {
    onStart();
    return account.changeWalletStates({
      [walletId]: {
        archived: false,
        deleted: false
      }
    }).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    restoreWallet
  };
};

// 
const useSignEthereumTransaction = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const signEthereumTransaction = (account, walletId, transaction) => {
    onStart();
    return account.signEthereumTransaction(walletId, transaction).then(onSuccess).catch(onError);
  };

  return {
    data: data,
    error,
    pending,
    signEthereumTransaction
  };
};

// 
const useSplitWalletInfo = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const splitWalletInfo = (account, id, newWalletType) => {
    onStart();
    return account.splitWalletInfo(id, newWalletType).then(onSuccess).catch(onError);
  };

  return {
    data: data,
    error,
    pending,
    splitWalletInfo
  };
};

// 
const useWaitForCurrencyWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const waitForCurrencyWallet = (account, id) => {
    onStart();
    return account.waitForCurrencyWallet(id).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    waitForCurrencyWallet,
    wallet: data
  };
};

// 
const useCheckPasswordRules = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const checkPasswordRules = (context, password) => {
    onStart();
    return Promise.resolve(context.checkPasswordRules(password)).then(onSuccess).catch(onError);
  };

  return {
    checkPasswordRules,
    error,
    passwordRules: data,
    pending
  };
};

// 
const useClose = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const close = context => {
    onStart();
    return context.close().then(onSuccess).catch(onError);
  };

  return {
    close,
    error,
    pending
  };
};

// 
const useCreateAccount = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const createAccount = (context, username, password, pin, options) => {
    onStart();
    return context.createAccount(username, password, pin, options).then(onSuccess).catch(onError);
  };

  return {
    account: data,
    createAccount,
    error,
    pending
  };
};

// 
const useDeleteLocalAccount = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const deleteLocalAccount = (context, username) => {
    onStart();
    return context.deleteLocalAccount(username).then(onSuccess).catch(onError);
  };

  return {
    deleteLocalAccount,
    error,
    pending
  };
};

// 
const useFetchLoginMessages = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const fetchLoginMessages = context => {
    onStart();
    return context.fetchLoginMessages().then(onSuccess).catch(onError);
  };

  return {
    error,
    fetchLoginMessages,
    loginMessages: data,
    pending
  };
};

// 
const useFetchRecovery2Questions = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const fetchRecovery2Questions = (context, recovery2Key, username) => {
    onStart();
    return context.fetchRecovery2Questions(recovery2Key, username).then(onSuccess).catch(onError);
  };

  return {
    error,
    fetchRecovery2Questions,
    pending,
    recovery2Questions: data
  };
};

// 
const useFixUsername = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const fixUsername = (context, username) => {
    onStart();
    return Promise.resolve(context.fixUsername(username)).then(onSuccess).catch(onError);
  };

  return {
    error,
    fixUsername,
    pending,
    username: data
  };
};

// 
const useGetRecovery2Key = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getRecovery2Key = (context, username) => {
    onStart();
    return context.getRecovery2Key(username).then(onSuccess).catch(onError);
  };

  return {
    error,
    getRecovery2Key,
    pending,
    recovery2Key: data
  };
};

// 
const useListRecoveryQuestionChoices = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const listRecoveryQuestionChoices = context => {
    onStart();
    return context.listRecoveryQuestionChoices().then(onSuccess).catch(onError);
  };

  return {
    error,
    listRecoveryQuestionChoices,
    pending,
    recoveryQuestionChoices: data
  };
};

// 
const useListUsernames = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const listUsernames = context => {
    onStart();
    return context.listUsernames().then(onSuccess).catch(onError);
  };

  return {
    error,
    listUsernames,
    pending,
    usernames: data
  };
};

// 
const useLoginWithKey = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const loginWithKey = (context, username, loginKey, options) => {
    onStart();
    return context.loginWithKey(username, loginKey, options).then(onSuccess).catch(onError);
  };

  return {
    account: data,
    error,
    loginWithKey,
    pending
  };
};

// 
const useLoginWithPassword = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const loginWithPassword = (context, username, password, options) => {
    onStart();
    return context.loginWithPassword(username, password, options).then(onSuccess).catch(onError);
  };

  return {
    account: data,
    error,
    loginWithPassword,
    pending
  };
};

// 
const useLoginWithPIN = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const loginWithPIN = (context, username, pin, options) => {
    onStart();
    return context.loginWithPIN(username, pin, options).then(onSuccess).catch(onError);
  };

  return {
    account: data,
    error,
    loginWithPIN,
    pending
  };
};

// 
const useLoginWithRecovery2 = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const loginWithRecovery2 = (context, recovery2Key, username, answers, options) => {
    onStart();
    return context.loginWithRecovery2(recovery2Key, username, answers, options).then(onSuccess).catch(onError);
  };

  return {
    account: data,
    error,
    loginWithRecovery2,
    pending
  };
};

// 
const usePinLoginEnabled = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const pinLoginEnabled = (context, username) => {
    onStart();
    return context.pinLoginEnabled(username).then(onSuccess).catch(onError);
  };

  return {
    enabled: data,
    error,
    pending,
    pinLoginEnabled
  };
};

// 
const useRequestEdgeLogin = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const requestEdgeLogin = (context, options) => {
    onStart();
    return context.requestEdgeLogin(options).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    pendingLogin: data,
    requestEdgeLogin
  };
};

// 
const useRequestOtpReset = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const requestOtpReset = (context, username, otpResetToken) => {
    onStart();
    return context.requestOtpReset(username, otpResetToken).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    requestOtpReset,
    resetDate: data
  };
};

// 
const useUsernameAvailable = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const usernameAvailable = (context, username) => {
    onStart();
    return context.usernameAvailable(username).then(onSuccess).catch(onError);
  };

  return {
    available: data,
    error,
    pending,
    usernameAvailable
  };
};

// 
const useAddCustomToken = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const addCustomToken = (wallet, tokenInfo) => {
    onStart();
    return wallet.addCustomToken(tokenInfo).then(onSuccess).catch(onError);
  };

  return {
    addCustomToken,
    error,
    pending
  };
};

// 
const useBroadcastTx = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const broadcastTx = (wallet, tx) => {
    onStart();
    return wallet.broadcastTx(tx).then(onSuccess).catch(onError);
  };

  return {
    broadcastTx,
    error,
    pending,
    transaction: data
  };
};

// 
const useDenominationToNative = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const denominationToNative = (wallet, denominatedAmount, currencyCode) => {
    onStart();
    return wallet.denominationToNative(denominatedAmount, currencyCode).then(onSuccess).catch(onError);
  };

  return {
    denominationToNative,
    error,
    nativeAmount: data,
    pending
  };
};

// 
const useDisableTokens = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const disableTokens = (wallet, tokens) => {
    onStart();
    return wallet.disableTokens(tokens).then(onSuccess).catch(onError);
  };

  return {
    disableTokens,
    error,
    pending
  };
};

// 
const useDumpData = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const dumpData = wallet => {
    onStart();
    return wallet.dumpData().then(onSuccess).catch(onError);
  };

  return {
    data: data,
    dumpData,
    error,
    pending
  };
};

// 
const useEnableTokens = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending
  } = reactUseAsync.useAsync();

  const enableTokens = (wallet, tokens) => {
    onStart();
    return wallet.enableTokens(tokens).then(onSuccess).catch(onError);
  };

  return {
    enableTokens,
    error,
    pending
  };
};

// 
const useEncodeUri = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending,
    data
  } = reactUseAsync.useAsync();

  const encodeUri = (wallet, encodeUri) => {
    onStart();
    return wallet.encodeUri(encodeUri).then(onSuccess).catch(onError);
  };

  return {
    encodeUri,
    error,
    pending,
    uri: data
  };
};

// 
const useExportTransactionsToCSV = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending,
    data
  } = reactUseAsync.useAsync();

  const exportTransactionsToCSV = (wallet, options) => {
    onStart();
    return wallet.exportTransactionsToCSV(options).then(onSuccess).catch(onError);
  };

  return {
    csv: data,
    error,
    exportTransactionsToCSV,
    pending
  };
};

// 
const useExportTransactionsToQBO = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending,
    data
  } = reactUseAsync.useAsync();

  const exportTransactionsToQBO = (wallet, options) => {
    onStart();
    return wallet.exportTransactionsToQBO(options).then(onSuccess).catch(onError);
  };

  return {
    error,
    exportTransactionsToQBO,
    pending,
    qbo: data
  };
};

// 
const useGetDisplayPrivateSeed = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending,
    data
  } = reactUseAsync.useAsync();

  const getDisplayPrivateSeed = wallet => {
    onStart();
    return Promise.resolve(wallet.getDisplayPrivateSeed()).then(onSuccess).catch(onError);
  };

  return {
    error,
    getDisplayPrivateSeed,
    pending,
    privateSeed: data
  };
};

// 
const useGetDisplayPublicSeed = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending,
    data
  } = reactUseAsync.useAsync();

  const getDisplayPublicSeed = wallet => {
    onStart();
    return Promise.resolve(wallet.getDisplayPublicSeed()).then(onSuccess).catch(onError);
  };

  return {
    error,
    getDisplayPublicSeed,
    pending,
    publicSeed: data
  };
};

// 
const useGetEnabledTokens = () => {
  const {
    onStart,
    onSuccess,
    onError,
    error,
    pending,
    data
  } = reactUseAsync.useAsync();

  const getEnabledTokens = wallet => {
    onStart();
    return wallet.getEnabledTokens().then(onSuccess).catch(onError);
  };

  return {
    enabledTokens: data,
    error,
    getEnabledTokens,
    pending
  };
};

// 
const useGetMaxSpendable = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getMaxSpendable = (wallet, spendInfo) => {
    onStart();
    return wallet.getMaxSpendable(spendInfo).then(onSuccess).catch(onError);
  };

  return {
    error,
    getMaxSpendable,
    maxSpendable: data,
    pending
  };
};

// 
const useGetNumTransactions = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getNumTransactions = (wallet, options) => {
    onStart();
    return wallet.getNumTransactions(options).then(onSuccess).catch(onError);
  };

  return {
    error,
    getNumTransactions,
    numTransactions: data,
    pending
  };
};

// 
const useGetPaymentProtocolInfo = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getPaymentProtocolInfo = (wallet, url) => {
    onStart();
    return wallet.getPaymentProtocolInfo(url).then(onSuccess).catch(onError);
  };

  return {
    error,
    getPaymentProtocolInfo,
    paymentProtocolInfo: data,
    pending
  };
};

// 
const useGetReceiveAddress = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getReceiveAddress = (wallet, options) => {
    onStart();
    return wallet.getReceiveAddress(options).then(onSuccess).catch(onError);
  };

  return {
    error,
    getReceiveAddress,
    pending,
    receiveAddress: data
  };
};

// 
const useGetTransactions = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const getTransactions = (wallet, options) => {
    onStart();
    return wallet.getTransactions(options).then(onSuccess).catch(onError);
  };

  return {
    error,
    getTransactions,
    pending,
    transactions: data
  };
};

// 
const useLockReceiveAddress = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const lockReceiveAddress = (wallet, receiveAddress) => {
    onStart();
    return wallet.lockReceiveAddress(receiveAddress).then(onSuccess).catch(onError);
  };

  return {
    error,
    lockReceiveAddress,
    pending
  };
};

// 
const useMakeSpend = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const makeSpend = (wallet, spendInfo) => {
    onStart();
    return wallet.makeSpend(spendInfo).then(onSuccess).catch(onError);
  };

  return {
    error,
    makeSpend,
    pending,
    transaction: data
  };
};

// 
const useNativeToDenomination = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const nativeToDenomination = (wallet, nativeAmount, currencyCode) => {
    onStart();
    return wallet.nativeToDenomination(nativeAmount, currencyCode).then(onSuccess).catch(onError);
  };

  return {
    denominatedAmount: data,
    error,
    nativeToDenomination,
    pending
  };
};

// 
const useParseUri = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const parseUri = (wallet, uri) => {
    onStart();
    return wallet.parseUri(uri).then(onSuccess).catch(onError);
  };

  return {
    error,
    parseUri,
    parsedUri: data,
    pending
  };
};

// 
const useRenameWallet = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const renameWallet = (wallet, name) => {
    onStart();
    return wallet.renameWallet(name).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    renameWallet
  };
};

// 
const useResyncBlockchain = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const resyncBlockchain = wallet => {
    onStart();
    return wallet.resyncBlockchain().then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    resyncBlockchain
  };
};

// 
const useSaveReceiveAddress = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const saveReceiveAddress = (wallet, receiveAddress) => {
    onStart();
    return wallet.saveReceiveAddress(receiveAddress).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    saveReceiveAddress
  };
};

// 
const useSaveTx = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const saveTx = (wallet, tx) => {
    onStart();
    return wallet.saveTx(tx).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    saveTx
  };
};

// 
const useSaveTxMetadata = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const saveTxMetadata = (wallet, txid, currencyCode, metadata) => {
    onStart();
    return wallet.saveTxMetadata(txid, currencyCode, metadata).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    saveTxMetadata
  };
};

// 
const useSetFiatCurrencyCode = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const setFiatCurrencyCode = (wallet, fiatCurrencyCode) => {
    onStart();
    return wallet.setFiatCurrencyCode(fiatCurrencyCode).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    setFiatCurrencyCode
  };
};

// 
const useSignTx = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const signTx = (wallet, tx) => {
    onStart();
    return wallet.signTx(tx).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    signTx,
    transaction: data
  };
};

// 
const useStartEngine = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const startEngine = wallet => {
    onStart();
    return wallet.startEngine().then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    startEngine
  };
};

// 
const useStopEngine = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const stopEngine = wallet => {
    onStart();
    return wallet.stopEngine().then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    stopEngine
  };
};

// 
const useSweepPrivateKeys = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const sweepPrivateKeys = (wallet, spendInfo) => {
    onStart();
    return wallet.sweepPrivateKeys(spendInfo).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    sweepPrivateKeys,
    transaction: data
  };
};

// 
const useLocalStorageRead = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const localStorageRead = (storageContext, path) => {
    onStart();
    return storageContext.localDisklet.getText(path).then(JSON.parse).then(onSuccess).catch(onError);
  };

  return {
    error,
    localStorage: data,
    localStorageRead,
    pending
  };
};

// 
const useLocalStorageWrite = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const localStorageWrite = (storageContext, path, data) => {
    onStart();
    return storageContext.localDisklet.setText(path, JSON.stringify(data)).then(onSuccess).catch(onError);
  };

  return {
    error,
    localStorageWrite,
    pending
  };
};

// 
const useSync = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const sync = syncable => {
    onStart();
    return syncable.sync().then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    sync
  };
};

// 
const useSyncedStorageRead = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const syncedStorageRead = (storageContext, path) => {
    onStart();
    return storageContext.disklet.getText(path).then(JSON.parse).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    syncedStorage: data,
    syncedStorageRead
  };
};

// 
const useSyncedStorageWrite = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error
  } = reactUseAsync.useAsync();

  const syncedStorageWrite = (storageContext, path, data) => {
    onStart();
    return storageContext.disklet.setText(path, JSON.stringify(data)).then(onSuccess).catch(onError);
  };

  return {
    error,
    pending,
    syncedStorageWrite
  };
};

// 
const useForceUpdate = () => {
  const [, setState] = React.useState(false);

  const forceUpdate = () => setState(state => !state);

  return forceUpdate;
};

// 
const useEdgeAccount = (account, properties) => {
  const forceUpdate = useForceUpdate();

  const effect = () => {
    const unsubscribes = properties.map(property => account.watch(property, forceUpdate));
    if (unsubscribes.length > 0) forceUpdate();

    const unsubscribe = () => unsubscribes.forEach(fn => fn());

    return unsubscribe;
  };

  React.useEffect(effect, [account]);
  return void 0;
};

// 
const useEdgeContext = (context, properties) => {
  const forceUpdate = useForceUpdate();

  const effect = () => {
    const unsubscribes = properties.map(property => context.watch(property, forceUpdate), []);
    if (unsubscribes.length > 0) forceUpdate();

    const unsubscribe = () => unsubscribes.forEach(fn => fn());

    return unsubscribe;
  };

  React.useEffect(effect, [context]);
  return void 0;
};

// 
const useEdgeCurrencyWallet = (wallet, properties) => {
  const forceUpdate = useForceUpdate();

  const effect = () => {
    const unsubscribes = properties.map(property => wallet.watch(property, forceUpdate));
    if (unsubscribes.length > 0) forceUpdate();

    const unsubscribe = () => unsubscribes.forEach(fn => fn());

    return unsubscribe;
  };

  React.useEffect(effect, [wallet]);
  return void 0;
};

// 
const useMakeEdgeContext = () => {
  const {
    onStart,
    onSuccess,
    onError,
    pending,
    error,
    data
  } = reactUseAsync.useAsync();

  const _makeEdgeContext = contextOptions => {
    onStart();
    return edgeCoreJs.makeEdgeContext(contextOptions).then(onSuccess).catch(onError);
  };

  return {
    context: data,
    error,
    makeEdgeContext: _makeEdgeContext,
    pending
  };
};

//

exports.useActivateWallet = useActivateWallet;
exports.useAddCustomToken = useAddCustomToken;
exports.useArchiveWallet = useArchiveWallet;
exports.useBroadcastTx = useBroadcastTx;
exports.useCancelOtpReset = useCancelOtpReset;
exports.useChangePassword = useChangePassword;
exports.useChangePin = useChangePin;
exports.useChangeRecovery = useChangeRecovery;
exports.useChangeWalletStates = useChangeWalletStates;
exports.useCheckPassword = useCheckPassword;
exports.useCheckPasswordRules = useCheckPasswordRules;
exports.useCheckPin = useCheckPin;
exports.useClose = useClose;
exports.useCreateAccount = useCreateAccount;
exports.useCreateCurrencyWallet = useCreateCurrencyWallet;
exports.useCreateWallet = useCreateWallet;
exports.useDeleteLocalAccount = useDeleteLocalAccount;
exports.useDeletePassword = useDeletePassword;
exports.useDeletePin = useDeletePin;
exports.useDeleteRecovery = useDeleteRecovery;
exports.useDeleteWallet = useDeleteWallet;
exports.useDenominationToNative = useDenominationToNative;
exports.useDisableOtp = useDisableOtp;
exports.useDisableTokens = useDisableTokens;
exports.useDumpData = useDumpData;
exports.useEdgeAccount = useEdgeAccount;
exports.UseEdgeAccount = UseEdgeAccount;
exports.UseEdgeContext = UseEdgeContext;
exports.useEdgeContext = useEdgeContext;
exports.UseEdgeCurrencyWallet = UseEdgeCurrencyWallet;
exports.useEdgeCurrencyWallet = useEdgeCurrencyWallet;
exports.useEnableOtp = useEnableOtp;
exports.useEnableTokens = useEnableTokens;
exports.useEncodeUri = useEncodeUri;
exports.useExportTransactionsToCSV = useExportTransactionsToCSV;
exports.useExportTransactionsToQBO = useExportTransactionsToQBO;
exports.useFetchLobby = useFetchLobby;
exports.useFetchLoginMessages = useFetchLoginMessages;
exports.useFetchRecovery2Questions = useFetchRecovery2Questions;
exports.useFetchSwapQuote = useFetchSwapQuote;
exports.useFixUsername = useFixUsername;
exports.useGetDisplayPrivateSeed = useGetDisplayPrivateSeed;
exports.useGetDisplayPublicSeed = useGetDisplayPublicSeed;
exports.useGetEnabledTokens = useGetEnabledTokens;
exports.useGetFirstWalletInfo = useGetFirstWalletInfo;
exports.useGetMaxSpendable = useGetMaxSpendable;
exports.useGetNumTransactions = useGetNumTransactions;
exports.useGetPaymentProtocolInfo = useGetPaymentProtocolInfo;
exports.useGetReceiveAddress = useGetReceiveAddress;
exports.useGetRecovery2Key = useGetRecovery2Key;
exports.useGetTransactions = useGetTransactions;
exports.useGetWalletInfo = useGetWalletInfo;
exports.useListRecoveryQuestionChoices = useListRecoveryQuestionChoices;
exports.useListSplittableWalletTypes = useListSplittableWalletTypes;
exports.useListUsernames = useListUsernames;
exports.useListWalletIds = useListWalletIds;
exports.useLocalStorageRead = useLocalStorageRead;
exports.useLocalStorageWrite = useLocalStorageWrite;
exports.useLockReceiveAddress = useLockReceiveAddress;
exports.useLoginWithKey = useLoginWithKey;
exports.useLoginWithPassword = useLoginWithPassword;
exports.useLoginWithPIN = useLoginWithPIN;
exports.useLoginWithRecovery2 = useLoginWithRecovery2;
exports.useLogout = useLogout;
exports.useMakeEdgeContext = useMakeEdgeContext;
exports.useMakeSpend = useMakeSpend;
exports.useNativeToDenomination = useNativeToDenomination;
exports.useParseUri = useParseUri;
exports.usePinLoginEnabled = usePinLoginEnabled;
exports.useRenameWallet = useRenameWallet;
exports.useRequestEdgeLogin = useRequestEdgeLogin;
exports.useRequestOtpReset = useRequestOtpReset;
exports.useRestoreWallet = useRestoreWallet;
exports.useResyncBlockchain = useResyncBlockchain;
exports.useSaveReceiveAddress = useSaveReceiveAddress;
exports.useSaveTx = useSaveTx;
exports.useSaveTxMetadata = useSaveTxMetadata;
exports.useSetFiatCurrencyCode = useSetFiatCurrencyCode;
exports.useSignEthereumTransaction = useSignEthereumTransaction;
exports.useSignTx = useSignTx;
exports.useSplitWalletInfo = useSplitWalletInfo;
exports.useStartEngine = useStartEngine;
exports.useStopEngine = useStopEngine;
exports.useSweepPrivateKeys = useSweepPrivateKeys;
exports.useSync = useSync;
exports.useSyncedStorageRead = useSyncedStorageRead;
exports.useSyncedStorageWrite = useSyncedStorageWrite;
exports.useUsernameAvailable = useUsernameAvailable;
exports.useWaitForCurrencyWallet = useWaitForCurrencyWallet;
//# sourceMappingURL=index.js.map
