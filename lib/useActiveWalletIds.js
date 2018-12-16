// @flow

import { useEffect, useState } from "react";

export const useActiveWalletIds = account => {
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
