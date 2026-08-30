
import React from 'react';
import { Topic, ModuleType } from '../types';
import { 
  Database, 
  Code, 
  Layers, 
  ChevronRight, 
  Table, 
  GitBranch, 
  Settings2,
  Box,
  Hash
} from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (m: ModuleType) => void;
  activeTopic: string;
  setActiveTopic: (t: string) => void;
  isOpen: boolean;
  topics: Topic[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  setActiveModule, 
  activeTopic, 
  setActiveTopic,
  isOpen,
  topics
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'array': return <Box size={18} />;
      case 'sort': return <Hash size={18} />;
      case 'stack': return <Layers size={18} />;
      case 'queue': return <Layers size={18} className="rotate-90" />;
      case 'linkedlist': return <GitBranch size={18} />;
      case 'tree': return <GitBranch size={18} className="rotate-180" />;
      case 'playground': return <Code size={18} />;
      default: return <Table size={18} />;
    }
  };

  return (
    <aside className={`
      bg-white border-r border-slate-200 transition-all duration-300 z-40
      fixed lg:static inset-y-0 left-0
      ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
    `}>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="p-6 flex items-center gap-3 border-b">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Database size={24} />
          </div>
          {isOpen && <span className="font-bold text-xl tracking-tight text-slate-800">AlgoDB</span>}
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {(['DSA', 'DBMS', 'SQL'] as ModuleType[]).map(module => (
            <div key={module}>
              {isOpen && (
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                  {module}
                </h3>
              )}
              <div className="space-y-1">
                {topics.filter(t => t.module === module).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveModule(module);
                      setActiveTopic(topic.id);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${activeTopic === topic.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <span className={activeTopic === topic.id ? 'text-blue-600' : 'text-slate-400'}>
                      {getIcon(topic.id)}
                    </span>
                    {isOpen && <span className="truncate">{topic.name}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Settings2 size={16} />
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-800">Learning Mode</span>
                <span className="text-[10px] text-slate-500">Interactive Visuals</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
