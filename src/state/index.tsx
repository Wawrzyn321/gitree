import React from "react";

import { Branch } from "../types/Branch";
import { Node } from "../types/Node";

import { readFromStorage, saveToStorage } from "../domain/storage";
import { buildTree } from "../domain/fileTree";
import { fetchRepos, fetchBranches, fetchFiles } from "../api/api";
import { TreeRenderer } from "../domain/TreeRenderer";

import { AppState } from "./types";
import { actions } from "./actions";
import { reducer } from "./reducer";

const OWNER_KEY = "owner";
const TOKEN_KEY = "token";

const initialState: AppState = {
  ownerData: {
    name: readFromStorage(localStorage, OWNER_KEY) || "",
    token: readFromStorage(sessionStorage, TOKEN_KEY) || "",
    loading: false,
    error: "",
    collapsed: false,
  },
  repoData: {
    repos: [],
    repo: "",
    error: "",
    loading: false,
    collapsed: true,
  },
  branchData: {
    branches: [],
    branch: null,
    loading: false,
    error: "",
    collapsed: true,
  },
  treeData: {
    files: [],
    truncated: false,
    tree: null,
    hoveredNode: null,
    renderer: null,
  },
};

export const GitreeContext = React.createContext<any>(null);

export const Provider = (a: any) => {
  const children = a.children;
  const [state, dispatch]: [AppState, any] = React.useReducer(
    reducer,
    initialState
  );
  const value = {
    state,
    setOwnerFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: actions.SET_OWNER_FORM_COLLAPSED, collapsed });
    },
    setOwner: (name: string) => {
      dispatch({ type: actions.SET_OWNER, name });
    },
    setToken: (token: string) => {
      dispatch({ type: actions.SET_TOKEN, token });
    },
    getRepos: async () => {
      dispatch({ type: actions.FETCH_REPOS });
      const { name, token } = state.ownerData;
      try {
        const repos = await fetchRepos(name, token);
        dispatch({ type: actions.SET_REPOS, error: "", repos });
        saveToStorage(localStorage, OWNER_KEY, name);
        saveToStorage(sessionStorage, TOKEN_KEY, token);
      } catch (e) {
        dispatch({
          type: actions.SET_REPOS,
          error: `Can't fetch repos: ${e.message}.`,
          repos: [],
        });
      }
    },

    setRepoFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: actions.SET_REPO_FORM_COLLAPSED, collapsed });
    },
    setRepo: (repo: string) => {
      dispatch({ type: actions.SET_REPO, repo });
    },
    getBranches: async () => {
      dispatch({ type: actions.FETCH_BRANCHES });
      const { name, token } = state.ownerData;
      const { repo } = state.repoData;
      try {
        const branches = await fetchBranches(name, token, repo);
        dispatch({
          type: actions.SET_BRANCHES,
          error: "",
          branches,
          branch: branches.find((b: Branch) => (b.name = "master")),
        });
      } catch (e) {
        dispatch({
          type: actions.SET_BRANCHES,
          error: `Can't fetch branches: ${e.message}.`,
          branches: [],
        });
      }
    },

    setBranchFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: actions.SET_BRANCH_FORM_COLLAPSED, collapsed });
    },
    setBranch: (branch: string) => {
      dispatch({ type: actions.SET_BRANCH, branch });
    },
    buildTree: async () => {
      dispatch({ type: actions.FETCH_FILES });
      const { name, token } = state.ownerData;
      const { repo } = state.repoData;
      const { branch } = state.branchData;
      try {
        const { files, truncated } = await fetchFiles(
          name,
          token,
          repo,
          branch!.commitSha
        );
        dispatch({
          type: actions.BUILD_TREE,
          error: "",
          files,
          tree: buildTree(files),
          truncated,
        });
      } catch (e) {
        dispatch({
          type: actions.BUILD_TREE,
          error: `Can't fetch files: ${e.message}.`,
          files: [],
          tree: null,
        });
      }
    },

    setRenderer: (renderer: TreeRenderer) => {
      dispatch({ type: actions.SET_RENDERER, renderer });
    },
    setHoveredNode: (hoveredNode: Node) => {
      dispatch({ type: actions.SET_HOVERED_NODE, hoveredNode });
    },
    setMainNode: (mainNode: Node) => {
      dispatch({ type: actions.SET_MAIN_NODE, mainNode });
    },
    // it should be an action, but having all the state here, it's too enticing...
    getUrl: (node: Node) => {
      const owner = state.ownerData.name;
      const repo = state.repoData.repo;
      const branch = state.branchData.branch;
      if (!branch) return;
      return `https://github.com/${owner}/${repo}/tree/${branch!.name}/${
        node.dirPath
      }`;
    },
  };

  return (
    <GitreeContext.Provider value={value}> {children} </GitreeContext.Provider>
  );
};
