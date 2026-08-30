
import React, { useState, useEffect } from 'react';
import { AnimationFrame } from '../../types';
import { Plus, RotateCcw } from 'lucide-react';

interface TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
  id: string;
}

const TreeView: React.FC<{ setFrames: (f: AnimationFrame[]) => void, currentFrame: AnimationFrame }> = ({ setFrames, currentFrame }) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    // Initial tree
    const root: TreeNode = { val: 50, x: 250, y: 40, id: 'root', 
      left: { val: 30, x: 150, y: 100, id: 'left', 
        left: { val: 20, x: 100, y: 160, id: 'l-l' },
        right: { val: 40, x: 200, y: 160, id: 'l-r' }
      },
      right: { val: 70, x: 350, y: 100, id: 'right' }
    };
    setTreeData(root);
    setFrames([{ data: root, message: "Initial Binary Search Tree" }]);
  }, []);

  const handleInsert = () => {
    if (!inputVal) return;
    const v = parseInt(inputVal);
    const steps: AnimationFrame[] = [];
    
    const insertNode = (node: TreeNode | null, val: number, x: number, y: number, level: number): TreeNode => {
      if (!node) {
        const newNode = { val, x, y, id: Math.random().toString() };
        steps.push({ data: null, message: `Found empty spot! Inserting ${val}.`, activeNodes: [newNode.id] });
        return newNode;
      }
      
      steps.push({ data: null, message: `Comparing ${val} with ${node.val}...`, activeNodes: [node.id] });
      
      const offset = 120 / (level + 1);
      if (val < node.val) {
        steps.push({ data: null, message: `${val} < ${node.val}, moving to left child.`, activeNodes: [node.id] });
        node.left = insertNode(node.left || null, val, node.x - offset, node.y + 60, level + 1);
      } else {
        steps.push({ data: null, message: `${val} >= ${node.val}, moving to right child.`, activeNodes: [node.id] });
        node.right = insertNode(node.right || null, val, node.x + offset, node.y + 60, level + 1);
      }
      return node;
    };

    const newTree = JSON.parse(JSON.stringify(treeData));
    insertNode(newTree, v, 250, 40, 1);
    
    // We update the data in steps manually to show progression
    // For simplicity in this demo, we'll just show the final state after the "thinking" steps
    const finalSteps = steps.map(s => ({ ...s, data: newTree }));
    setFrames(finalSteps);
    setTreeData(newTree);
    setInputVal('');
  };

  const renderNodes = (node: TreeNode | null): React.ReactNode => {
    if (!node) return null;
    const isActive = currentFrame.activeNodes?.includes(node.id);
    return (
      <g key={node.id}>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#cbd5e1" strokeWidth="2" />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#cbd5e1" strokeWidth="2" />
        )}
        <circle 
          cx={node.x} 
          cy={node.y} 
          r="20" 
          fill={isActive ? '#3b82f6' : 'white'} 
          stroke={isActive ? '#2563eb' : '#cbd5e1'} 
          strokeWidth="2"
          className="transition-all duration-300"
        />
        <text 
          x={node.x} 
          y={node.y + 5} 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="bold" 
          fill={isActive ? 'white' : '#1e293b'}
        >
          {node.val}
        </text>
        {renderNodes(node.left || null)}
        {renderNodes(node.right || null)}
      </g>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <svg width="500" height="300" className="bg-slate-50/50 rounded-2xl border border-slate-100">
        {renderNodes(currentFrame.data as TreeNode)}
      </svg>
      
      <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
        <input 
          type="number" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Value"
          className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
        />
        <button 
          onClick={handleInsert}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
        >
          <Plus size={18} /> Insert
        </button>
      </div>
    </div>
  );
};

export default TreeView;
