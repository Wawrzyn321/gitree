import { Branch } from "../../types/Branch";
import { FileList } from "../../types/FileList";
import { Node } from "../../types/Node";
import { Action, ActionTypes } from "../actions";

type SetBranchCollapsedAction = Action<
  ActionTypes.SET_BRANCH_FORM_COLLAPSED,
  {
    collapsed: boolean;
  }
>;

type SetBranchAction = Action<
  ActionTypes.SET_BRANCH,
  {
    branch: Branch;
  }
>;

type FetchFilesAction = Action<ActionTypes.FETCH_FILES>;

type BuildTreeAction = Action<
  ActionTypes.BUILD_TREE,
  {
    tree: Node | null;
    files: FileList["files"];
    error: string | null;
    truncated: boolean;
  }
>;

export type BranchFormActions =
  | BuildTreeAction
  | SetBranchCollapsedAction
  | SetBranchAction
  | FetchFilesAction;
