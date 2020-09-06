import React from "react";

import { GitreeContext } from "../../state";
import { TreeRenderer } from "../../domain/TreeRenderer";
import "./TreeView.scss";
import { TreePath } from "./TreePath";

interface TreeViewProps {
  width: number;
  height: number;
}

export function TreeView({ width, height }: TreeViewProps) {
  const {
    state,
    setHoveredNode,
    setMainNode,
    setRenderer,
  } = React.useContext(GitreeContext);
  const { tree, mainNode, renderer } = state.treeData;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const selectionRef = React.useRef<SVGRectElement>(null);
  const selectionTitleRef = React.useRef<SVGTextElement>(null);

  React.useEffect(() => {
    if (
      tree &&
      canvasRef.current &&
      selectionRef.current &&
      selectionTitleRef.current
    ) {
      setRenderer(
        new TreeRenderer(
          canvasRef.current,
          selectionRef.current,
          selectionTitleRef.current,
          setHoveredNode,
          setMainNode
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, selectionRef, selectionTitleRef, tree]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => renderer?.draw(mainNode), [mainNode, renderer]);
  
  return (
    <>
      <div className="tree-view-container">
        <svg width={width} height={height}>
          <rect ref={selectionRef} />
          <text ref={selectionTitleRef} />
        </svg>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseLeave={() => renderer?.hideSelection()}
          onClick={e => renderer?.click(e)}
          onMouseMove={(e) => renderer?.mouseMove(e)}
        ></canvas>
      </div>
      <TreePath />
    </>
  );
}
