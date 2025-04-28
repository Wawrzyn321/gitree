import { Node } from "../types/Node";
import { GitHubFile } from "../api/ApiTypes";

const deflattenTree = (name: string, files: GitHubFile[]) => {
  const tree = new Node(name, "/", null, "dirs");
  for (const file of files) {
    const tokens = file.path.split("/");
    let curr: Node = tree;
    let path: string = "/";
    // build path
    for (let i = 0; i < tokens.length - 1; i++) {
      const token = tokens[i];
      let nextNode = curr.elements.find((n: Node) => n.path === token);
      if (!nextNode) {
        nextNode = new Node(token, path, curr, "dir");
        curr.elements.push(nextNode);
      }
      curr = nextNode;
      path += token + "/";
    }

    curr.elements.push(
      new Node(
        tokens[tokens.length - 1],
        file.path,
        curr,
        "file",
        file.size,
        true,
      ),
    );
  }
  return tree;
};

const calculateTreeSizes = (tree: Node) => {
  const size: number = tree.elements.reduce((acc: number, curr: Node) => {
    return acc + (curr.isLeaf ? curr.size : calculateTreeSizes(curr));
  }, 0);
  tree.size = size;
  return size;
};

export const buildTree = (name: string, files: GitHubFile[]) => {
  const tree = deflattenTree(name, files);
  calculateTreeSizes(tree);
  return tree;
};

export const partition = (node: Node): Node[] | null => {
  if (node.isLeaf) {
    throw Error(`Tried to partition a leaf node ${node.path} ${node.size}`);
  }

  // "as equal in __size__ as possible"
  const buckets: Node[] = Array(2)
    .fill(0)
    .map(
      () => new Node("PARTITION OF " + node.path, "", node, "dirs", 0, false),
    );

  const obj = node.elements;

  obj.sort((a, b) => b.size - a.size);
  for (const node of obj) {
    const minBucket: Node = buckets.find(
      (c) => c.size === Math.min(...buckets.map((cc) => cc.size)),
    )!;
    minBucket.elements.push(node);
    minBucket.size += node.size;
    minBucket.path = "";
  }
  return buckets;
};
