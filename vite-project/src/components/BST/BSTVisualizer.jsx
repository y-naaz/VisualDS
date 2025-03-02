import React, { useState } from "react";
import { motion } from "framer-motion";

// BST Node class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BST Component
const BSTVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Insert function
  const insertNode = (node, value) => {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertNode(node.left, value);
    else node.right = insertNode(node.right, value);
    return node;
  };

  const handleInsert = () => {
    if (inputValue === "") return;
    setRoot(insertNode(root, parseInt(inputValue)));
    setInputValue("");
  };

  return (
    <>
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">BST Visualizer</h2>
      <div className="flex gap-2 justify-center mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter number"
          className="border p-2 rounded"
        />
        <button 
          onClick={handleInsert} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Insert
        </button>
      </div>
      <div className="flex justify-center items-center mt-4">
        {root && <TreeNodeComponent node={root} />}
      </div>
    </div>
    </>
    
  );
};

// Recursive component to render BST
const TreeNodeComponent = ({ node }) => {
  return (
    <motion.div
      className="border rounded-lg p-4 text-center mx-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {node.value}
      <div className="flex justify-center mt-2">
        {node.left && <TreeNodeComponent node={node.left} />}
        {node.right && <TreeNodeComponent node={node.right} />}
      </div>
    </motion.div>
  );
};

export default BSTVisualizer;
