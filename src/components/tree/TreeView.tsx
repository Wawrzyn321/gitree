import React from "react";

import { GitreeContext } from "../../state";
import { TreeRenderer } from "../../domain/TreeRenderer";
import { TreePath } from "./TreePath";
import "./TreeView.scss";
import { NodeLink } from "./NodeLink";
import { HelpBanner } from "./HelpBanner";
import useHasDarkTheme from "../../hooks/useHasDarkTheme";
import useColors from "../../hooks/useColors";

interface TreeViewProps {
  width: number;
  height: number;
}

export function TreeView({ width, height }: TreeViewProps) {
  const { state, setHoveredNode, setMainNode, setRenderer } = React.useContext(
    GitreeContext
  );
  const isDarkTheme = useHasDarkTheme();
  const colors = useColors();

  const { loading } = state.branchData;
  const { tree, mainNode, renderer } = state.treeData;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (tree && canvasRef.current) {
      setRenderer(
        new TreeRenderer(
          canvasRef.current,
          frontCanvasRef.current!,
          linkRef.current!,
          setHoveredNode,
          setMainNode,
          isDarkTheme,
          colors
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, tree]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => renderer?.draw(mainNode), [mainNode, renderer]);
  
  return (
    <>
      <div className="tree-view-container">
        {!mainNode && !loading && <HelpBanner />}
        {mainNode && <NodeLink node={mainNode} _ref={linkRef} />}
        <canvas ref={frontCanvasRef} width={width} height={height}></canvas>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseLeave={() => renderer?.hideSelection()}
          onClick={(e) => renderer?.click(e)}
          onMouseMove={(e) => renderer?.mouseMove(e)}
        ></canvas>
      </div>
      <TreePath />
    </>
  );
}
