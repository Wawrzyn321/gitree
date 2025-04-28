import { OwnerFormActions } from "./owner/types";
import { RepositoryFormActions } from "./repository/types";
import { BranchFormActions } from "./branch/types";
import { TreeActions } from "./treeActions/types";

export enum ActionTypes {
  SET_OWNER_FORM_COLLAPSED,
  SET_OWNER,
  SET_TOKEN,
  FETCH_REPOS,
  SET_REPOS,

  SET_REPO_FORM_COLLAPSED,
  SET_REPO,
  FETCH_BRANCHES,
  SET_BRANCHES,

  SET_BRANCH_FORM_COLLAPSED,
  SET_BRANCH,
  FETCH_FILES,
  BUILD_TREE,

  SET_RENDERER,
  REDRAW,
  SET_HOVERED_NODE,
  SET_MAIN_NODE,
}

export type Action<ActionTypes, TActionData = {}> = {
  type: ActionTypes;
} & TActionData;

export type Actions =
  | OwnerFormActions
  | RepositoryFormActions
  | BranchFormActions
  | TreeActions;
