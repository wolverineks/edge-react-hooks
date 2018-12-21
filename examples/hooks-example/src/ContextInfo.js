// @flow

import React from "react";
import { type EdgeContext, type EdgeUserInfo } from "edge-core-js";
import { useLocalUsers } from "edge-react-hooks";

const contextStyle = {
  border: "1px solid red",
  padding: "5px",
  backgroundColor: "Salmon"
};

export const ContextInfo = ({ context }: { context: EdgeContext }) => {
  const { localUsers, deleteLocalUser, error: deleteLocalUserError } = useLocalUsers(context);

  return (
    <div style={contextStyle}>
      {deleteLocalUserError && <div style={contextStyle}>{deleteLocalUserError.toString()}</div>}
      <div style={contextStyle}>
        Previous Users:
        {localUsers &&
          localUsers.map((localUser: EdgeUserInfo) => (
            <div>
              {localUser.username} - <button onClick={() => deleteLocalUser(localUser.username)}>X</button>
            </div>
          ))}
      </div>
    </div>
  );
};
