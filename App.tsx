
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DSAVisualizer from './components/dsa/DSAVisualizer';
import DBMSViewer from './components/dbms/DBMSViewer';
import SQLPlayground from './components/sql/SQLPlayground';
import { Topic, ModuleType } from './types';
import { ChevronRight, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('DSA');
  const [activeTopic, setActiveTopic] = useState<string>('array');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const topics: Topic[] = [
    // DSA
    { id: 'array', name: 'Array Operations', module: 'DSA' },
    { id: 'search', name: 'Binary Search', module: 'DSA' },
    { id: 'sort', name: 'Sorting Algorithms', module: 'DSA' },
    { id: 'stack', name: 'Stack (LIFO)', module: 'DSA' },
    { id: 'queue', name: 'Queue (FIFO)', module: 'DSA' },
    { id: 'linkedlist', name: 'Linked List', module: 'DSA' },
    { id: 'tree', name: 'Binary Search Tree', module: 'DSA' },
    // DBMS
    { id: 'intro', name: 'DBMS Basics', module: 'DBMS' },
    { id: 'er', name: 'ER Modeling', module: 'DBMS' },
    { id: 'normalization', name: 'Normalization', module: 'DBMS' },
    { id: 'acid', name: 'ACID Properties', module: 'DBMS' },
    // SQL
    { id: 'playground', name: 'SQL Query Editor', module: 'SQL' },
    { id: 'joins', name: 'SQL Joins Visual', module: 'SQL' },
  ];

  return (
    <div className="flex h-screen w-full bg-white text-slate-900">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-xl"
      >
        <Menu size={24} />
      </button>

      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        isOpen={isSidebarOpen}
        topics={topics}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:pl-0' : 'pl-0'}`}>
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="font-semibold text-blue-600">{activeModule}</span>
            <ChevronRight size={16} />
            <span className="font-medium text-slate-800">
              {topics.find(t => t.id === activeTopic)?.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex bg-slate-100 rounded-lg p-1">
              {(['DSA', 'DBMS', 'SQL'] as ModuleType[]).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    setActiveModule(m);
                    setActiveTopic(topics.find(t => t.module === m)?.id || '');
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeModule === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50 p-6 lg:p-8">
          {activeModule === 'DSA' && <DSAVisualizer topicId={activeTopic} />}
          {activeModule === 'DBMS' && <DBMSViewer topicId={activeTopic} />}
          {activeModule === 'SQL' && <SQLPlayground topicId={activeTopic} />}
        </div>
      </main>
    </div>
  );
};

export default App;
