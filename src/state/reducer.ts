import { Actions, ActionTypes } from "./actions";
import { AppState } from "./types";

export const reducer = (state: AppState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_OWNER_FORM_COLLAPSED: {
      const { collapsed } = action;
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          collapsed,
        },
      };
    }
    case ActionTypes.SET_OWNER:
      const { owner } = action;
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          collapsed: false,
          owner,
        },
      };
    case ActionTypes.SET_TOKEN:
      const { token } = action;
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          token,
        },
      };
    case ActionTypes.FETCH_REPOS:
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          loading: true,
        },
        repoData: {
          ...state.repoData,
          repoNames: [],
          repo: null,
        },
        branchData: {
          ...state.branchData,
          branches: [],
          branch: null,
        },
      };
    case ActionTypes.SET_REPOS: {
      const { error, repoNames } = action;
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          error,
          loading: false,
          collapsed: !error,
        },
        repoData: {
          ...state.repoData,
          repoNames,
          collapsed: !!error,
        },
      };
    }

    case ActionTypes.SET_REPO_FORM_COLLAPSED: {
      const { collapsed } = action;
      return {
        ...state,
        repoData: {
          ...state.repoData,
          collapsed,
        },
      };
    }
    case ActionTypes.SET_REPO:
      const { repo } = action;
      return {
        ...state,
        repoData: {
          ...state.repoData,
          repo,
        },
        treeData: {
          ...state.treeData,
          ...(repo !== state.repoData.repo ? { files: [] } : {}),
        },
      };
    case ActionTypes.FETCH_BRANCHES:
      return {
        ...state,
        repoData: {
          ...state.repoData,
          loading: true,
          error: null,
        },
        branchData: {
          ...state.branchData,
          branches: [],
          branch: null,
        },
      };
    case ActionTypes.SET_BRANCHES: {
      const { error, branches, branch } = action;
      return {
        ...state,
        repoData: {
          ...state.repoData,
          error,
          loading: false,
          collapsed: !error,
        },
        branchData: {
          ...state.branchData,
          loading: false,
          branches,
          branch,
          collapsed: !!error,
        },
      };
    }

    case ActionTypes.SET_BRANCH_FORM_COLLAPSED: {
      const { collapsed } = action;
      return {
        ...state,
        branchData: {
          ...state.branchData,
          collapsed,
        },
      };
    }
    case ActionTypes.SET_BRANCH:
      const { branch } = action;
      return {
        ...state,
        branchData: {
          ...state.branchData,
          branch,
        },
      };
    case ActionTypes.FETCH_FILES:
      return {
        ...state,
        branchData: {
          ...state.branchData,
          loading: true,
          error: null,
        },
        treeData: {
          ...state.treeData,
          files: [],
          tree: null,
        },
      };
    case ActionTypes.BUILD_TREE:
      const { tree, files, error, truncated } = action;
      return {
        ...state,
        branchData: {
          ...state.branchData,
          loading: false,
          error,
          collapsed: !error && !truncated,
        },
        treeData: {
          ...state.treeData,
          files,
          tree,
          truncated,
          mainNode: tree,
          hoveredNode: null,
        },
      };

    case ActionTypes.SET_HOVERED_NODE:
      const { hoveredNode } = action;
      return {
        ...state,
        treeData: {
          ...state.treeData,
          hoveredNode,
        },
      };

    case ActionTypes.SET_MAIN_NODE:
      const { mainNode } = action;
      return {
        ...state,
        treeData: {
          ...state.treeData,
          mainNode,
        },
      };
    case ActionTypes.SET_RENDERER:
      const { renderer } = action;
      return {
        ...state,
        treeData: {
          ...state.treeData,
          renderer,
        },
      };

    default:
      console.warn("unhandled state: ", action);
      return state;
  }
};
