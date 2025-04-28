import { TreeRenderer } from "../../domain/TreeRenderer";
import { Node } from "../../types/Node";
import { Action, ActionTypes } from "../actions";

type SetHoveredNodeAction = Action<
  ActionTypes.SET_HOVERED_NODE,
  {
    hoveredNode: Node | null;
  }
>;

type SetMainNodeAction = Action<
  ActionTypes.SET_MAIN_NODE,
  {
    mainNode: Node | null;
  }
>;

type SetRendererAction = Action<
  ActionTypes.SET_RENDERER,
  {
    renderer: TreeRenderer;
  }
>;

export type TreeActions =
  | SetHoveredNodeAction
  | SetMainNodeAction
  | SetRendererAction;
