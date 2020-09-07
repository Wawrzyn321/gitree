import { actions } from "./actions";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.SET_OWNER:
      const { name } = action;
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          name,
        },
      };
    case actions.SET_TOKEN:
      const { token } = action;
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          token,
        },
      };
    case actions.FETCH_REPOS:
      return {
        ...state,
        ownerData: {
          ...state.ownerData,
          loading: true,
        },
        repoData: {
          ...state.repoData,
          repos: [],
          repo: null,
        },
        branchData: {
          ...state.branchData,
          branches: [],
          branch: null,
        }
      };
    case actions.SET_REPOS: {
      const { error, repos } = action;
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
          repos,
          collapsed: !!error,
        },
      };
    }

    case actions.SET_REPO:
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
    case actions.FETCH_BRANCHES:
      return {
        ...state,
        repoData: {
          ...state.repoData,
          loading: true,
          error: "",
        },
        branchData: {
          ...state.branchData,
          branches: [],
          branch: null,
        },
      };
    case actions.SET_BRANCHES: {
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

    case actions.SET_BRANCH:
      const { branch } = action;
      return {
        ...state,
        branchData: {
          ...state.branchData,
          branch,
        },
      };
    case actions.FETCH_FILES:
      return {
        ...state,
        branchData: {
          ...state.branchData,
          loading: true,
          error: "",
        },
        treeData: {
          files: [],
          tree: null,
        },
      };
    case actions.BUILD_TREE:
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
          files,
          tree,
          truncated,
          mainNode: tree,
          hoveredNode: null,
        },
      };

    case actions.SET_HOVERED_NODE:
      const { hoveredNode } = action;
      return {
        ...state,
        treeData: {
          ...state.treeData,
          hoveredNode,
        },
      };

    case actions.SET_MAIN_NODE:
      const { mainNode } = action;
      return {
        ...state,
        treeData: {
          ...state.treeData,
          mainNode,
        },
      };
    case actions.SET_RENDERER:
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
