// @flow

import { type EdgeContext } from "edge-core-js";
import React from "react";

type Props = { localUsers: $PropertyType<EdgeContext, "localUsers"> };

export const LocalUsers = ({ localUsers }: Props) => {
  return (
    <div>
      {localUsers.map(({ username }) => (
        <div key={username}>{username}</div>
      ))}
    </div>
  );
};
