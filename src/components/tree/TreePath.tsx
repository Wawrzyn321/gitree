import React from "react";

import { Node } from "../../types/Node";
import "./TreePath.scss";
import { useActions, useGitreeState } from "../../state/hooks";

const createPath = (node: Node): Node[] => {
  const pathSegments: Node[] = [];
  let currentNode: Node | null = node;
  do {
    pathSegments.unshift(currentNode);
    currentNode = currentNode.parent;
  } while (currentNode !== null);
  return pathSegments;
};

export function TreePath() {
  const { treeData } = useGitreeState();
  const { setMainNode } = useActions("tree");

  if (!treeData.mainNode) {
    return null;
  }

  const path = createPath(treeData.mainNode);

  return (
    <div className="tree-path">
      {path.map((node) => (
        <button
          className="link"
          key={`${node.dirPath}/${node.path}`}
          onClick={() => setMainNode(node)}
        >
          {node.path}
        </button>
      ))}
      <i>Tip: Press SHIFT to select individual files.</i>
    </div>
  );
}
