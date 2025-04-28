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

type SetOwnerFormCollapsedAction = {
  type: ActionTypes.SET_OWNER_FORM_COLLAPSED;
  collapsed: boolean;
};

type SetOwnerAction = {
  type: ActionTypes.SET_OWNER;
  owner: string;
};

type SetTokenAction = {
  type: ActionTypes.SET_TOKEN;
  token: string;
};

type FetchReposAction = {
  type: ActionTypes.FETCH_REPOS;
};

type SetReposAction = {
  type: ActionTypes.SET_REPOS;
  error: string | null;
  repos: string[] | null;
};

type SetRepoFormCollapsedAction = {
  type: ActionTypes.SET_REPO_FORM_COLLAPSED;
  collapsed: boolean;
};

type SetRepoAction = {
  type: ActionTypes.SET_REPO;
  repo: string;
};

type FetchBranchesAction = {
  type: ActionTypes.FETCH_BRANCHES;
};

type SetBranchesAction = {
  type: ActionTypes.SET_BRANCHES;
  error: string | null;
  branches: Branch[];
  branch: Branch | null;
};

type SetBranchCollapsedAction = {
  type: ActionTypes.SET_BRANCH_FORM_COLLAPSED;
  collapsed: boolean;
};

type SetBranchAction = {
  type: ActionTypes.SET_BRANCH;
  branch: Branch;
};

type FetchFilesAction = {
  type: ActionTypes.FETCH_FILES;
};

type BuildTreeAction = {
  type: ActionTypes.BUILD_TREE;
  tree: Node | null;
  files: FileList["files"];
  error: string | null;
  truncated: boolean;
};

type SetHoveredNodeAction = {
  type: ActionTypes.SET_HOVERED_NODE;
  hoveredNode: Node | null;
};

type SetMainNodeAction = {
  type: ActionTypes.SET_MAIN_NODE;
  mainNode: Node | null;
};

type SetRendererAction = {
  type: ActionTypes.SET_RENDERER;
  renderer: TreeRenderer;
};

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
