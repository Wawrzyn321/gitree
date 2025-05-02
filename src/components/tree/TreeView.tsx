import React, { useRef } from "react";

import { TreeRenderer } from "../../domain/TreeRenderer";
import { TreePath } from "./TreePath";
import "./TreeView.scss";
import { NodeLink } from "./NodeLink";
import { HelpBanner } from "./HelpBanner";
import useHasDarkTheme from "../../hooks/useHasDarkTheme";
import useColors from "../../hooks/useColors";
import { useActions, useGitreeState } from "../../state/hooks";
import { Point2 } from "../../types/Point2";

interface TreeViewProps {
  width: number;
  height: number;
}

export function TreeView({ width, height }: TreeViewProps) {
  const { branchData, treeData } = useGitreeState();
  const { setHoveredNode, setMainNode } = useActions("tree");
  const isDarkTheme = useHasDarkTheme();
  const colors = useColors();

  const renderer = useRef<TreeRenderer | null>(null);

  const { mainNode } = treeData;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  function getOrCreateRenderer() {
    if (canvasRef.current) {
      renderer.current = new TreeRenderer(
        canvasRef.current,
        frontCanvasRef.current!,
        linkRef.current!,
        setHoveredNode,
        setMainNode,
        isDarkTheme,
        colors,
      );
    }
    return renderer.current;
  }

  React.useEffect(() => {
    if (mainNode) {
      getOrCreateRenderer()?.draw(mainNode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainNode]);
  console.log(linkRef);
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
          onMouseLeave={() => renderer.current?.hideSelection()}
          onClick={(e) => {
            e.preventDefault();
            renderer.current?.click();
          }}
          onMouseMove={(e) => {
            const { offsetX, offsetY } = e.nativeEvent;
            renderer.current?.mouseMove(new Point2(offsetX, offsetY), {
              firstLevelPaths: !e.shiftKey,
              showSubdivPaths: e.ctrlKey,
            });
          }}
        ></canvas>
      </div>
      <TreePath />
    </>
  );
}
