import React from "react";

import { NodePanel } from "./NodePanel";
import "./TreePanel.scss";
import { useGitreeContext } from "../../state/useGitreeContext";

export function TreePanel() {
  const { state, setMainNode } = useGitreeContext();
  const { tree, mainNode, hoveredNode } = state.treeData;

  return (
    <div className="tree-panel">
      <section className="controls">
        <button disabled={!tree} onClick={() => setMainNode(tree)}>
          Reset
        </button>
        <button
          disabled={!tree || !mainNode?.parent}
          onClick={() => setMainNode(mainNode!.parent)}
        >
          Navigate up
        </button>
      </section>
      {mainNode && <NodePanel node={mainNode} showLink={true} />}
      {hoveredNode && <NodePanel node={hoveredNode} />}
    </div>
  );
}
