
import React, { useState, useEffect } from 'react';
import { AnimationFrame } from '../../types';
import { Play, RotateCcw } from 'lucide-react';

interface SortViewProps {
  setFrames: (f: AnimationFrame[]) => void;
  currentFrame: AnimationFrame;
}

const SortView: React.FC<SortViewProps> = ({ setFrames, currentFrame }) => {
  const [arraySize, setArraySize] = useState(8);

  const generateBubbleSortFrames = () => {
    const data = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 80) + 10);
    const arr = [...data];
    const n = arr.length;
    const steps: AnimationFrame[] = [];
    
    steps.push({ data: [...arr], message: "Bubble Sort: Starting sorting process.", highlightedIndices: [] });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparison
        steps.push({ 
          data: [...arr], 
          message: `Comparing ${arr[j]} and ${arr[j+1]}`, 
          highlightedIndices: [j, j+1] 
        });

        if (arr[j] > arr[j+1]) {
          // Swap
          const temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
          steps.push({ 
            data: [...arr], 
            message: `Swapped ${arr[j]} and ${arr[j+1]}`, 
            highlightedIndices: [j, j+1],
            swapping: [j, j+1]
          });
        }
      }
      steps.push({ 
        data: [...arr], 
        message: `Element at index ${n-i-1} is sorted.`, 
        highlightedIndices: Array.from({ length: i + 1 }, (_, k) => n - k - 1)
      });
    }

    steps.push({ data: [...arr], message: "Sorting complete!", highlightedIndices: Array.from({ length: n }, (_, k) => k) });
    setFrames(steps);
  };

  useEffect(() => {
    const initial = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 80) + 10);
    setFrames([{ data: initial, message: "Unsorted array generated." }]);
  }, [arraySize]);

  const data = Array.isArray(currentFrame.data) ? (currentFrame.data as number[]) : [];

  return (
    <div className="w-full flex flex-col items-center gap-12">
      {/* Bars Display */}
      <div className="h-64 flex items-end justify-center gap-4 w-full px-8">
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full max-w-[40px]">
            <div 
              className={`
                w-full rounded-t-lg transition-all duration-300 flex items-start justify-center pt-2 text-white font-bold text-xs
                ${currentFrame.highlightedIndices?.includes(i) 
                  ? 'bg-blue-600 shadow-lg shadow-blue-200 ring-2 ring-blue-300' 
                  : 'bg-slate-300'}
                ${currentFrame.swapping?.includes(i) ? 'bg-amber-500 scale-110' : ''}
              `}
              style={{ height: `${val * 2}px` }}
            >
              {val}
            </div>
            <span className="text-[10px] font-bold text-slate-400">{i}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200">
          <span className="text-sm font-bold text-slate-500">Array Size</span>
          <input 
            type="range" 
            min="4" 
            max="12" 
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="w-24 accent-blue-600"
          />
          <span className="text-sm font-bold text-slate-800 w-4">{arraySize}</span>
        </div>
        <button 
          onClick={generateBubbleSortFrames}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95"
        >
          <Play size={18} fill="currentColor" /> Start Sort
        </button>
      </div>
    </div>
  );
};

export default SortView;
