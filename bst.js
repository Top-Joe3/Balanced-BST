function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function removeDuplicates(arr) {
  const unique = arr.filter((value, index) => arr.indexOf(value) === index);
  return unique;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }
  _insertRec(currNode, value) {
    if (currNode === null) return new Node(value);

    if (currNode.data === value) return currNode;

    if (value < currNode.data)
      currNode.left = this._insertRec(currNode.left, value);
    else if (value > currNode.data)
      currNode.right = this._insertRec(currNode.right, value);

    return currNode;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(currNode, value) {
    if (currNode === null) return null;

    if (value < currNode.data) {
      currNode.left = this._deleteRec(currNode.left, value);
    } else if (value > currNode.data) {
      currNode.right = this._deleteRec(currNode.right, value);
    } else {
      // Found the node

      // Case 1: no left child
      if (currNode.left === null) return currNode.right;

      // Case 2: no right child
      if (currNode.right === null) return currNode.left;

      // Case 3: two children → replace with inorder successor
      let succ = this.getSuccessor(currNode);
      currNode.data = succ.data;

      // Delete the inorder successor
      currNode.right = this._deleteRec(currNode.right, succ.data);
    }
    return currNode;
  }

  find(value) {
    let currNode = this.root;

    while (currNode !== null) {
      if (value === currNode.data) return currNode;
      if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    let queue = [this.root];
    while (queue.length !== 0) {
      let currNode = queue.shift();
      callback(currNode);
      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(value) {
    let start = this.root;
    while (start !== null && start.data !== value) {
      if (value < start.data) {
        start = start.left;
      } else {
        start = start.right;
      }
    }
    if (start === null) return -1;
    let queue = [start];
    let height = -1;
    while (queue.length > 0) {
      let levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      height++;
    }
    return height;
  }

  depth(value) {
    let node = this.root;
    let depth = 1;

    while (node !== null) {
      if (value === node.data) {
        return depth;
      } else if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
      depth++;
    }

    return null;
  }

  isBalanced(node = this.root) {
    function getHeight(n) {
      if (n === null) return -1;
      return 1 + Math.max(getHeight(n.left), getHeight(n.right));
    }
    if (node === null) return true;
    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);
    const diff = Math.abs(leftHeight - rightHeight);
    const isCurrentBalanced = diff <= 1;
    return (
      isCurrentBalanced &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    let newArray = [];
    this.levelOrderForEach((node) => {
      newArray.push(node.data);
    });
    this.root = buildTree(newArray);
  }
}

function bstRecur(arr, start, end) {
  if (start > end) return null;
  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(arr[mid]);
  root.left = bstRecur(arr, start, mid - 1);
  root.right = bstRecur(arr, mid + 1, end);
  return root;
}

function buildTree(arr) {
  let sortedAndRemovedDuplicate = (function (arr) {
    const sortedArr = mergeSort(arr);
    const sortedNoDuplicate = removeDuplicates(sortedArr);
    return sortedNoDuplicate;
  })(arr);
  return bstRecur(
    sortedAndRemovedDuplicate,
    0,
    sortedAndRemovedDuplicate.length - 1
  );
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
