import React from "react";

import { GitreeContext } from "../../state";
import { Node } from "../../types/Node";
import "./TreePath.scss";

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
  const {
    state: {
      treeData: { mainNode },
    },
    setMainNode,
  } = React.useContext(GitreeContext);

  if (!mainNode) {
    return null;
  }

  const path = createPath(mainNode);

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
      <p>Tip: Press SHIFT to select individual files.</p>
    </div>
  );
}
