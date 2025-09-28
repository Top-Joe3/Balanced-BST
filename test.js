import { Tree, prettyPrint } from "./bst.js";

function generateRandomNums() {
  let randomNums = [];
  while (randomNums.length < 10) {
    randomNums.push(Math.floor(Math.random() * 100) + 1);
  }
  return randomNums;
}

let tree = new Tree(generateRandomNums());

prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.levelOrderForEach((node) => {
  console.log(node.data);
});
tree.preOrderForEach((node) => {
  console.log(node.data);
});
tree.inOrderForEach((node) => {
  console.log(node.data);
});
tree.postOrderForEach((node) => {
  console.log(node.data);
});

tree.insert(105);
tree.insert(204);
tree.insert(111);
tree.insert(137);
tree.insert(124);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
