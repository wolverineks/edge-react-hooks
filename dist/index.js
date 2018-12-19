import { useState, useEffect, useReducer } from 'react';
import 'edge-core-js';

//      

const useActiveWalletIds = (account                           ) => {
  const [activeWalletIds, setActiveWalletIds] = useState(account ? account.archivedWalletIds : []);

  const effect = () => {
    if (!account) return; // mount with null
    setActiveWalletIds(account.activeWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch("activeWalletIds", setActiveWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe; // unmount with account / accountA -> accountB (1) / account -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [account]); // onUpdate

  return activeWalletIds;
};

//      

const useArchivedWalletIds = (account                           ) => {
  const [archivedWalletIds, setArchivedWalletIds] = useState(account ? account.activeWalletIds : []);

  const effect = () => {
    if (!account) return; // mount with null
    setArchivedWalletIds(account.archivedWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch("archivedWalletIds", setArchivedWalletIds); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe; // unmount with account / accountA -> accountB (1) / account -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [account]); // onUpdate

  return archivedWalletIds;
};

//      

const getDeletedWalletIds = (walletInfos                           ) => {
  const deletedWalletInfos                            = walletInfos.filter(key => key.deleted);
  const deletedWalletIds                = deletedWalletInfos.map((key                    ) => key.id);

  return deletedWalletIds;
};

const useDeletedWalletIds = (account                           ) => {
  const initialState = account ? getDeletedWalletIds(account.allKeys) : [];
  const [deletedWalletIds, setDeletedWalletIds] = useState(initialState);

  const effect = () => {
    if (!account) return; // mount with null
    setDeletedWalletIds(getDeletedWalletIds(account.allKeys)); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch("allKeys", allKeys => {
      setDeletedWalletIds(getDeletedWalletIds(allKeys));
    }); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe; // unmount with account / accountA -> accountB (1) / account -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [account]); // onUpdate

  return deletedWalletIds;
};

//      

const useLocalUsers = (context                           ) => {
  const [localUsers, setLocalUsers] = useState(context ? context.localUsers : []);

  const effect = () => {
    if (!context) return; // mount with null
    const unsubscribe = context.watch("localUsers", setLocalUsers); // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe; // unmount with context / contextA -> contextB (1) / context -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [context]); // onUpdate

  return localUsers;
};

//      

const useOtpKey = (account                           ) => {
  const [otpKey, setOtpKey] = useState(account ? account.otpKey : []);

  const effect = () => {
    if (!account) return; // mount with null
    setOtpKey(account.otpKey); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch("otpKey", setOtpKey); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe; // unmount with account / accountA -> accountB (1) / account -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [account]); // onUpdate

  return otpKey;
};

//      

const useOtpResetDate = (account                           ) => {
  const [otpResetDate, setOtpResetDate] = useState(account ? account.otpResetDate : []);

  const effect = () => {
    if (!account) return; // mount with null
    setOtpResetDate(account.otpResetDate); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch("otpResetDate", setOtpResetDate); // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe; // unmount with account / accountA -> accountB (1) / account -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [account]); // onUpdate

  return otpResetDate;
};

//      

                                                                                                 

                                             
                                                                      
                                                           
                                           
                                                                    
                                                         
                                                                                                 

              
                             
                        
                           
                       
                         
  

const initialState        = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer = (state       , action        ) => {
  switch (action.type) {
    case "WRITE_START": {
      return { ...state, writePending: true, writeError: null };
    }
    case "WRITE_SUCCESS": {
      const { data } = action;
      return { ...state, writePending: false, data };
    }
    case "WRITE_ERROR": {
      const { error: writeError } = action;
      return { ...state, writePending: false, writeError };
    }
    case "READ_START": {
      return { ...state, readPending: true, readError: null };
    }
    case "READ_SUCCESS": {
      const { data } = action;
      return { ...state, readPending: false, data };
    }
    case "READ_ERROR": {
      const { error: readError } = action;
      return { ...state, readPending: false, readError };
    }
    default:
      return state;
  }
};

const useLocalStorage = (
  storageContext                                                ,
  path                      
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onWriteSuccess = (data               ) => () => dispatch({ type: "WRITE_SUCCESS", data });
  const onWriteError = (error       ) => dispatch({ type: "WRITE_ERROR", error });
  const onReadSuccess = (data        ) => dispatch({ type: "READ_SUCCESS", data: JSON.parse(data) });
  const onReadError = (error       ) => dispatch({ type: "READ_ERROR", error });

  const setData = (data               ) => {
    if (!storageContext || !path) return;
    dispatch({ type: "WRITE_START" });
    storageContext.localDisklet.setText(path, JSON.stringify(data)).then(onWriteSuccess(data), onWriteError);
  };

  const effect = () => {
    if (!storageContext || !path) return; // mount with null
    dispatch({ type: "READ_START" });
    storageContext.localDisklet.getText(path).then(onReadSuccess, onReadError); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      "localDisklet",
      (localDisklet                                                                 ) => {
        if (!storageContext || !path) return;
        localDisklet.getText(path).then(onReadSuccess, onReadError);
      }
    );

    return unsubscribe; // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [storageContext]); // onUpdate

  return { ...state, setData };
};

//      

                                                                                                 

                                             
                                                                      
                                                           
                                           
                                                                    
                                                         
                                                                                                 

              
                             
                        
                           
                       
                         
  

const initialState$1        = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer$1 = (state       , action        ) => {
  switch (action.type) {
    case "WRITE_START": {
      return { ...state, writePending: true, writeError: null };
    }
    case "WRITE_SUCCESS": {
      const { data } = action;
      return { ...state, writePending: false, data };
    }
    case "WRITE_ERROR": {
      const { error: writeError } = action;
      return { ...state, writePending: false, writeError };
    }
    case "READ_START": {
      return { ...state, readPending: true, readError: null };
    }
    case "READ_SUCCESS": {
      const { data } = action;
      return { ...state, readPending: false, data };
    }
    case "READ_ERROR": {
      const { error: readError } = action;
      return { ...state, readPending: false, readError };
    }
    default:
      return state;
  }
};

const useSyncedStorage = (
  storageContext                                                ,
  path                      
) => {
  const [state, dispatch] = useReducer(reducer$1, initialState$1);

  const onWriteSuccess = (data               ) => () => dispatch({ type: "WRITE_SUCCESS", data });
  const onWriteError = (error       ) => dispatch({ type: "WRITE_ERROR", error });
  const onReadSuccess = (data        ) => dispatch({ type: "READ_SUCCESS", data: JSON.parse(data) });
  const onReadError = (error       ) => dispatch({ type: "READ_ERROR", error });

  const setData = (data               ) => {
    if (!storageContext || !path) return;
    dispatch({ type: "WRITE_START" });
    storageContext.disklet.setText(path, JSON.stringify(data)).then(onWriteSuccess(data), onWriteError);
  };

  const effect = () => {
    if (!storageContext || !path) return; // mount with null
    dispatch({ type: "READ_START" });
    storageContext.disklet.getText(path).then(onReadSuccess, onReadError); // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      "disklet",
      (disklet                                                            ) => {
        if (!storageContext || !path) return;
        disklet.getText(path).then(onReadSuccess, onReadError);
      }
    );

    return unsubscribe; // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [storageContext]); // onUpdate

  return { ...state, setData };
};

//      

                                                                                   
                                                                                                                 
                                                                                                 
                                                                                                               
             
                                  
                                    
                                  
                                    

              
                                  
                   
                     
  

const initialState$2        = {
  fiatCurrencyCode: null,
  pending: false,
  error: null
};

const reducer$2 = (state       , action        ) => {
  switch (action.type) {
    case "WRITE_FIAT_CURRENCY_CODE_START": {
      return { ...state, pending: true, error: null };
    }
    case "READ_FIAT_CURRENCY_CODE_SUCCESS":
    case "WRITE_FIAT_CURRENCY_CODE_SUCCESS": {
      const { fiatCurrencyCode } = action;
      return { ...state, pending: false, fiatCurrencyCode };
    }
    case "WRITE_FIAT_CURRENCY_CODE_ERROR": {
      const { error } = action;
      return { ...state, pending: false, error };
    }
    default:
      return state;
  }
};

const useFiatCurrencyCode = (wallet                                  ) => {
  const [state, dispatch] = useReducer(reducer$2, initialState$2);

  const onSuccess = (fiatCurrencyCode        ) => () =>
    dispatch({ type: "WRITE_FIAT_CURRENCY_CODE_SUCCESS", fiatCurrencyCode });
  const onError = (error       ) => dispatch({ type: "WRITE_FIAT_CURRENCY_CODE_ERROR", error });

  const setFiatCurrencyCode = (fiatCurrencyCode        ) => {
    if (!wallet) return;
    dispatch({ type: "WRITE_FIAT_CURRENCY_CODE_START" });
    wallet.setFiatCurrencyCode(fiatCurrencyCode).then(onSuccess(fiatCurrencyCode), onError);
  };

  const effect = () => {
    if (!wallet) return; // mount with null
    dispatch({ type: "READ_FIAT_CURRENCY_CODE_SUCCESS", fiatCurrencyCode: wallet.fiatCurrencyCode });

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      "fiatCurrencyCode",
      (fiatCurrencyCode                                                       ) =>
        dispatch({ type: "WRITE_FIAT_CURRENCY_CODE_SUCCESS", fiatCurrencyCode })
    );

    return unsubscribe; // unmount with wallet / walletA -> walletB (1) / wallet -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [wallet]); // onUpdate

  return { ...state, setFiatCurrencyCode };
};

//

export { useActiveWalletIds, useArchivedWalletIds, useDeletedWalletIds, useLocalUsers, useOtpKey, useOtpResetDate, useLocalStorage, useSyncedStorage, useFiatCurrencyCode };
//# sourceMappingURL=index.js.map