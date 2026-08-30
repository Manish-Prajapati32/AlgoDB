
import React, { useState, useEffect } from 'react';
import { AnimationFrame } from '../../types';
import { ArrowUp, ArrowDown, LogIn, LogOut } from 'lucide-react';

interface StackViewProps {
  type: 'stack' | 'queue';
  setFrames: (f: AnimationFrame[]) => void;
  currentFrame: AnimationFrame;
}

const StackView: React.FC<StackViewProps> = ({ type, setFrames, currentFrame }) => {
  const [items, setItems] = useState<number[]>([]);
  const [val, setVal] = useState('');

  useEffect(() => {
    setFrames([{ data: [], message: `${type.toUpperCase()} initialized.` }]);
  }, [type]);

  const handlePush = () => {
    if (!val) return;
    const v = parseInt(val);
    const newItems = [...items, v];
    const steps: AnimationFrame[] = [
      { data: [...items], message: `Pushing ${v} to ${type}...`, activePointers: { TOP: items.length } },
      { data: newItems, message: `Successfully added ${v}.`, activePointers: { TOP: newItems.length - 1 } }
    ];
    setItems(newItems);
    setFrames(steps);
    setVal('');
  };

  const handlePop = () => {
    if (items.length === 0) return;
    const targetIdx = type === 'stack' ? items.length - 1 : 0;
    const v = items[targetIdx];
    const newItems = items.filter((_, i) => i !== targetIdx);
    
    const steps: AnimationFrame[] = [
      { data: [...items], message: `Popping ${v} from ${type}...`, highlightedIndices: [targetIdx] },
      { data: newItems, message: `Removed ${v}.`, activePointers: type === 'stack' ? { TOP: newItems.length - 1 } : { FRONT: 0, REAR: newItems.length - 1 } }
    ];
    setItems(newItems);
    setFrames(steps);
  };

  const data = Array.isArray(currentFrame.data) ? (currentFrame.data as number[]) : [];

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className={`
        relative w-full max-w-[300px] min-h-[300px] border-x-4 border-b-4 border-slate-300 flex flex-col-reverse items-center justify-start p-4 gap-2 rounded-b-3xl
        ${type === 'queue' ? 'rotate-90 origin-center' : ''}
      `}>
        {data.map((item, i) => (
          <div 
            key={i}
            className={`
              w-full h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-300
              ${currentFrame.highlightedIndices?.includes(i) ? 'bg-red-500 text-white scale-105' : 'bg-white border-2 border-slate-100 text-slate-700'}
            `}
          >
            {item}
            {type === 'stack' && i === data.length - 1 && (
              <div className="absolute -right-16 flex items-center gap-2 text-blue-600 animate-pulse">
                <ArrowDown size={20} /> <span className="text-xs font-bold">TOP</span>
              </div>
            )}
          </div>
        ))}
        {data.length === 0 && (
          <div className={`text-slate-300 font-medium italic ${type === 'queue' ? '-rotate-90' : ''}`}>
            Empty {type}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <input 
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Value"
            className="w-24 px-4 py-2 focus:outline-none"
          />
          <button 
            onClick={handlePush}
            className="px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <LogIn size={18} /> {type === 'stack' ? 'Push' : 'Enqueue'}
          </button>
        </div>
        <button 
          onClick={handlePop}
          className="px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
        >
          <LogOut size={18} /> {type === 'stack' ? 'Pop' : 'Dequeue'}
        </button>
      </div>
    </div>
  );
};

export default StackView;
