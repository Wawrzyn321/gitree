import { GithubFile } from './../types/GithubFile';

interface Node {
  __path__: string;
  __size__: number;
  elements: [];
}

export interface Bucket {
  elements: any;
  __size__: number;
}

const deflattenTree = (files: GithubFile[]) => {
  const tree = {};
  for (const t of files) {
    const tokens = t.path.split("/");
    let curr: any = tree;
    // build path
    for (let i = 0; i < tokens.length - 1; i++) {
      const token = tokens[i];
      if (!curr[token]) {
        curr[token] = {};
        // __path__: token 
      }
      curr = curr[token];
    }
    
    // create leaf
    curr[tokens[tokens.length - 1]] = {
      __path__: tokens[tokens.length - 1],
      __size__: t.size,
    };
  }
  return tree;
};

const isLeaf = (node: any) => Object.keys(node).length === 2 && !!node["__path__"];

const notFileProperties = (key: any) => key !== "__path__" && key !== "__size__";

const calculateTreeSizes = (tree: any) => {
  const size: number = Object.keys(tree)
    .filter(notFileProperties)
    .reduce((acc, curr) => {
      const node = tree[curr];
      return acc + (isLeaf(node) ? node.__size__ : calculateTreeSizes(node));
    }, 0);
  tree.__size__ = size;
  return size;
};

export const buildTree = (files: GithubFile[]) => {
  const tree = deflattenTree(files);
  calculateTreeSizes(tree);
  return tree;
};

export const partition = (obj: any, selector: (obj: any) => number): Bucket[] | null => {
  // "as equal in __size__ as possible"
  const buckets: Bucket[] = Array(2)
    .fill(0)
    .map(() => ({ elements: {}, __size__: 0 }));

  const entries = Object.entries(obj).filter(([k, _]) => notFileProperties(k));
  if (entries.length < 2) {
    return null;
  }

  entries.sort(([_aK, aV], [_bK, bV]) => selector(bV) - selector(aV));
  for (const [key, value] of entries) {
    const minBucket: Bucket = buckets.find(
      (c) => c.__size__ === Math.min(...buckets.map((cc) => cc.__size__))
    )!;
    minBucket.elements[key] = value;
    minBucket.__size__ += selector(value);
  }
  return buckets;
};
