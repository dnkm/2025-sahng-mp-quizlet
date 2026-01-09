import { Link } from "react-router-dom";
import { useConvexAuth } from "convex/react";

export default function MyDecksPage() {
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">My Decks</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Please sign in to view and manage your decks
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Decks</h1>
        <Link
          to="/decks/create/select"
          className="bg-dark dark:bg-light text-light dark:text-dark px-6 py-2 rounded-md hover:opacity-90 transition"
        >
          Create New Deck
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <p className="text-slate-600 dark:text-slate-400 col-span-3 text-center py-12">
          No decks yet. Create your first deck to get started!
        </p>
      </div>
    </div>
  );
}
