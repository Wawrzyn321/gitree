export interface File {
  path: string;
  size: number;
}

export interface Tree {
  tree: {
    type: "blob" | "string";
    path: string;
    size: number;
  }[];
  truncated: boolean;
}

export interface Repository {
  name: string;
}

export interface Branch {
  name: string;
  commit: { sha: string };
}

export interface FileList {
  files: File[];
  truncated: boolean;
}
