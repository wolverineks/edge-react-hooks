// @flow

import { useEffect, useReducer } from "react";
import { type EdgeAccount, type EdgeCurrencyWallet } from "edge-core-js";

export type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>;

type WRITE_START = {| type: "WRITE_START" |};
type WRITE_SUCCESS = {| type: "WRITE_SUCCESS", data: Stringifyable |};
type WRITE_ERROR = {| type: "WRITE_ERROR", error: Error |};
type READ_START = {| type: "READ_START" |};
type READ_SUCCESS = {| type: "READ_SUCCESS", data: Stringifyable |};
type READ_ERROR = {| type: "READ_ERROR", error: Error |};
type Action = WRITE_START | WRITE_SUCCESS | WRITE_ERROR | READ_START | READ_SUCCESS | READ_ERROR;

type State = {
  data: Stringifyable | null,
  writePending: boolean,
  writeError: Error | null,
  readPending: boolean,
  readError: Error | null
};

const initialState: State = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
};

const reducer = (state: State, action: Action) => {
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

export const useSyncedStorage = (
  storageContext: EdgeAccount | EdgeCurrencyWallet | null | void,
  path: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onWriteSuccess = (data: Stringifyable) => () => dispatch({ type: "WRITE_SUCCESS", data });
  const onWriteError = (error: Error) => dispatch({ type: "WRITE_ERROR", error });
  const onReadSuccess = (data: string) => dispatch({ type: "READ_SUCCESS", data: JSON.parse(data) });
  const onReadError = (error: Error) => dispatch({ type: "READ_ERROR", error });

  const setData = (data: Stringifyable) => {
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
      (disklet: $PropertyType<EdgeAccount | EdgeCurrencyWallet, "disklet">) => {
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
