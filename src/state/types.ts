import { TreeRenderer } from "../domain/TreeRenderer";
import { Branch } from "../types/Branch";
import { FileList } from "../types/FileList";
import { Node } from "../types/Node";

export interface AppState {
  ownerData: {
    owner: string;
    token: string;
    error: string | null;
    loading: boolean;
    collapsed: boolean;
  };
  repoData: {
    repoNames: string[] | null;
    repoName: string | null;
    error: string | null;
    loading: boolean;
    collapsed: boolean;
  };
  branchData: {
    branches: Branch[] | null;
    branch: Branch | null;
    error: string | null;
    loading: boolean;
    collapsed: boolean;
  };
  treeData: {
    files: FileList["files"];
    truncated: boolean;
    tree: Node | null;
    mainNode: Node | null;
    hoveredNode: Node | null;
    renderer: TreeRenderer | null;
  };
}

type Actions = {
  setOwnerFormCollapsed(collapsed: boolean): void;
  setOwner(owner: string): void;
  setToken(token: string): void;
  getRepos(): Promise<void>;
  setRepoFormCollapsed(collapsed: boolean): void;
  setRepoName(repoName: string): void;
  getBranches(): Promise<void>;
  setBranchFormCollapsed(collapsed: boolean): void;
  setBranch(branch: Branch): void;
  buildTree(): Promise<void>;
  setRenderer(renderer: TreeRenderer): void;
  setHoveredNode(hoveredNode: Node | null): void;
  setMainNode(mainNode: Node | null): void;
};

export type GitreeContextType = {
  state: AppState;
} & Actions;
