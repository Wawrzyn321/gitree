import React from "react";

import { GitreeContextType } from "./types";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { useOwnerFormActions } from "./ownerForm/useOwnerFormActions";
import { useRepositoryFormActions } from "./repositoryForm/useRepositoryFormActions";
import { useTreeActions } from "./tree/useTreeActions";
import { useBranchFormActions } from "./branchForm/useBranchFormActions";

export const GitreeContext = React.createContext<GitreeContextType | null>(
  null,
);

export const GitreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value: GitreeContextType = {
    state,
    ownerFormActions: useOwnerFormActions(state, dispatch),
    repositoryFormActions: useRepositoryFormActions(state, dispatch),
    branchFormActions: useBranchFormActions(state, dispatch),
    treeActions: useTreeActions(dispatch),
  };

  return (
    <GitreeContext.Provider value={value}> {children} </GitreeContext.Provider>
  );
};
