import React from "react";

import { Branch } from "../types/GithubFile";
import { Node } from "../types/Node";

import { readFromStorage, saveToStorage } from "../domain/storage";
import { buildTree } from "../domain/fileTree";
import { fetchRepos, fetchBranches, fetchFiles } from "../api/api";
import { TreeRenderer } from "../domain/TreeRenderer";

import { AppState } from "./types";
import { actions } from "./actions";
import { reducer } from "./reducer";

const initialState: AppState = {
  userData: {
    name: readFromStorage(localStorage, "user") || "",
    token: readFromStorage(localStorage, "token") || "",
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
    setUser: (name: string) => {
      dispatch({ type: actions.SET_USER, name });
    },
    setToken: (token: string) => {
      dispatch({ type: actions.SET_TOKEN, token });
    },
    getRepos: async () => {
      dispatch({ type: actions.FETCH_REPOS });
      const { name, token } = state.userData;
      try {
        const repos = await fetchRepos(name, token);
        dispatch({ type: actions.SET_REPOS, error: "", repos });
        saveToStorage(localStorage, "user", name);
        saveToStorage(sessionStorage, "token", token);
      } catch (e) {
        dispatch({
          type: actions.SET_REPOS,
          error: `Can't fetch repos: ${e.message}.`,
          repos: [],
        });
      }
    },

    setRepo: (repo: string) => {
      dispatch({ type: actions.SET_REPO, repo });
    },
    getBranches: async () => {
      dispatch({ type: actions.FETCH_BRANCHES });
      const { name, token } = state.userData;
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

    setBranch: (branch: string) => {
      dispatch({ type: actions.SET_BRANCH, branch });
    },
    buildTree: async () => {
      dispatch({ type: actions.FETCH_FILES });
      const { name, token } = state.userData;
      const { repo } = state.repoData;
      const { branch } = state.branchData;
      try {
        const files = await fetchFiles(name, token, repo, branch!.commitSha);
        dispatch({
          type: actions.BUILD_TREE,
          error: "",
          files,
          tree: buildTree(files),
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
      const user = state.userData.name;
      const repo = state.repoData.repo;
      const branch = state.branchData.branch;
      return `https://github.com/${user}/${repo}/tree/${branch!.name}/${node.dirPath}`;
    }
  };

  return (
    <GitreeContext.Provider value={value}> {children} </GitreeContext.Provider>
  );
};
