
import React, { useState, useEffect } from 'react';
import { AnimationFrame } from '../../types';
import { Search, RotateCcw } from 'lucide-react';

const SearchView: React.FC<{ setFrames: (f: AnimationFrame[]) => void, currentFrame: AnimationFrame }> = ({ setFrames, currentFrame }) => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState('');

  useEffect(() => {
    const sortedArr = Array.from({ length: 12 }, (_, i) => (i + 1) * 7 + Math.floor(Math.random() * 5));
    setArray(sortedArr);
    setFrames([{ data: sortedArr, message: "Sorted array generated for Binary Search." }]);
  }, []);

  const handleSearch = () => {
    if (!target) return;
    const t = parseInt(target);
    const steps: AnimationFrame[] = [];
    let low = 0;
    let high = array.length - 1;

    steps.push({ 
      data: array, 
      message: `Starting Binary Search for ${t}. Range: [${low}, ${high}]`,
      highlightedIndices: Array.from({ length: high - low + 1 }, (_, i) => i + low)
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({ 
        data: array, 
        message: `Middle element is ${array[mid]} at index ${mid}.`, 
        highlightedIndices: [mid],
        activePointers: { L: low, M: mid, R: high }
      });

      if (array[mid] === t) {
        steps.push({ 
          data: array, 
          message: `Found ${t} at index ${mid}!`, 
          highlightedIndices: [mid],
          activePointers: { M: mid }
        });
        break;
      }

      if (array[mid] < t) {
        steps.push({ data: array, message: `${array[mid]} < ${t}. Search in the right half.`, activePointers: { L: low, M: mid, R: high } });
        low = mid + 1;
      } else {
        steps.push({ data: array, message: `${array[mid]} > ${t}. Search in the left half.`, activePointers: { L: low, M: mid, R: high } });
        high = mid - 1;
      }
      
      if (low <= high) {
        steps.push({ 
          data: array, 
          message: `New range: [${low}, ${high}]`, 
          highlightedIndices: Array.from({ length: high - low + 1 }, (_, i) => i + low)
        });
      }
    }

    if (low > high) {
      steps.push({ data: array, message: `${t} not found in the array.` });
    }

    setFrames(steps);
  };

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {array.map((val, i) => {
          const isHighlighted = currentFrame.highlightedIndices?.includes(i);
          const pointer = Object.entries(currentFrame.activePointers || {}).find(([_, idx]) => idx === i);
          
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className={`
                  w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all duration-300
                  ${isHighlighted ? 'bg-blue-600 border-blue-600 text-white scale-110' : 'bg-white border-slate-200 text-slate-400'}
                  ${pointer?.[0] === 'M' ? 'ring-4 ring-amber-400' : ''}
                `}
              >
                {val}
              </div>
              {pointer && (
                <div className="bg-slate-800 text-white px-2 py-0.5 rounded text-[10px] font-bold animate-bounce">
                  {pointer[0]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
        <input 
          type="number" 
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Search for..."
          className="w-32 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
        />
        <button 
          onClick={handleSearch}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
        >
          <Search size={18} /> Search
        </button>
      </div>
    </div>
  );
};

export default SearchView;
