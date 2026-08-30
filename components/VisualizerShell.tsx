
import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface VisualizerShellProps {
  title: string;
  description: string;
  complexity?: { time: string; space: string };
  children: React.ReactNode;
  controls?: {
    onPlay?: () => void;
    onPause?: () => void;
    onReset?: () => void;
    onStepBack?: () => void;
    onStepForward?: () => void;
    isPlaying?: boolean;
    currentStep?: number;
    totalSteps?: number;
    speed?: number;
    setSpeed?: (s: number) => void;
  };
  explanation?: string;
  pseudocode?: string;
}

const VisualizerShell: React.FC<VisualizerShellProps> = ({
  title,
  description,
  complexity,
  children,
  controls,
  explanation,
  pseudocode
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-500 max-w-2xl">{description}</p>
        </div>
        {complexity && (
          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Time Complexity</span>
              <span className="text-sm font-mono font-bold text-blue-600">{complexity.time}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Space Complexity</span>
              <span className="text-sm font-mono font-bold text-indigo-600">{complexity.space}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Main Animation Area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex-1 p-8 flex items-center justify-center">
              {children}
            </div>

            {/* Playback Controls */}
            {controls && (
              <div className="border-t bg-slate-50/50 p-4 flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={controls.onStepBack}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={controls.isPlaying ? controls.onPause : controls.onPlay}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-lg transition-transform active:scale-95"
                  >
                    {controls.isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} className="ml-1" fill="white" />}
                  </button>
                  <button 
                    onClick={controls.onStepForward}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button 
                    onClick={controls.onReset}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Step Progress</span>
                    <span>{controls.currentStep} / {controls.totalSteps}</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300" 
                      style={{ width: `${((controls.currentStep || 0) / (controls.totalSteps || 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-[150px]">
                  <Clock size={16} className="text-slate-400" />
                  <input 
                    type="range" 
                    min="100" 
                    max="2000" 
                    step="100"
                    value={controls.speed}
                    onChange={(e) => controls.setSpeed?.(parseInt(e.target.value))}
                    className="flex-1 accent-blue-600"
                  />
                  <span className="text-xs font-medium text-slate-500 w-10">
                    {((2100 - (controls.speed || 0)) / 1000).toFixed(1)}s
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Explanation Panel */}
          {explanation && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                How it works
              </h3>
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {explanation}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {pseudocode && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 overflow-hidden">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Pseudocode</h3>
              <pre className="text-blue-300 text-sm code-font overflow-x-auto">
                {pseudocode}
              </pre>
            </div>
          )}
          
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-indigo-900 font-bold mb-2">Pro Tip</h3>
            <p className="text-indigo-700 text-sm">
              Use the step-by-step controls to see exactly which indices are being shifted or compared during the operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerShell;
