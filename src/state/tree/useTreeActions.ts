import { Node } from "../../types/Node";
import { Actions, ActionTypes } from "../actions";
import { TreeActions } from "../types";

export function useTreeActions(
  dispatch: React.ActionDispatch<[action: Actions]>,
): TreeActions {
  return {
    setHoveredNode: (hoveredNode: Node | null) => {
      dispatch({ type: ActionTypes.SET_HOVERED_NODE, hoveredNode });
    },
    setMainNode: (mainNode: Node | null) => {
      dispatch({ type: ActionTypes.SET_MAIN_NODE, mainNode });
    },
  };
}
