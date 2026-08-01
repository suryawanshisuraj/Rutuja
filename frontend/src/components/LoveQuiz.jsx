import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function LoveQuiz({ quizQuestions, onAddQuestion }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctIndex: 0,
    explanation: ''
  });

  const currentQ = quizQuestions[currentIndex];

  const handleSelectOption = (optionIdx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      // Trigger romantic celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b0004a', '#fd6c9c', '#cca730', '#ffdad6']
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.question || !newQuestion.option1 || !newQuestion.option2) return;
    const qData = {
      question: newQuestion.question,
      options: [newQuestion.option1, newQuestion.option2, newQuestion.option3, newQuestion.option4].filter(Boolean),
      correctIndex: Number(newQuestion.correctIndex),
      explanation: newQuestion.explanation || 'Another sweet milestone of ours!'
    };
    onAddQuestion(qData);
    setIsAddModalOpen(false);
    setNewQuestion({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctIndex: 0,
      explanation: ''
    });
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1.5 rounded-full inline-block">
          Couples Trivia Game
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#b0004a]">
          How Well Do You Know Us?
        </h2>
        <p className="text-[#5a4044] text-base max-w-md mx-auto font-medium">
          Test your memory of our funny moments, dates, and inside jokes!
        </p>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-all text-xs font-semibold"
        >
          <span className="material-symbols-outlined text-base">extension</span>
          Add Trivia Question
        </button>
      </div>

      {!isCompleted ? (
        /* Question Card */
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/80 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#ab2c5d] uppercase tracking-wider">
              <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
              <span>{Math.round(((currentIndex + 1) / quizQuestions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-[#ffe9e7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#d81b60] transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#b0004a]">
            {currentQ?.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ?.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentIndex] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between font-medium text-sm sm:text-base ${
                    isSelected
                      ? 'border-[#d81b60] bg-[#fff0ef] text-[#b0004a] shadow-md ring-2 ring-[#d81b60]/30'
                      : 'border-[#e3bdc3]/60 bg-white hover:bg-[#fff8f7] text-[#3d0506]'
                  }`}
                >
                  <span>{opt}</span>
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                      isSelected
                        ? 'bg-[#d81b60] border-[#d81b60] text-white'
                        : 'border-[#8e6f74] text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation hint if answered */}
          {selectedAnswers[currentIndex] !== undefined && (
            <div className="p-4 rounded-2xl bg-[#ffe9e7]/70 border border-[#e3bdc3] text-xs text-[#5a4044] space-y-1">
              <p className="font-bold text-[#b0004a] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Memory Recall Note:
              </p>
              <p>{currentQ?.explanation}</p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-5 py-2 rounded-full border border-[#8e6f74] text-xs font-semibold text-[#3d0506] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === undefined}
              className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white text-xs font-bold shadow-md hover:bg-[#d81b60] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {currentIndex === quizQuestions.length - 1 ? 'Finish & See Score 🎉' : 'Next Question →'}
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/80 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b0004a] shadow-inner">
            <span className="material-symbols-outlined text-5xl filled">emoji_events</span>
          </div>

          <div>
            <h3 className="font-serif text-3xl font-bold text-[#b0004a]">
              Quiz Complete!
            </h3>
            <p className="text-[#5a4044] text-base font-medium mt-1">
              You scored <span className="font-bold text-[#b0004a] text-xl">{score}</span> out of{' '}
              <span className="font-bold text-xl">{quizQuestions.length}</span> ({percentage}%)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#fff0ef] border border-[#e3bdc3] max-w-md mx-auto">
            <p className="font-serif text-lg font-bold text-[#b0004a]">
              {percentage >= 75 ? '💕 Love Mastery! Match Made in Heaven!' : '🥂 Sweet Effort! Time for a Romantic Date!'}
            </p>
            <p className="text-xs text-[#5a4044] mt-2 font-medium">
              {percentage >= 75
                ? 'Your connection and memory of every shared moment is truly incredible!'
                : 'Every memory is a treasure. Let us create even more unforgettable chapters tonight!'}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-8 py-3 rounded-full bg-[#b0004a] text-white font-bold text-sm shadow-md hover:bg-[#d81b60] transition-all"
            >
              Retake Quiz 🔄
            </button>
          </div>
        </div>
      )}

      {/* Add Trivia Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#8e6f74] hover:text-[#3d0506] text-xl"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="material-symbols-outlined text-3xl text-[#b0004a]">
                quiz
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                Add Trivia Question
              </h3>
              <p className="text-xs text-[#5a4044] mt-1">
                Create a new question to test your partner's memory!
              </p>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., What was the first movie we watched together?"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[#e3bdc3] text-sm focus:outline-none focus:ring-2 focus:ring-[#d81b60]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d]">
                  Options & Correct Answer
                </label>
                {['option1', 'option2', 'option3', 'option4'].map((key, oIdx) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctIdx"
                      checked={Number(newQuestion.correctIndex) === oIdx}
                      onChange={() => setNewQuestion({ ...newQuestion, correctIndex: oIdx })}
                      className="accent-[#d81b60]"
                    />
                    <input
                      type="text"
                      required={oIdx < 2}
                      placeholder={`Option ${oIdx + 1}`}
                      value={newQuestion[key]}
                      onChange={(e) => setNewQuestion({ ...newQuestion, [key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#e3bdc3] text-xs focus:outline-none focus:ring-1 focus:ring-[#d81b60]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Memory Explanation / Hint
                </label>
                <input
                  type="text"
                  placeholder="e.g., We shared popcorn at the retro cinema on Friday."
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[#e3bdc3] text-sm focus:outline-none focus:ring-2 focus:ring-[#d81b60]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-[#8e6f74] text-[#3d0506] font-medium text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-full bg-[#b0004a] text-white font-medium text-sm hover:bg-[#d81b60] shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
