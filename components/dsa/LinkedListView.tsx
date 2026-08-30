
import React, { useState, useEffect } from 'react';
import { AnimationFrame } from '../../types';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

interface ListNode {
  val: number;
  id: string;
}

interface LinkedListViewProps {
  setFrames: (f: AnimationFrame[]) => void;
  currentFrame: AnimationFrame;
}

const LinkedListView: React.FC<LinkedListViewProps> = ({ setFrames, currentFrame }) => {
  const [nodes, setNodes] = useState<ListNode[]>([
    { val: 10, id: '1' },
    { val: 20, id: '2' },
    { val: 30, id: '3' }
  ]);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    setFrames([{ data: [...nodes], message: "Initial Linked List" }]);
  }, []);

  const handleAdd = () => {
    if (!inputVal) return;
    const v = parseInt(inputVal);
    const newNode = { val: v, id: Math.random().toString(36).substr(2, 9) };
    const steps: AnimationFrame[] = [];
    
    steps.push({ 
      data: [...nodes], 
      message: `Searching for the end of the list to add ${v}...`, 
      highlightedIndices: nodes.map((_, i) => i) 
    });
    
    const nextNodes = [...nodes, newNode];
    steps.push({ 
      data: nextNodes, 
      message: `Created new node and linked it to the tail.`, 
      activeNodes: [newNode.id] 
    });
    
    setNodes(nextNodes);
    setFrames(steps);
    setInputVal('');
  };

  const handleRemove = () => {
    if (nodes.length === 0) return;
    const target = nodes[0];
    const steps: AnimationFrame[] = [
      { data: [...nodes], message: `Targeting head node ${target.val} for deletion.`, highlightedIndices: [0] },
      { data: nodes.slice(1), message: `Head pointer moved to the next node. Node ${target.val} removed.` }
    ];
    setNodes(nodes.slice(1));
    setFrames(steps);
  };

  const data = Array.isArray(currentFrame.data) ? (currentFrame.data as ListNode[]) : [];

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <div className="flex flex-wrap items-center justify-center gap-4 min-h-[150px]">
        <div className="flex items-center gap-2">
           <div className="text-xs font-bold text-blue-600 uppercase">Head</div>
           <ArrowRight size={16} className="text-blue-600" />
        </div>
        {data.map((node, i) => (
          <div key={node.id} className="flex items-center group">
            <div className="flex flex-col items-center gap-1">
              <div 
                className={`
                  w-24 h-14 rounded-lg border-2 flex overflow-hidden transition-all duration-300
                  ${currentFrame.highlightedIndices?.includes(i) || currentFrame.activeNodes?.includes(node.id)
                    ? 'border-blue-500 bg-blue-50 scale-110 shadow-lg' 
                    : 'border-slate-200 bg-white'}
                `}
              >
                <div className="flex-1 flex items-center justify-center font-bold text-slate-800 border-r border-slate-200">
                  {node.val}
                </div>
                <div className="w-8 flex items-center justify-center bg-slate-50 text-[8px] text-slate-400 font-mono">
                  NEXT
                </div>
              </div>
              <span className="text-[10px] text-slate-400">Node {i}</span>
            </div>
            {i < data.length - 1 && (
              <div className="mx-2 text-slate-300">
                <ArrowRight size={24} />
              </div>
            )}
            {i === data.length - 1 && (
              <div className="mx-2 text-slate-400 font-mono text-xs italic">
                null
              </div>
            )}
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-slate-300 italic">List is empty</div>
        )}
      </div>

      <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
        <input 
          type="number" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Val"
          className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
        >
          <Plus size={18} /> Append
        </button>
        <button 
          onClick={handleRemove}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold hover:bg-red-100 transition-all"
        >
          <Trash2 size={18} /> Remove Head
        </button>
      </div>
    </div>
  );
};

export default LinkedListView;
