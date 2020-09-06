export interface GithubFile {
    path: string;
    size: number;
}

export interface GithubTreeNode {
    type: 'blob' | 'string';
    path: string;
    size: number;
}

export interface GithubRepository {
    name: string;
}

export interface GithubCommit {
    sha: string;
}

export interface GithubBranch {
    name: string;
    commit: GithubCommit;
}

export interface PossiblyTruncatedFiles {
    files: GithubFile[];
    truncated: boolean;
}