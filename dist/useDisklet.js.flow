// @flow

import { useEffect, useReducer } from "react";
import { type EdgeAccount } from "edge-core-js";

export type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>;

type WRITE_START = {| type: "WRITE_START" |};
type WRITE_SUCCESS = {| type: "WRITE_SUCCESS", data: Stringifyable |};
type WRITE_ERROR = {| type: "WRITE_ERROR", error: Error |};
type READ_START = {| type: "READ_START" |};
type READ_SUCCESS = {| type: "READ_SUCCESS", data: Stringifyable |};
type READ_ERROR = {| type: "READ_ERROR", error: Error |};
type Action = WRITE_START | WRITE_SUCCESS | WRITE_ERROR | READ_START | READ_SUCCESS | READ_ERROR;

type State = { data: Stringifyable | null, writePending: boolean, readPending: boolean };

const initialState: State = {
  data: null,
  writePending: false,
  readPending: false
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "WRITE_START": {
      return { ...state, writePending: true };
    }
    case "WRITE_SUCCESS": {
      const { data } = action;
      return { ...state, writePending: false, data };
    }
    case "WRITE_ERROR": {
      return { ...state, writePending: false };
    }
    case "READ_START": {
      return { ...state, readPending: true };
    }
    case "READ_SUCCESS": {
      const { data } = action;
      return { ...state, readPending: false, data };
    }
    case "READ_ERROR": {
      return { ...state, readPending: false };
    }
    default:
      return state;
  }
};

export const useDisklet = (account: EdgeAccount | null | void, path: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (data: Stringifyable) => {
    if (!account || !path) return;
    dispatch({ type: "WRITE_START" });
    return account.disklet.setText(path, JSON.stringify(data)).then(
      () => {
        dispatch({ type: "WRITE_SUCCESS", data });
      },
      (error: Error) => {
        console.log(error);
      }
    );
  };

  const updateData = (data: string) => {
    dispatch({ type: "READ_SUCCESS", data: JSON.parse(data) });
  };

  const effect = () => {
    if (!account || !path) return; // mount with null

    account.disklet.getText(path).then(updateData); // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch("disklet", (disklet: $PropertyType<EdgeAccount, "disklet">) => {
      path && disklet.getText(path).then(updateData);
    });

    return unsubscribe; // unmount with account / accountA -> accountB (1) / account -> null
  };

  useEffect(effect, []); // onMount
  useEffect(effect, [account]); // onUpdate

  return [state.data, setData, state.writePending, state.readPending];
};
