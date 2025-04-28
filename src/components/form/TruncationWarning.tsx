import React from "react";
import { useGitreeContext } from "../../state/useGitreeContext";

export function TruncationWarning() {
  const {
    state: { treeData },
  } = useGitreeContext();

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
