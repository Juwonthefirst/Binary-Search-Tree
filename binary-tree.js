import { LinkedList } from './linked-list.js';

class Node {
	constructor(value) {
		this.value = value
		this.leftNode = null
		this.rightNode = null
	}
}

const cleanUpArray = function(array) {
	return [...new Set(array)].sort((a, b) => a - b)
}

const buildTree = function(array, start = 0, end = array.length - 1) {
	
	if (start > end) {
		return null;
	}
	
	const mid = start + Math.floor((end - start) / 2)
	const node = new Node(array[mid])
	node.leftNode = buildTree(array, start, mid - 1)
	node.rightNode = buildTree(array, mid + 1, end)
	return node
}


export class Tree {
	constructor(array) {
		this.array = cleanUpArray(array)
		this.root = buildTree(this.array)
		this.queue = new LinkedList()
		this.queue.append(this.root)
	}
	
	#getSuccessorAndParent(node, previous = null) {
		if (node.leftNode === null) {
			return [previous, node]
		}
		return this.#getSuccessorAndParent(node.leftNode, node)
	}
	
	#traverse(value, node = this.root, parentNode = null) {
		if (node.value === value) {
			return [node, parentNode]
		}
		return (node.value > value) ? this.#traverse(value, node.leftNode, node) : this.#traverse(value, node.rightNode, node)
	}
	
	find(value, node = this.root) {
		if (node === null) {
			return null
		}
		if (node.value === value) {
			return node
		}
		return (node.value > value) ? this.find(value, node.leftNode) : this.find(value, node.rightNode)
	}
	
	insert(value, node = this.root) {
		if (this.array.includes(value)) {
			throw new Error('Value already exists in the tree')
			return
		}
		
		if (node === null) {
			this.array.push(value)
			return new Node(value)
		}
		
		if (node.value > value) {
			node.leftNode = this.insert(value, node.leftNode)
		}
		
		else if (node.value < value) {
			node.rightNode = this.insert(value, node.rightNode)
		}
		return node
	}
	
	deleteItem(value) {
		const [node, parentNode] = this.#traverse(value, )
		if ((!node.rightNode) && (!node.leftNode) && (parentNode.leftNode === node)) {
			parentNode.leftNode = null
			
		}
		else if ((!node.rightNode) && (!node.leftNode) && (parentNode.rightNode === node)) {
			parentNode.rightNode = null
			
		}
		
		// delete case for node with one child
		else if ((!node.rightNode) || (!node.leftNode)) {
			// copying the node child into the target node then deleting the original child
			let nodeChild = node.leftNode || node.rightNode
			node.value = nodeChild.value
			node.leftNode = nodeChild.leftNode
			node.rightNode = nodeChild.rightNode
			
		}
		
		else {
			const [successorParent, nodeSuccessor] = this.#getSuccessorAndParent(node.rightNode, node)
			node.value = nodeSuccessor.value
			//it always goes to the left node, I've checked 
			successorParent.leftNode = null
		}
		
		let index = this.array.indexOf(value)
		this.array.splice(index, 1)
	}
	
	levelOrder(callback) {
		//level order with loop and linked list
		/*if (!callback) {throw new Error('callback must be provided')}
		this.queue.append(this.root)
		while(this.queue.size !== 0){
			let listNode = this.queue.removeAt(0)
			let node = listNode.value
			callback(node)
			if(node.leftNode) this.queue.append(node.leftNode);
			if(node.rightNode) this.queue.append(node.rightNode);
		}*/
		
		//level order with recursion and linked list
		if (!callback) { throw new Error('callback must be provided') }
		if (this.queue.size === 0) {
			return
		}
		
		const listNode = this.queue.removeAt(0)
		const node = listNode.value
		callback(node)
		if (node.leftNode) this.queue.append(node.leftNode)
		if (node.rightNode) this.queue.append(node.rightNode)
		return this.levelOrder(callback)
		
	}
	
	preOrder(callback, node = this.root) {
		if (!callback) { throw new Error('callback must be provided') }
		if (!node) { return null }
		callback(node)
		this.preOrder(callback, node.leftNode)
		this.preOrder(callback, node.rightNode)
	}
	
	inOrder(callback, node = this.root) {
		if (!callback) { throw new Error('callback must be provided') }
		if (!node) { return null }
		this.inOrder(callback, node.leftNode)
		callback(node)
		this.inOrder(callback, node.rightNode)
	}
	
	postOrder(callback, node = this.root) {
		if (!callback) { throw new Error('callback must be provided') }
		if (!node) { return null }
		this.postOrder(callback, node.leftNode)
		this.postOrder(callback, node.rightNode)
		callback(node)
	}
	
	height(value, node = this.find(value)) {
		if (node === null) return null;
		if (node.leftNode === null && node.rightNode === null) return 0;
		let leftHeight = this.height(value, node.leftNode);
		let rightHeight = this.height(value, node.rightNode);
		if (leftHeight > rightHeight) {
			return leftHeight + 1;
		}
		else {
			return rightHeight + 1;
		}
		
	}
	
	depth(value) {
		const targetNode = this.find(value)
		if (targetNode === null) { return null }
		let currentNode = this.root
		let nodeCount = 0
		while (currentNode.value !== value) {
			currentNode = (currentNode.value > value) ? currentNode.leftNode : currentNode.rightNode
			nodeCount++
		}
		return nodeCount
	}
	
	isBalanced(node = this.root) {
			if (node === null) return null;
			if (node.leftNode === null && node.rightNode === null) return 0;
			let leftHeight = this.isBalanced(node.leftNode);
			let rightHeight = this.isBalanced(node.rightNode);
			if (leftHeight > rightHeight) {leftHeight++;}
			else {rightHeight++;}
			
			if (Math.abs(leftHeight - rightHeight) > 1) {
				return false
			}
			 return true
	}
	
	reBalance() {
		this.array = cleanUpArray(this.array)
		this.root = buildTree(this.array, )
	}
}