export interface GitHubFile {
  path: string;
  size: number;
}

export interface GitHubTreeNode {
  type: "blob" | "string";
  path: string;
  size: number;
}

export interface GitHubRepository {
  name: string;
}

export interface GitHubCommit {
  sha: string;
}

export interface GitHubBranch {
  name: string;
  commit: GitHubCommit;
}

export interface PossiblyTruncatedFiles {
  files: GitHubFile[];
  truncated: boolean;
}
