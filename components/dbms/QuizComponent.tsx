
import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCcw, HelpCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  topicId: string;
  questions: Question[];
}

const QuizComponent: React.FC<QuizProps> = ({ topicId, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Quiz Completed!</h3>
          <p className="text-slate-500">You scored {score} out of {questions.length}</p>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000" 
            style={{ width: `${(score / questions.length) * 100}%` }}
          />
        </div>
        <button 
          onClick={resetQuiz}
          className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCcw size={18} /> Retake Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-800 tracking-tight">Interactive Quiz</h3>
        </div>
        <span className="text-xs font-bold text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
      </div>

      <div className="p-8 space-y-6">
        <h4 className="text-lg font-semibold text-slate-800 leading-snug">
          {currentQuestion.question}
        </h4>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let stateClass = "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50";
            if (selectedOption === index) stateClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
            if (isSubmitted) {
              if (index === currentQuestion.correctAnswer) stateClass = "border-green-500 bg-green-50 ring-1 ring-green-500";
              else if (selectedOption === index) stateClass = "border-red-500 bg-red-50 ring-1 ring-red-500";
              else stateClass = "border-slate-100 opacity-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${stateClass}`}
              >
                <span className="font-medium text-slate-700">{option}</span>
                {isSubmitted && index === currentQuestion.correctAnswer && <CheckCircle2 size={18} className="text-green-600" />}
                {isSubmitted && selectedOption === index && index !== currentQuestion.correctAnswer && <XCircle size={18} className="text-red-600" />}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              <span className="font-bold text-slate-800 not-italic">Explanation:</span> {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all ${
                selectedOption === null 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
