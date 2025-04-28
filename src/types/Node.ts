export type NodeType = "dir" | "file" | "dirs";

export class Node {
  elements: Node[];
  isTop = false;

  constructor(
    public path: string,
    public dirPath: string,
    public parent: Node | null,
    public type: NodeType,
    public size: number = 0,
    public isLeaf: boolean = false,
  ) {
    this.isLeaf = isLeaf;
    this.elements = [];
  }

  // return either leaf, or node with more than 1 child
  skipSingleDirs(): Node {
    if (this.isLeaf) return this;

    let node: Node = this;
    while (node.elements.length === 1) {
      node = node.elements[0];
    }
    return node;
  }
}
