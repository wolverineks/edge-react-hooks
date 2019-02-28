// @flow

import { type EdgeAccount, type EdgeWalletInfoFull } from "edge-core-js";
import { useEdgeAccount } from "edge-react-hooks";
import React from "react";
import { useEffect, useRef, useState } from "react";

export const DeletedWalletList = ({ account }: { account: EdgeAccount }) => {
  useEdgeAccount(account, ["allKeys"]);

  return (
    <div>
      Deleted Wallets:
      {account.allKeys
        .filter(walletInfo => walletInfo.deleted)
        .map((walletInfo: EdgeWalletInfoFull) => (
          <DeletedWalletRow account={account} key={walletInfo.id} id={walletInfo.id} />
        ))}
    </div>
  );
};

const DeletedWalletRow = ({ account, id }) => {
  const restoreWallet = useAsync();

  const handleRestoreWallet = () => {
    restoreWallet.async(() => account.changeWalletStates({ [id]: { deleted: false, archived: false } }));
  };

  return (
    <div>
      {id} -
      <button disabled={restoreWallet.pending} onClick={handleRestoreWallet}>
        Restore
      </button>
    </div>
  );
};

const useAsync = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  const [state, setState] = useState({ pending: false, error: null, data: null });
  const onStart = () => setState(state => ({ ...state, pending: true, error: null }));
  const onSuccess = (data: any) => isMounted.current && setState(state => ({ ...state, pending: false, data }));
  const onError = (error: Error) => isMounted.current && setState(state => ({ ...state, pending: false, error }));

  const async = (asyncFunction: () => Promise<any>) => {
    if (!isMounted.current) throw new Error("Attempting to call async in unmounted component");
    if (state.pending) throw new Error("Use 'pending' to prevent multiple simultaneous async calls");
    onStart();
    asyncFunction()
      .then(onSuccess)
      .catch(onError);
  };

  return { async, ...state };
};
