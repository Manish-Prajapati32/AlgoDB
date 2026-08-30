
import React, { useState } from 'react';
import { Database, Info, Layout, Lock, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import QuizComponent from './QuizComponent';

const DBMSViewer: React.FC<{ topicId: string }> = ({ topicId }) => {
  const [activeStep, setActiveStep] = useState(0);

  const renderContent = () => {
    switch (topicId) {
      case 'intro':
        return (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-bold">What is a DBMS?</h3>
                <p className="text-slate-600 leading-relaxed">
                  A Database Management System (DBMS) is software designed to store, retrieve, and manage data in databases. 
                  It acts as an interface between the database and its end-users or programs, ensuring that data is consistently 
                  organized and remains easily accessible.
                </p>
              </div>
              <div className="bg-indigo-600 p-8 rounded-3xl shadow-lg text-white flex flex-col gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold">Data vs Information</h3>
                <ul className="space-y-4 text-indigo-100">
                  <li className="flex gap-3">
                    <span className="font-bold text-white">Data:</span> Raw, unorganized facts that need to be processed (e.g., 20, "Alice").
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-white">Information:</span> When data is processed, organized, or structured so it becomes meaningful.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold mb-6">3-Schema Architecture</h3>
              <div className="flex flex-col gap-4 max-w-xl mx-auto">
                <div className="bg-blue-500 text-white p-4 rounded-xl text-center font-bold shadow-md">External Level (User View)</div>
                <div className="flex justify-center"><div className="w-0.5 h-6 bg-slate-200"></div></div>
                <div className="bg-indigo-500 text-white p-4 rounded-xl text-center font-bold shadow-md">Conceptual Level (Logical Design)</div>
                <div className="flex justify-center"><div className="w-0.5 h-6 bg-slate-200"></div></div>
                <div className="bg-slate-800 text-white p-4 rounded-xl text-center font-bold shadow-md">Internal Level (Physical Storage)</div>
              </div>
            </div>

            <QuizComponent topicId="intro" questions={introQuestions} />
          </div>
        );
      case 'er':
        return (
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center gap-12">
               <div className="text-center space-y-2">
                 <h3 className="text-2xl font-bold text-slate-800">Entity-Relationship Modeling</h3>
                 <p className="text-slate-500">Visualizing structural designs of databases.</p>
               </div>
               <div className="relative w-full max-w-3xl h-64 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {/* Entity 1 */}
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 w-32 h-16 bg-blue-600 text-white font-bold flex items-center justify-center rounded-xl shadow-lg z-10">
                    STUDENT
                  </div>
                  {/* Relationship */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-blue-400 rotate-45 flex items-center justify-center bg-white shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                    <span className="-rotate-45 text-xs font-bold text-blue-600">ENROLLS</span>
                  </div>
                  {/* Entity 2 */}
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 h-16 bg-blue-600 text-white font-bold flex items-center justify-center rounded-xl shadow-lg z-10">
                    COURSE
                  </div>
                  {/* Lines */}
                  <div className="absolute left-[168px] top-1/2 w-[110px] h-0.5 bg-blue-100"></div>
                  <div className="absolute right-[168px] top-1/2 w-[110px] h-0.5 bg-blue-100"></div>
                  
                  {/* Decorative Attributes */}
                  <div className="absolute left-20 top-10 w-20 h-10 border border-slate-300 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 italic">Name</div>
                  <div className="absolute left-4 top-1/4 w-20 h-10 border border-slate-300 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 italic underline decoration-blue-500"><u>ID</u></div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <span className="font-bold text-blue-800 text-lg block mb-1">Entity</span>
                    <span className="text-sm text-blue-600">Represented by a Rectangle. A real-world object like 'Person' or 'Product'.</span>
                  </div>
                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                    <span className="font-bold text-amber-800 text-lg block mb-1">Attribute</span>
                    <span className="text-sm text-amber-600">Represented by an Ellipse. Properties of an entity like 'Name' or 'Age'.</span>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <span className="font-bold text-indigo-800 text-lg block mb-1">Relationship</span>
                    <span className="text-sm text-indigo-600">Represented by a Diamond. How two entities interact or relate.</span>
                  </div>
               </div>
            </div>

            <QuizComponent topicId="er" questions={erQuestions} />
          </div>
        );
      case 'acid':
        return (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {acidProps.map(prop => (
                <div key={prop.key} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:shadow-md hover:border-blue-300 transition-all cursor-default">
                  <div className={`w-14 h-14 ${prop.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner`}>
                    {prop.key}
                  </div>
                  <h3 className="font-bold text-xl text-slate-800">{prop.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{prop.desc}</p>
                </div>
              ))}
            </div>
            
            <QuizComponent topicId="acid" questions={acidQuestions} />
          </div>
        );
      case 'normalization':
        return (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-8 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layout size={20} className="text-blue-600" />
                  <h3 className="font-bold text-slate-800">Normalization Pipeline</h3>
                </div>
                <div className="flex gap-2 p-1 bg-white rounded-xl border border-slate-100">
                  {[1, 2, 3].map(s => (
                    <button 
                      key={s} 
                      onClick={() => setActiveStep(s-1)}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${activeStep === s-1 ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                      {s}NF
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-12 flex flex-col lg:flex-row items-center gap-12">
                 <div className="flex-1 space-y-6">
                   <h4 className="text-3xl font-bold text-slate-800">{normSteps[activeStep].title}</h4>
                   <p className="text-slate-600 leading-relaxed text-lg">{normSteps[activeStep].desc}</p>
                   <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-blue-500 block mb-2 tracking-widest">The "Golden Rule"</span>
                      <p className="text-lg font-medium text-slate-800 italic">"{normSteps[activeStep].rule}"</p>
                   </div>
                 </div>
                 <div className="flex-1 w-full max-w-md">
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText size={120} className="text-white" />
                      </div>
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Relational Model</span>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-8 bg-blue-600/40 rounded-lg border border-blue-500/30"></div>
                          <div className="h-8 bg-blue-600/40 rounded-lg border border-blue-500/30"></div>
                          <div className="h-8 bg-blue-600/40 rounded-lg border border-blue-500/30"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-6 bg-slate-800 rounded-lg"></div>
                          <div className="h-6 bg-slate-800 rounded-lg"></div>
                          <div className="h-6 bg-slate-800 rounded-lg"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 opacity-40">
                          <div className="h-6 bg-slate-800 rounded-lg"></div>
                          <div className="h-6 bg-slate-800 rounded-lg"></div>
                          <div className="h-6 bg-slate-800 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <QuizComponent topicId="normalization" questions={normQuestions} />
          </div>
        )
      default:
        return <div className="p-12 text-center text-slate-400">DBMS Visualization for {topicId} coming soon.</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-6 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl flex items-center justify-center shadow-xl transform rotate-3">
          <Database size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">DBMS Master Class</h1>
          <p className="text-slate-500 text-lg">Visual concepts + Interactive Knowledge Checks</p>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

// --- DATA ---

const acidProps = [
  { key: 'A', title: 'Atomicity', desc: 'All or nothing. Either the entire transaction succeeds or it completely fails. Partial success is not allowed.', color: 'bg-rose-500' },
  { key: 'C', title: 'Consistency', desc: 'The database stays in a valid state. No rules or constraints are broken after a transaction commits.', color: 'bg-blue-500' },
  { key: 'I', title: 'Isolation', desc: 'Transactions do not interfere with each other. Parallel transactions appear to run sequentially.', color: 'bg-indigo-500' },
  { key: 'D', title: 'Durability', desc: 'Once committed, the data is permanent. Even system crashes or power losses wont delete the changes.', color: 'bg-emerald-500' },
];

const normSteps = [
  { 
    title: 'First Normal Form (1NF)', 
    desc: 'Ensures that all columns in a table contain only atomic (indivisible) values and that there are no repeating groups of columns.',
    rule: 'Every cell must hold only a single value.'
  },
  { 
    title: 'Second Normal Form (2NF)', 
    desc: 'Builds on 1NF by requiring that all non-prime attributes are fully functionally dependent on the entire primary key.',
    rule: 'No partial functional dependencies allowed.'
  },
  { 
    title: 'Third Normal Form (3NF)', 
    desc: 'Ensures that all columns are dependent only on the primary key, eliminating transitive dependencies.',
    rule: 'Non-key columns must only depend on the primary key.'
  },
];

// --- QUESTIONS ---

const introQuestions = [
  {
    question: "Which level of the 3-Schema Architecture describes the physical storage structure of the database?",
    options: ["External Level", "Conceptual Level", "Internal Level", "Logical Level"],
    correctAnswer: 2,
    explanation: "The Internal Level (also called Physical Level) is the lowest level that describes how data is actually stored on storage disks."
  },
  {
    question: "What is the primary difference between Data and Information?",
    options: ["Information is raw facts, Data is processed", "Data is raw facts, Information is processed", "They are exactly the same", "Information is larger than Data"],
    correctAnswer: 1,
    explanation: "Data represents raw, unorganized facts. Information is what we get after data is processed, organized, or structured to be meaningful."
  }
];

const erQuestions = [
  {
    question: "In an ER Diagram, what shape represents a Relationship?",
    options: ["Rectangle", "Ellipse", "Diamond", "Square"],
    correctAnswer: 2,
    explanation: "Relationships are represented by Diamonds, Entities by Rectangles, and Attributes by Ellipses."
  },
  {
    question: "What is a 'Weak Entity'?",
    options: ["An entity with no primary key", "An entity that cannot be uniquely identified by its own attributes alone", "An entity with very few attributes", "An entity that only exists in 1NF"],
    correctAnswer: 1,
    explanation: "A weak entity is an entity that cannot be uniquely identified by its own attributes and relies on its relationship with a strong entity."
  }
];

const normQuestions = [
  {
    question: "A table where every cell contains exactly one value and no repeating groups is in which Normal Form?",
    options: ["Non-normalized", "1NF", "2NF", "3NF"],
    correctAnswer: 1,
    explanation: "Atomicity of values and absence of repeating groups are the core requirements for 1NF."
  },
  {
    question: "What is a Transitive Dependency?",
    options: ["When a key depends on another key", "When a non-key attribute depends on another non-key attribute", "When a row depends on a column", "When a table is split into two"],
    correctAnswer: 1,
    explanation: "Transitive dependency occurs when an attribute depends on another attribute that is not the primary key. Removing this is required for 3NF."
  }
];

const acidQuestions = [
  {
    question: "Which ACID property ensures that a transaction is 'All or Nothing'?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: 0,
    explanation: "Atomicity ensures that all operations in a transaction either occur successfully or none occur at all."
  },
  {
    question: "Isolation ensures that:",
    options: ["Data is permanent", "Data is consistent", "Concurrent transactions don't interfere with each other", "The database is always in 3NF"],
    correctAnswer: 2,
    explanation: "Isolation ensures that the execution of concurrent transactions is separate, as if they were running one after the other."
  }
];

export default DBMSViewer;
