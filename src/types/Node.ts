export type NodeType = 'dir' | 'file' | 'dirs';

export class Node {
  path: string;
  dirPath: string;
  parent: Node | null;
  size: number;
  elements: Node[];
  isLeaf: boolean;
  type: NodeType;
  firstFlag: boolean = false;

  constructor(path: string, dirPath: string, parent: Node | null, type: NodeType, size: number = 0, isLeaf: boolean = false) {
    this.path = path;
    this.dirPath = dirPath;
    this.parent = parent;
    this.type = type;
    this.size = size;
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
