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

const buildTree = function(array, start, end) {
	
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
		this.root = buildTree(this.array, 0, this.array.length - 1)
	}
	
	#getSuccessorAndParent(node, previous = null){
		if(node.leftNode === null){
			return [previous, node]
		}
		return this.#getSuccessorAndParent(node.leftNode, node)
	}
	
	#traverse(value, node, parentNode = null) {
		if (node.value === value) {
			return [node, parentNode]
		}
		return (node.value > value) ? this.#traverse(value, node.leftNode, node) : this.#traverse(value, node.rightNode, node)
	}
	
	insert(value, node = this.root) {
		if (this.array.includes(value)) {
			throw new Error('Value already exists in the tree')
		}
		
		if (node === null) {
			return new Node(value)
		}
		
		if (node.value > value) {
			node.leftNode = this.insert(value, node.leftNode)
		}
		
		else if (node.value < value) {
			node.rightNode = this.insert(value, node.rightNode)
		}
		this.array.push(value)
		return node
	}
	
	deleteItem(value){
		const [node, parentNode] = this.#traverse(value, this.root)
		if((!node.rightNode) && (!node.leftNode) && (parentNode.leftNode === node)){
			parentNode.leftNode = null
			return
		}
		
		if((!node.rightNode) && (!node.leftNode) && (parentNode.rightNode === node)){
			parentNode.rightNode = null
			return
		}
		const [successorParent, nodeSuccessor] = this.#getSuccessorAndParent(node.rightNode, node)
		console.log(successorParent, nodeSuccessor)
		console.log(parentNode)
	}
}