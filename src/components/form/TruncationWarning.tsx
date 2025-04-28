import React from "react";
import { useGitreeState } from "../../state/hooks";

export function TruncationWarning() {
  const { treeData } = useGitreeState();

  if (!treeData.truncated) {
    return null;
  }

  return (
    <p>
      It looks like GitHub API response is truncated. Provide your API token to
      fetch all the data.
    </p>
  );
}
