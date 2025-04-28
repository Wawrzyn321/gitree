import { TreeRenderer } from "../domain/TreeRenderer";
import { Branch } from "../types/Branch";
import { Node } from "../types/Node";

export interface AppState {
  ownerData: {
    owner: string;
    token: string;
    error: string;
    loading: boolean;
    collapsed: boolean;
  };
  repoData: {
    repos: string[] | null;
    repo: string;
    error: string;
    loading: boolean;
    collapsed: boolean;
  };
  branchData: {
    branches: Branch[] | null;
    branch: Branch | null;
    error: string;
    loading: boolean;
    collapsed: boolean;
  };
  treeData: {
    files: string[];
    truncated: boolean;
    tree: Node | null;
    mainNode: Node | null;
    hoveredNode: Node | null;
    renderer: TreeRenderer | null;
  };
}
