function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(arr) {
  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = Node(arr[mid]);
    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);
    return root;
  };
  const newArr = Array.from(new Set(arr.sort((a, b) => a - b)));
  let root = buildTree(newArr);

  const insert = (value, node = root) => {
    if (node === null) {
      node = Node(value);
      return node;
    }
    if (value < node.data) {
      node.left = insert(value, node.left);
    } else if (value > node.data) {
      node.right = insert(value, node.right);
    }

    return node;
  };

  const deleted = (value, node = root) => {
    if (node === null) {
      return node;
    }
    if (value < node.data) {
      node.left = deleted(value, node.left);
    } else if (value > node.data) {
      node.right = deleted(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const minData = (root) => {
          let min = root.data;
          let newRoot = root;
          while (newRoot.left !== null) {
            min = root.left.data;
            newRoot = root.left;
          }
          return min;
        };
        root.data = minData(root.right);
        root.right = deleted(root.data, root.right);
      }
    }
    return node;
  };

  const find = (value, node = root) => {
    if (node === null || node.data === value) {
      return node;
    }
    if (value < node.data) {
      return find(value, node.left);
    }
    return find(value, node.right);
  };

  const levelOrder = (callback = null, arr = [], queue = [], node = root) => {
    if (node === null) return;
    arr.push(node.data);
    queue.push(node.left);
    queue.push(node.right);
    if (callback) {
      callback(node);
    }
    while (queue.length) {
      let current = queue[0];
      queue.shift();
      levelOrder(callback, arr, queue, current);
    }
    return arr;
  };

  const inOrder = (callback = null, arr = [], node = root) => {
    if (node === null) return;
    if (callback) {
      callback(node);
    }
    if (node.left) inOrder(callback, arr, node.left);
    arr.push(node.data);
    if (node.right) inOrder(callback, arr, node.right);
    return arr;
  };
  const preOrder = (callback = null, arr = [], node = root) => {
    if (node === null) return;
    if (callback) {
      callback(node);
    }
    arr.push(node.data);
    if (node.left) preOrder(callback, arr, node.left);
    if (node.right) preOrder(callback, arr, node.right);
    return arr;
  };
  const postOrder = (callback = null, arr = [], node = root) => {
    if (node === null) return;
    if (callback) {
      callback(node);
    }
    if (node.left) postOrder(callback, arr, node.left);
    if (node.right) postOrder(callback, arr, node.right);
    arr.push(node.data);
    return arr;
  };
  const height = (node = root) => {
    if (node === null) {
      return 0;
    }
    let lHeight = height(node.left);
    let rHeight = height(node.right);
    if (lHeight > rHeight) return lHeight + 1;
    else return rHeight + 1;
  };

  const depth = (node, rot = root, depthh = 0) => {
    if (node === null || rot === null) return;
    if (node === rot) return depthh;
    if (node.data < rot.data) {
      return depth(node, rot.left, (depthh += 1));
    } else {
      return depth(node, rot.right, (depthh += 1));
    }
  };

  const isBalanced = (node = root) => {
    let lHeight = height(node.left);
    let rHeight = height(node.right);
    return Math.abs(lHeight - rHeight) >= 2 ? false : true;
  };

  const rebalance = (node = root) => {
    let newArr = inOrder(null, [], node);
    newArr.sort((a, b) => a - b);
    root = buildTree(newArr);
    return root;
  };
  return {
    root,
    buildTree,
    insert,
    deleted,
    find,
    height,
    depth,
    isBalanced,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    rebalance,
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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

// let bst = Tree([4, 2, 5, 1, 6, 2, 1]);
// console.log(bst.root);
// prettyPrint(bst.root);
// bst.insert(10);
// bst.insert(112);
// bst.insert(3);
// console.log(bst.root);
// prettyPrint(bst.root);
// bst.deleted(4);
// bst.deleted(3);
// prettyPrint(bst.root);
// console.log(bst.find(1));
// console.log("Height", bst.height());
// console.log("Depth", bst.depth(bst.find(6)));

// bst.insert(115);
// prettyPrint(bst.root);
// console.log(bst.isBalanced());

// prettyPrint(bst.rebalance());
// console.log(bst.isBalanced());
// console.log(bst.levelOrder());
// console.log(bst.inOrder());
// console.log(bst.preOrder());
// console.log(bst.postOrder());

function driver() {
  const randomArray = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100)
  );
  console.log("Random Array:", randomArray);
  const bst = Tree(randomArray);
  prettyPrint(bst.root);
  console.log("Tree is balanced? ", bst.isBalanced());
  console.log("Level Order:", bst.levelOrder());
  console.log("Pre Order:", bst.preOrder());
  console.log("In Order:", bst.inOrder());
  console.log("Post Order:", bst.postOrder());
  bst.insert(112);
  bst.insert(125);
  bst.insert(137);
  bst.insert(150);
  prettyPrint(bst.root);
  console.log("Tree is balanced? ", bst.isBalanced());
  prettyPrint(bst.rebalance());
  console.log("Tree is balanced? ", bst.isBalanced());
  console.log("Level Order:", bst.levelOrder());
  console.log("Pre Order:", bst.preOrder());
  console.log("In Order:", bst.inOrder());
  console.log("Post Order:", bst.postOrder());
}

driver();
