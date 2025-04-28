export interface FileList {
  files: {
    path: string;
    size: number;
  }[];
  truncated: boolean;
}
