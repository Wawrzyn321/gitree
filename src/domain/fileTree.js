const deflattenTree = (files) => {
  const tree = {};
  for (const t of files) {
    const tokens = t.path.split("/");
    let curr = tree;
    // build path
    for (let i = 0; i < tokens.length - 1; i++) {
      const token = tokens[i];
      if (!curr[token]) {
        curr[token] = {};
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

const isLeaf = (node) => Object.keys(node).length === 2 && !!node["__path__"];

const notFileProperties = (key) => key !== "__path__" && key !== "__size__";

const calculateTreeSizes = (tree) => {
  const size = Object.keys(tree)
    .filter(notFileProperties)
    .reduce((acc, curr) => {
      const node = tree[curr];
      return acc + (isLeaf(node) ? node.__size__ : calculateTreeSizes(node));
    }, 0);
  tree.__size__ = size;
  return size;
};

export const buildTree = (files) => {
  const tree = deflattenTree(files);
  calculateTreeSizes(tree);
  return tree;
};

export const partition = (obj, selector) => {
  // "as equal in __size__ as possible"
  const buckets = Array(2)
    .fill(0)
    .map(() => ({ elements: {}, __size__: 0 }));

  const entries = Object.entries(obj).filter(([k, _]) => notFileProperties(k));
  if (entries.length < 2) {
    return null;
  }

  entries.sort(([_aK, aV], [_bK, bV]) => selector(bV) - selector(aV));
  for (const [key, value] of entries) {
    const minBucket = buckets.find(
      (c) => c.__size__ === Math.min(...buckets.map((cc) => cc.__size__))
    );
    minBucket.elements[key] = value;
    minBucket.__size__ += selector(value);
  }
  return buckets;
};