import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayDeckPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isNotSure, setIsNotSure] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSubmit = () => {
    // Handle answer submission
    setTimeLeft(30);
    setSelectedOption(null);
    setIsNotSure(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => void navigate(-1)}
          className="text-slate-600 dark:text-slate-400 hover:underline"
        >
          ← Back
        </button>
        <div className="text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400">Question 1 of 10</div>
          <div className="text-3xl font-bold mt-1">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What is the value of x in the equation: 2x + 5 = 13?
        </h2>

        <div className="space-y-4">
          {[
            { id: 1, text: "x = 4" },
            { id: 2, text: "x = 5" },
            { id: 3, text: "x = 6" },
            { id: 4, text: "x = 8" },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedOption(option.id);
                setIsNotSure(false);
              }}
              className={`w-full p-4 rounded-lg text-left transition ${
                selectedOption === option.id
                  ? "bg-dark dark:bg-light text-light dark:text-dark"
                  : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setIsNotSure(true);
            setSelectedOption(null);
          }}
          className={`px-8 py-3 rounded-md transition ${
            isNotSure
              ? "bg-yellow-500 text-dark"
              : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          🤔 I'm not sure
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption && !isNotSure}
          className="px-8 py-3 rounded-md bg-dark dark:bg-light text-light dark:text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
        >
          Submit Answer
        </button>
      </div>

      {isNotSure && (
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Good choice! This won't count as a guess and you'll see this question again.
        </div>
      )}
    </div>
  );
}
