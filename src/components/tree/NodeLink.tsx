import React, { ForwardedRef, forwardRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import useColors from "../../hooks/useColors";
import { Node } from "../../types/Node";
import { AppState } from "../../state/types";
import { useGitreeState } from "../../state/hooks";

interface NodeLinkProps {
  node: Node;
}

function getNodeUrl(node: Node, state: AppState) {
  const owner = state.ownerData.owner;
  const repoName = state.repoData.repoName;
  const branch = state.branchData.branch;
  if (!branch) {
    return undefined;
  }
  return `https://github.com/${owner}/${repoName}/tree/${branch!.name}/${
    node.dirPath
  }`;
}

export const NodeLink = forwardRef(function (
  { node }: NodeLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const state = useGitreeState();
  const { action } = useColors();

  return (
    <a
      href={getNodeUrl(node, state)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open on GitHub"
      ref={ref}
    >
      <FontAwesomeIcon color={action} icon={faExternalLinkAlt} />
    </a>
  );
});
