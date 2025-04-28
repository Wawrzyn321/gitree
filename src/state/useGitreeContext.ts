import React from "react";
import { GitreeContext } from "./GitreeContext";

export function useGitreeContext() {
  const context = React.useContext(GitreeContext);
  if (!context) {
    throw Error("Gitree context not found");
  }
  return context;
}
