import { TreeRenderer } from "../domain/TreeRenderer";
import { Branch } from "../types/Branch";
import { FileList } from "../types/FileList";
import { Node } from "../types/Node";

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

type Action<ActionTypes, TActionData = {}> = {
  type: ActionTypes;
} & TActionData;

type SetOwnerFormCollapsedAction = Action<
  ActionTypes.SET_OWNER_FORM_COLLAPSED,
  {
    collapsed: boolean;
  }
>;

type SetOwnerAction = Action<
  ActionTypes.SET_OWNER,
  {
    owner: string;
  }
>;

type SetTokenAction = Action<
  ActionTypes.SET_TOKEN,
  {
    token: string;
  }
>;

type FetchReposAction = Action<ActionTypes.FETCH_REPOS>;

type SetReposAction = Action<
  ActionTypes.SET_REPOS,
  {
    error: string | null;
    repoNames: string[] | null;
  }
>;

type SetRepoFormCollapsedAction = Action<
  ActionTypes.SET_REPO_FORM_COLLAPSED,
  {
    collapsed: boolean;
  }
>;

type SetRepoAction = Action<
  ActionTypes.SET_REPO,
  {
    repoName: string;
  }
>;

type FetchBranchesAction = Action<ActionTypes.FETCH_BRANCHES>;

type SetBranchesAction = Action<
  ActionTypes.SET_BRANCHES,
  {
    error: string | null;
    branches: Branch[];
    branch: Branch | null;
  }
>;

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

export type Actions =
  | SetOwnerFormCollapsedAction
  | SetOwnerAction
  | SetTokenAction
  | FetchReposAction
  | SetReposAction
  | SetRepoFormCollapsedAction
  | SetRepoAction
  | FetchBranchesAction
  | SetBranchesAction
  | SetBranchCollapsedAction
  | SetBranchAction
  | FetchFilesAction
  | BuildTreeAction
  | SetHoveredNodeAction
  | SetMainNodeAction
  | SetRendererAction;
