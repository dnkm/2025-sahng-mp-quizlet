export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to QuizDeck</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Master your subjects with interactive flashcards and quizzes
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">📚 Browse Decks</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Explore decks across different topics and subjects tailored to your grade level
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">✏️ Create Decks</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Build your own custom quiz decks with questions and multiple choice answers
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">📈 Track Progress</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor your improvement over time and retire mastered questions
          </p>
        </div>
      </div>
    </div>
  );
}
