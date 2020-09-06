import { TreeRenderer } from "../domain/TreeRenderer";
import { Branch } from "../types/GithubFile";

export 
interface AppState {
  userData: {
    name: string;
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
    tree: Node | null;
    hoveredNode: Node | null;
    renderer: TreeRenderer | null;
  };
}