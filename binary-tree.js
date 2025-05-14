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
	
	#traverse(value, node){
		if(node.value > value){
			return this.#traverse(value, node.leftNode)
		}
		if(node.value < value){
			return this.#traverse(value, node.rightNode)
		}
	}
	
	insert(value) {
		if (this.array.includes(value)) {
			throw new Error('Value already exists in the tree')
		}
		let currentNode = this.root
		while (currentNode) {
			if (value < currentNode.value) {
				currentNode = currentNode.leftNode
			}
			else if (value > currentNode.value) {
				console.log(currentNode.rightNode)
				currentNode = currentNode.rightNode
			}
		}
	}
}