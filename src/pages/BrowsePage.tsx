import { useState } from "react";

const GRADES = [
  "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade",
  "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade",
  "College Freshman", "College Sophomore", "College Junior", "College Senior"
];

export default function BrowsePage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse Decks</h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">Filter by Grade</label>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2 w-64"
        >
          <option value="">All Grades</option>
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">📐 Math</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <TopicCard title="Algebra" grade="9th Grade" deckCount={12} />
            <TopicCard title="Calculus" grade="11th Grade" deckCount={8} />
            <TopicCard title="Geometry" grade="10th Grade" deckCount={15} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">🔬 Science</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <TopicCard title="Physics" grade="10th Grade" deckCount={10} />
            <TopicCard title="Biology" grade="9th Grade" deckCount={14} />
            <TopicCard title="Chemistry" grade="10th Grade" deckCount={11} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">🤖 Computer Science</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <TopicCard title="AI Fundamentals" grade="College Freshman" deckCount={6} />
            <TopicCard title="Data Structures" grade="College Sophomore" deckCount={9} />
            <TopicCard title="Algorithms" grade="College Junior" deckCount={7} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({ title, grade, deckCount }: { title: string; grade: string; deckCount: number }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{grade}</p>
      <p className="text-sm text-slate-500 dark:text-slate-500">{deckCount} decks available</p>
    </div>
  );
}
