// @flow

import { makeEdgeContext, type EdgeAccount } from "edge-core-js";
import { ethereumCurrencyPluginFactory } from "edge-currency-ethereum";
import React, { useEffect, useState } from "react";

import { ContextInfo } from "./ContextInfo.js";
import { AccountInfo } from "./AccountInfo.js";

type Props = {||};
export const App = (props: Props) => {
  const [context, setContext] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    context &&
      context.loginWithPassword("edgy76", "Test123456").then(
        (account: EdgeAccount) => {
          setAccount(account);
          setLoading(false);
        },
        (error: Error) => alert(error)
      );
  };

  const reset = () => {
    account && account.logout();
    setAccount(null);
    context && context.deleteLocalAccount("edgy76");
  };

  useEffect(() => {
    const plugins = [ethereumCurrencyPluginFactory];
    const options = { apiKey: "cfcc4514d85fff7cb3e2e7ef5dee3b827270d030", appId: "", plugins: plugins };
    makeEdgeContext(options).then(setContext);
  }, []); // onMount

  return (
    <div className={"App"}>
      {context && !loading && !account && <button onClick={login}>Login</button>}
      {loading && <div>Loading...</div>}
      {account && <button onClick={reset}>reset</button>}
      {context && <ContextInfo context={context} />}
      {account && <AccountInfo account={account} />}
    </div>
  );
};

export default App;
