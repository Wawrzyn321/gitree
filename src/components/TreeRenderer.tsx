import React from "react";
import { TreeRenderer } from "../domain/TreeRenderer";
import "./TreeRenderer.scss";

interface TreeRendererProps {
  tree: any;
  width: number;
  height: number;
}

let treeRenderer: TreeRenderer;

export function TreeView(props: TreeRendererProps) {
  const { tree, width, height } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const selectionRef = React.useRef<SVGRectElement>(null);
  const selectionTitleRef = React.useRef<SVGTextElement>(null);

  React.useEffect(() => {
    if (
      canvasRef.current &&
      selectionRef.current &&
      selectionTitleRef.current
    ) {
      treeRenderer = new TreeRenderer(
        canvasRef.current,
        selectionRef.current,
        selectionTitleRef.current
      );
    }
  }, [canvasRef, selectionRef, selectionTitleRef]);

  React.useEffect(() => {
    treeRenderer.draw(tree);
  }, [tree]);

  return (
    <>
      <button onClick={() => treeRenderer.draw(tree)}>Reset</button>
      <div className="tree-view-container">
        <svg width={width} height={height} className="svg-over-tree">
          <rect
            ref={selectionRef}
            fill="transparent"
            strokeWidth="5"
            stroke="white"
          />
          <text ref={selectionTitleRef} x="20" y="35" fill="white">iksde.png</text>
        </svg>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="tree-canvas"
          onMouseLeave={() => treeRenderer?.hideSelection()}
          onClick={() => treeRenderer?.click()}
          onMouseMove={e => treeRenderer?.mouseMove(e)}
        ></canvas>
      </div>
    </>
  );
}
