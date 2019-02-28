// @flow

import { type EdgeAccount, type EdgeWalletInfoFull } from "edge-core-js";
import { useEdgeAccount } from "edge-react-hooks";
import React, { useState } from "react";
import { useEffect, useRef } from "react";

type Props = { account: EdgeAccount };

export const ArchivedWalletList = ({ account }: Props) => {
  useEdgeAccount(account, ["archivedWalletIds"]);

  return (
    <div>
      Archived Wallets:
      {account.archivedWalletIds.map((id: string) => {
        return <ArchivedWalletRow key={id} id={id} account={account} />;
      })}
    </div>
  );
};

const ArchivedWalletRow = ({ account, id }: { account: EdgeAccount, id: string }) => {
  const activateWallet = useAsync();
  const deleteWallet = useAsync();

  const handleActivateWallet = () => {
    activateWallet.async(() => account.changeWalletStates({ [id]: { archived: false } }));
  };

  const handleDeleteWallet = () => {
    deleteWallet.async(() => account.changeWalletStates({ [id]: { deleted: true } }));
  };

  const walletInfo = account.allKeys.find((walletInfo: EdgeWalletInfoFull) => walletInfo.id === id);
  if (!walletInfo) return null;

  return (
    <div>
      <div>
        {walletInfo.id} - {walletInfo.type}
      </div>
      <div>
        <button disabled={activateWallet.pending} onClick={handleActivateWallet}>
          Activate
        </button>
      </div>
      <div>
        <button disabled={deleteWallet.pending} onClick={handleDeleteWallet}>
          Delete
        </button>
      </div>
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
