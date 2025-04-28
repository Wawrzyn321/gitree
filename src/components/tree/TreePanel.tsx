import React from "react";

import { GitreeContext } from "../../state";
import { NodePanel } from "./NodePanel";
import "./TreePanel.scss";

export function TreePanel() {
  const { state, setMainNode } = React.useContext(GitreeContext);
  const { tree, mainNode, hoveredNode } = state.treeData;

  return (
    <div className="tree-panel">
      <section className="controls">
        <button disabled={!tree} onClick={() => setMainNode(tree)}>
          Reset
        </button>
        <button
          disabled={!tree || !mainNode.parent}
          onClick={() => setMainNode(mainNode.parent)}
        >
          Navigate up
        </button>
      </section>
      <NodePanel node={mainNode} showLink={true} />
      <NodePanel node={hoveredNode} />
    </div>
  );
}
