import { Tree } from './binary-tree.js';

const bsTree = new Tree([1,3,7,20,23,27,30])
bsTree.insert(0)
bsTree.insert(2)
bsTree.insert(8)
bsTree.insert(21)
bsTree.insert(26)
bsTree.insert(28)
bsTree.insert(72)
bsTree.deleteItem(2)
console.log(bsTree.root)