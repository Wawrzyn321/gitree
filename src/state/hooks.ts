import React from "react";
import { GitreeContext } from "./GitreeContext";

export function useGitreeState() {
  const context = React.useContext(GitreeContext);
  if (!context) {
    throw Error("Gitree context not found");
  }
  return context.state;
}

const ACTIONS = {
  owner: "ownerFormActions",
  repository: "repositoryFormActions",
  branch: "branchFormActions",
  tree: "treeActions",
} as const;

export function useActions<T extends keyof typeof ACTIONS>(actionType: T) {
  const context = React.useContext(GitreeContext);
  if (!context) {
    throw Error("Gitree context not found");
  }
  return context[ACTIONS[actionType]];
}
