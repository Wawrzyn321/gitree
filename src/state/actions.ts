import { TreeRenderer } from "../domain/TreeRenderer";
import { Branch } from "../types/Branch";
import { FileList } from "../types/FileList";
import { Node } from "../types/Node";

export const actions = {
  SET_OWNER_FORM_COLLAPSED: "SET_OWNER_FORM_COLLAPSED",
  SET_OWNER: "SET_OWNER",
  SET_TOKEN: "SET_TOKEN",
  FETCH_REPOS: "FETCH_REPOS",
  SET_REPOS: "SET_REPOS",

  SET_REPO_FORM_COLLAPSED: "SET_REPO_FORM_COLLAPSED",
  SET_REPO: "SET_REPO",
  FETCH_BRANCHES: "FETCH_BRANCHES",
  SET_BRANCHES: "SET_BRANCHES",

  SET_BRANCH_FORM_COLLAPSED: "SET_BRANCH_FORM_COLLAPSED",
  SET_BRANCH: "SET_BRANCH",
  FETCH_FILES: "FETCH_FILES",
  BUILD_TREE: "BUILD_TREE",

  SET_RENDERER: "SET_RENDERER",
  REDRAW: "REDRAW",
  SET_HOVERED_NODE: "SET_HOVERED_NODE",
  SET_MAIN_NODE: "SET_MAIN_NODE",
} as const;

type SetOwnerFormCollapsedAction = {
  type: "SET_OWNER_FORM_COLLAPSED";
  collapsed: boolean;
};

type SetOwnerAction = {
  type: "SET_OWNER";
  owner: string;
};

type SetTokenAction = {
  type: "SET_TOKEN";
  token: string;
};

type FetchReposAction = {
  type: "FETCH_REPOS";
};

type SetReposAction = {
  type: "SET_REPOS";
  error: string | null;
  repos: string[] | null;
};

type SetRepoFormCollapsedAction = {
  type: "SET_REPO_FORM_COLLAPSED";
  collapsed: boolean;
};

type SetRepoAction = {
  type: "SET_REPO";
  repo: string;
};

type FetchBranchesAction = {
  type: "FETCH_BRANCHES";
};

type SetBranchesAction = {
  type: "SET_BRANCHES";
  error: string | null;
  branches: Branch[];
  branch: Branch | null;
};

type SetBranchCollapsedAction = {
  type: "SET_BRANCH_FORM_COLLAPSED";
  collapsed: boolean;
};

type SetBranchAction = {
  type: "SET_BRANCH";
  branch: Branch;
};

type FetchFilesAction = {
  type: "FETCH_FILES";
};

type BuildTreeAction = {
  type: "BUILD_TREE";
  tree: Node | null;
  files: FileList["files"];
  error: string | null;
  truncated: boolean;
};

type SetHoveredNodeAction = {
  type: "SET_HOVERED_NODE";
  hoveredNode: Node | null;
};

type SetMainNodeAction = {
  type: "SET_MAIN_NODE";
  mainNode: Node | null;
};

type SetRendererAction = {
  type: "SET_RENDERER";
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
