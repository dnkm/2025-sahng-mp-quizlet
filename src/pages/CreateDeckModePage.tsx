import { useConvexAuth } from "convex/react";
import { useNavigate } from "react-router-dom";

export default function CreateDeckModePage() {
  const { isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();

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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-3">Create Deck</h1>
      <p className="text-slate-700 dark:text-slate-300 mb-8">
        Choose how you’d like to build your deck. You can switch modes later.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-light dark:bg-dark p-6 flex flex-col">
          <div className="text-2xl mb-2">✍️ Manual Mode</div>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Use a simple form to add questions and multiple-choice options one
            by one. Best for precise control.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 mb-6 space-y-1">
            <li>Full control over each card</li>
            <li>Great for small, curated decks</li>
            <li>No AI required</li>
          </ul>
          <div className="mt-auto">
            <button
              type="button"
              onClick={() => navigate("/decks/create?mode=manual")}
              className="w-full md:w-auto bg-dark dark:bg-light text-light dark:text-dark px-5 py-2 rounded-md hover:opacity-90 transition"
            >
              Continue with Manual
            </button>
          </div>
        </div>

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-light dark:bg-dark p-6 flex flex-col">
          <div className="text-2xl mb-2">🤖 AI Mode</div>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Let AI draft cards from a photo of your notes or a webpage URL.
            You’ll be able to review and edit.
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 mb-6 space-y-1">
            <li>Upload photo or paste URL</li>
            <li>Quickly generate draft cards</li>
            <li>Review and refine afterwards</li>
          </ul>
          <div className="mt-auto">
            <button
              type="button"
              onClick={() => navigate("/decks/create?mode=ai")}
              className="w-full md:w-auto bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-2 rounded-md hover:opacity-90 transition"
            >
              Continue with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
