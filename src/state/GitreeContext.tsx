import React from "react";

import { Branch } from "../types/Branch";
import { Node } from "../types/Node";

import { buildTree } from "../domain/fileTree";
import { fetchRepoNames, fetchBranches, fetchFiles } from "../api/api";
import { TreeRenderer } from "../domain/TreeRenderer";

import { GitreeContextType } from "./types";
import { actions } from "./actions";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { storeOwner, storeToken } from "./storage";

export const GitreeContext = React.createContext<GitreeContextType | null>(
  null,
);

export const GitreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value: GitreeContextType = {
    state,
    setOwnerFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: actions.SET_OWNER_FORM_COLLAPSED, collapsed });
    },
    setOwner: (owner: string) => {
      dispatch({ type: actions.SET_OWNER, owner });
    },
    setToken: (token: string) => {
      dispatch({ type: actions.SET_TOKEN, token });
    },
    getRepos: async () => {
      dispatch({ type: actions.FETCH_REPOS });
      const { owner, token } = state.ownerData;
      try {
        const repos = await fetchRepoNames(owner, token);
        if (!repos.length) {
          dispatch({
            type: actions.SET_REPOS,
            error:
              "This user appears to have no repos. Why don't you try another one?",
            repos,
          });
        } else {
          dispatch({ type: actions.SET_REPOS, error: null, repos });
          storeOwner(owner);
          storeToken(token);
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatch({
            type: actions.SET_REPOS,
            error: `Can't fetch repos: ${e.message}.`,
            repos: [],
          });
        } else {
          throw e;
        }
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
      const { owner, token } = state.ownerData;
      const { repo } = state.repoData;
      try {
        if (!repo) {
          throw Error("Repo is not defined");
        }

        const branches = await fetchBranches(owner, token, repo);
        if (!branches.length) {
          dispatch({
            type: actions.SET_BRANCHES,
            error:
              "This repo appears to have no branches. Why don't you try another one?",
            branches,
            branch: null,
          });
        } else {
          const masterBranch = branches.find(
            (b: Branch) => b.name === "master" || b.name === "main",
          );
          dispatch({
            type: actions.SET_BRANCHES,
            error: null,
            branches,
            branch: masterBranch ?? null,
          });
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatch({
            type: actions.SET_BRANCHES,
            error: `Can't fetch branches: ${e.message}.`,
            branches: [],
            branch: null,
          });
        } else {
          throw e;
        }
      }
    },

    setBranchFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: actions.SET_BRANCH_FORM_COLLAPSED, collapsed });
    },
    setBranch: (branch: Branch) => {
      dispatch({ type: actions.SET_BRANCH, branch });
    },
    buildTree: async () => {
      dispatch({ type: actions.FETCH_FILES });
      const { owner, token } = state.ownerData;
      const { repo } = state.repoData;
      const { branch } = state.branchData;
      try {
        if (!repo) {
          throw Error("Repo is not defined");
        }

        const { files, truncated } = await fetchFiles(
          owner,
          token,
          repo,
          branch!.commitSha,
        );

        dispatch({
          type: actions.BUILD_TREE,
          error: null,
          files,
          tree: buildTree(`${repo}@${branch!.name}`, files),
          truncated,
        });
      } catch (e) {
        if (e instanceof Error) {
          dispatch({
            type: actions.BUILD_TREE,
            error: `Can't fetch files: ${e.message}.`,
            files: [],
            tree: null,
            truncated: false,
          });
        } else {
          throw e;
        }
      }
    },

    setRenderer: (renderer: TreeRenderer) => {
      dispatch({ type: actions.SET_RENDERER, renderer });
    },
    setHoveredNode: (hoveredNode: Node | null) => {
      dispatch({ type: actions.SET_HOVERED_NODE, hoveredNode });
    },
    setMainNode: (mainNode: Node | null) => {
      dispatch({ type: actions.SET_MAIN_NODE, mainNode });
    },
  };

  return (
    <GitreeContext.Provider value={value}> {children} </GitreeContext.Provider>
  );
};
