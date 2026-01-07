import { useConvexAuth } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDeckPage() {
  const { isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();
  const [deckName, setDeckName] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Create Deck</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Please sign in to create decks
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create New Deck</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Deck Name</label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="e.g., Algebra Basics"
            className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <select className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2">
              <option value="">Select a topic</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="cs">Computer Science</option>
              <option value="history">History</option>
              <option value="english">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sub-topic</label>
            <select className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2">
              <option value="">Select a sub-topic</option>
              <option value="algebra">Algebra</option>
              <option value="calculus">Calculus</option>
              <option value="geometry">Geometry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Grade Level</label>
          <select className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2">
            <option value="">Select grade level</option>
            <option value="7">7th Grade</option>
            <option value="8">8th Grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
            <option value="cf">College Freshman</option>
            <option value="cs">College Sophomore</option>
          </select>
        </div>

        <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-6">
          <h2 className="text-2xl font-bold mb-4">Add Cards</h2>
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Question</label>
              <input
                type="text"
                placeholder="Enter your question"
                className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">Options</label>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="radio"
                    name="correct"
                    id={`option-${i}`}
                    className="mt-1"
                  />
                  <input
                    type="text"
                    placeholder={`Option ${i}`}
                    className="flex-1 bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
                  />
                </div>
              ))}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Select the radio button for the correct answer
              </p>
            </div>
          </div>

          <button
            type="button"
            className="bg-slate-200 dark:bg-slate-700 text-dark dark:text-light px-4 py-2 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            + Add Another Card
          </button>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => void navigate("/decks")}
            className="px-6 py-2 rounded-md border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-dark dark:bg-light text-light dark:text-dark px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Create Deck
          </button>
        </div>
      </form>
    </div>
  );
}
