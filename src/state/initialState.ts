import { loadOwner, loadToken } from "./storage";
import { AppState } from "./types";

export const initialState: AppState = {
  ownerData: {
    owner: loadOwner(),
    token: loadToken(),
    loading: false,
    error: null,
    collapsed: false,
  },
  repoData: {
    repos: [],
    repo: "",
    error: null,
    loading: false,
    collapsed: true,
  },
  branchData: {
    branches: [],
    branch: null,
    loading: false,
    error: null,
    collapsed: true,
  },
  treeData: {
    files: [],
    truncated: false,
    tree: null,
    mainNode: null,
    hoveredNode: null,
    renderer: null,
  },
};
