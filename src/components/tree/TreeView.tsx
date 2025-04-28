import React from "react";

import { TreeRenderer } from "../../domain/TreeRenderer";
import { TreePath } from "./TreePath";
import "./TreeView.scss";
import { NodeLink } from "./NodeLink";
import { HelpBanner } from "./HelpBanner";
import useHasDarkTheme from "../../hooks/useHasDarkTheme";
import useColors from "../../hooks/useColors";
import { useActions, useGitreeState } from "../../state/hooks";

interface TreeViewProps {
  width: number;
  height: number;
}

export function TreeView({ width, height }: TreeViewProps) {
  const { branchData, treeData } = useGitreeState();
  const { setHoveredNode, setMainNode, setRenderer } = useActions("tree");
  const isDarkTheme = useHasDarkTheme();
  const colors = useColors();

  const { tree, mainNode, renderer } = treeData;

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
          colors,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, tree]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (mainNode && renderer) {
      renderer.draw(mainNode);
    }
  }, [mainNode, renderer]);

  return (
    <>
      <div className="tree-view-container">
        {!mainNode && !branchData.loading && <HelpBanner />}
        {mainNode && <NodeLink node={mainNode} ref={linkRef} />}
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
