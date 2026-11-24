// Node class representing a single element in the binary tree
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// BinaryTree class managing nodes and tree operations
class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Завдання: Додати елемент
    insert(value) {
        const newNode = new Node(value);

        // If the tree is empty, set the new node as the root
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            // Values smaller than the current node go to the left subtree
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                // Values greater than or equal to the current node go to the right subtree
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    // Завдання: Перевірити наявність елемента (знайти)
    contains(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.value) {
                return true;
            }
            // Discard half of the tree on each step
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    // Завдання: Видалити елемент
    remove(value) {
        this.root = this._removeNode(this.root, value);
    }

    _removeNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this._removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this._removeNode(node.right, value);
            return node;
        } else {
            // Case 1: Node has no children (leaf node)
            if (node.left === null && node.right === null) {
                return null;
            }

            // Case 2: Node has only one child
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            // Case 3: Node has two children
            // Find the leftmost node in the right subtree
            const minRightNode = this._findMinNode(node.right);
            node.value = minRightNode.value;
            node.right = this._removeNode(node.right, minRightNode.value);
            return node;
        }
    }

    // Helper method to find the minimum node starting from a given node
    _findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Завдання: Вивести всі елементи
    printAll() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        console.log("All elements:", result.join(", "));
        return result;
    }

    // Helper method for in-order traversal (Left -> Root -> Right)
    _inOrderTraversal(node, result) {
        if (node !== null) {
            this._inOrderTraversal(node.left, result);
            result.push(node.value);
            this._inOrderTraversal(node.right, result);
        }
    }

    // Завдання: Вивести найбільший елемент
    getMax() {
        if (this.root === null) {
            return null;
        }

        let current = this.root;
        // Move down the rightmost branch
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    // Завдання: Вивести найменший елемент
    getMin() {
        if (this.root === null) {
            return null;
        }

        let current = this.root;
        // Move down the leftmost branch
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    // Завдання: Вивести кількість
    getCount() {
        return this._countNodes(this.root);
    }

    // Helper method to recursively count all nodes
    _countNodes(node) {
        if (node === null) {
            return 0;
        }
        return 1 + this._countNodes(node.left) + this._countNodes(node.right);
    }
}

// === Перевірка роботи бінарного дерева ===
const tree = new BinaryTree();

// Завдання 1: Додавання елементів
tree.insert(8);
tree.insert(3);
tree.insert(10);
tree.insert(1);
tree.insert(6);
tree.insert(14);
tree.insert(4);
tree.insert(7);
tree.insert(13);

// Завдання 2: Виведення всіх елементів
tree.printAll();

// Завдання 3: Перевірка наявності елемента
console.log("Contains 6:", tree.contains(6));
console.log("Contains 99:", tree.contains(99));

// Завдання 4: Виведення найбільшого та найменшого елементів
console.log("Max element:", tree.getMax());
console.log("Min element:", tree.getMin());

// Завдання 5: Виведення кількості елементів
console.log("Total count:", tree.getCount());

// Завдання 6: Видалення елементів
// Remove a leaf node (no children)
tree.remove(4);
// Remove a node with one child
tree.remove(14);
// Remove a node with two children
tree.remove(3);

console.log("After deletions:");
tree.printAll();
console.log("Total count after deletions:", tree.getCount());
