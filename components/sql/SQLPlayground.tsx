
import React, { useState, useEffect } from 'react';
import { Play, Terminal, Database, Trash2, AlertCircle, Info } from 'lucide-react';
import { SQLTable } from '../../types';

const SQLPlayground: React.FC<{ topicId: string }> = ({ topicId }) => {
  const [query, setQuery] = useState('SELECT * FROM students;');
  const [tables, setTables] = useState<SQLTable[]>([
    {
      name: 'students',
      columns: ['id', 'name', 'age', 'course', 'grade'],
      rows: [
        [1, 'Alice Smith', 20, 'CS', 'A'],
        [2, 'Bob Jones', 22, 'Math', 'B'],
        [3, 'Charlie Brown', 19, 'Physics', 'A'],
        [4, 'Diana Prince', 21, 'CS', 'A+'],
      ]
    },
    {
      name: 'enrollments',
      columns: ['student_id', 'course_id', 'date'],
      rows: [
        [1, 101, '2023-09-01'],
        [2, 102, '2023-09-02'],
      ]
    }
  ]);

  const [result, setResult] = useState<SQLTable | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>(['Database initialized.', 'Query playground ready.']);

  const executeQuery = () => {
    setError(null);
    const q = query.trim().toUpperCase();
    
    if (q.startsWith('SELECT')) {
      // Mock SELECT logic
      if (q.includes('FROM STUDENTS')) {
        setResult(tables[0]);
        setLogs(prev => [...prev, 'Fetched 4 rows from students.']);
      } else if (q.includes('FROM ENROLLMENTS')) {
        setResult(tables[1]);
        setLogs(prev => [...prev, 'Fetched 2 rows from enrollments.']);
      } else {
        setError('Table not found in simulated database.');
      }
    } else if (q.startsWith('INSERT')) {
      setLogs(prev => [...prev, 'Row inserted successfully (Simulated).']);
    } else {
      setError('Syntax Error: Only basic SELECT queries are supported in this demo.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900">SQL Playground</h1>
        <p className="text-slate-500">Practice DQL, DML, and DDL commands in real-time. (Simulated Environment)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Editor Area */}
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="bg-slate-800 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-blue-400" />
                <span className="text-slate-300 text-sm font-bold tracking-tight">Query Editor</span>
              </div>
              <button 
                onClick={executeQuery}
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                <Play size={14} fill="currentColor" /> Run Query
              </button>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-48 bg-transparent text-blue-100 p-6 code-font focus:outline-none resize-none leading-relaxed"
              placeholder="Enter SQL query..."
            />
          </div>

          {/* Result Area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Query Result</h3>
              {result && <span className="text-xs font-bold text-slate-400">{result.rows.length} rows found</span>}
            </div>
            
            <div className="p-0 overflow-auto">
              {error ? (
                <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle size={24} />
                  </div>
                  <div className="text-red-600 font-bold">{error}</div>
                </div>
              ) : result ? (
                <table className="w-full text-left">
                  <thead className="bg-slate-100">
                    <tr>
                      {result.columns.map(col => (
                        <th key={col} className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-3 text-sm text-slate-700">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-20 text-center text-slate-400 flex flex-col items-center gap-3">
                  <Database size={48} className="opacity-10" />
                  <p>Run a query to see results here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Database size={18} className="text-blue-600" /> Database Schema
            </h3>
            <div className="space-y-4">
              {tables.map(table => (
                <div key={table.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="font-bold text-sm text-slate-700">{table.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-3">
                    {table.columns.map(col => (
                      <span key={col} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded border border-slate-200">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Execution Logs</h3>
                <button onClick={() => setLogs([])}><Trash2 size={12} className="text-slate-500" /></button>
             </div>
             <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                {logs.map((log, i) => (
                  <div key={i} className="text-[11px] code-font text-green-400/80">
                    <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
             <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
               <Info size={18} /> Cheat Sheet
             </h3>
             <ul className="text-xs text-indigo-700 space-y-2">
               <li><code className="bg-indigo-100 px-1 rounded">SELECT * FROM students</code></li>
               <li><code className="bg-indigo-100 px-1 rounded">SELECT name, age FROM students</code></li>
               <li><code className="bg-indigo-100 px-1 rounded">WHERE age {'>'} 20</code></li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLPlayground;
