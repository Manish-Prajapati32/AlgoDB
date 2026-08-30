
import React, { useState, useEffect } from 'react';
import { AnimationFrame } from '../../types';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

interface ArrayViewProps {
  setFrames: (f: AnimationFrame[]) => void;
  currentFrame: AnimationFrame;
}

const ArrayView: React.FC<ArrayViewProps> = ({ setFrames, currentFrame }) => {
  const [baseArray, setBaseArray] = useState<number[]>([10, 20, 30, 40, 50]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');

  const generateInsertFrames = (val: number, idx: number) => {
    const arr = [...baseArray];
    const steps: AnimationFrame[] = [];
    
    steps.push({ data: [...arr], message: `Target: Insert ${val} at index ${idx}`, highlightedIndices: [idx] });
    
    // Shift elements
    for (let i = arr.length - 1; i >= idx; i--) {
      arr[i + 1] = arr[i];
      steps.push({ 
        data: [...arr], 
        message: `Shifting element ${arr[i]} from index ${i} to ${i+1}`, 
        highlightedIndices: [i, i+1] 
      });
    }
    
    arr[idx] = val;
    steps.push({ 
      data: [...arr], 
      message: `Inserted ${val} at index ${idx}`, 
      highlightedIndices: [idx] 
    });
    
    setFrames(steps);
    setBaseArray(arr);
  };

  const generateDeleteFrames = (idx: number) => {
    const arr = [...baseArray];
    const steps: AnimationFrame[] = [];
    
    if (idx < 0 || idx >= arr.length) return;
    
    const targetVal = arr[idx];
    steps.push({ data: [...arr], message: `Deleting ${targetVal} at index ${idx}`, highlightedIndices: [idx] });
    
    // Shift elements left
    for (let i = idx; i < arr.length - 1; i++) {
      arr[i] = arr[i+1];
      steps.push({ 
        data: [...arr], 
        message: `Moving ${arr[i]} from index ${i+1} to ${i}`, 
        highlightedIndices: [i, i+1] 
      });
    }
    
    arr.pop();
    steps.push({ data: [...arr], message: `Successfully deleted element.`, highlightedIndices: [] });
    
    setFrames(steps);
    setBaseArray(arr);
  };

  const resetArray = () => {
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
    setBaseArray(newArr);
    setFrames([{ data: newArr, message: "New array initialized." }]);
  };

  // Initial frames
  useEffect(() => {
    setFrames([{ data: baseArray, message: "Ready for operations." }]);
  }, []);

  const data = Array.isArray(currentFrame.data) ? (currentFrame.data as number[]) : [];

  return (
    <div className="w-full flex flex-col items-center gap-12">
      {/* Array Display */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div 
              className={`
                w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300
                ${currentFrame.highlightedIndices?.includes(i) 
                  ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg z-10' 
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'}
              `}
            >
              {val}
            </div>
            <span className="text-xs font-bold text-slate-400">idx: {i}</span>
          </div>
        ))}
        {/* Placeholder for expansion */}
        <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center opacity-40">
          <span className="text-slate-300 text-3xl">+</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Value</label>
            <input 
              type="number" 
              placeholder="e.g. 99"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Index</label>
            <input 
              type="number" 
              placeholder="e.g. 2"
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => generateInsertFrames(parseInt(inputValue), parseInt(inputIndex))}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Insert
          </button>
          <button 
            onClick={() => generateDeleteFrames(parseInt(inputIndex))}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} /> Delete
          </button>
          <button 
            onClick={resetArray}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrayView;
