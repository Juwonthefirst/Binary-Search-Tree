import { Tree } from './binary-tree.js';

const bsTree = new Tree([1,3,7,20,23,27,30])
bsTree.insert(0)
bsTree.insert(2)
bsTree.insert(8)
bsTree.insert(21)
bsTree.insert(22)
bsTree.insert(28)
bsTree.insert(72)
//bsTree.deleteItem(27)
/*bsTree.postorder((node) => {
	console.log(node.value)
})*/
console.log(bsTree.height(27))
console.log(bsTree)