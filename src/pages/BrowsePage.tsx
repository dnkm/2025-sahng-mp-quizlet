import { useQuery } from "convex/react";
import { useMemo, useState } from "react";
import { api } from "../../convex/_generated/api";

const GRADES = [
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
  "College Freshman",
  "College Sophomore",
  "College Junior",
  "College Senior",
];

export default function BrowsePage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  // Only popular topics
  const topics = useQuery(api.topics.listPopularTopics);
  const subTopics = useQuery(api.subTopics.listSubTopics);

  const parsedSelectedGrade = useMemo(() => {
    if (!selectedGrade) return undefined;
    const match = selectedGrade.match(/\d+/);
    return match ? parseInt(match[0], 10) : undefined;
  }, [selectedGrade]);

  const byTopicId = useMemo(() => {
    if (!subTopics) return new Map<string, any[]>();
    const map = new Map<string, any[]>();
    for (const s of subTopics) {
      const key = s.topicId as unknown as string;
      const list = map.get(key) ?? [];
      map.set(key, [...list, s]);
    }
    return map;
  }, [subTopics]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse Decks</h1>

      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Filter by Grade
        </label>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2 w-64"
        >
          <option value="">All Grades</option>
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      {!topics || !subTopics ? (
        <div className="text-slate-500">Loading topics…</div>
      ) : (
        <div className="space-y-8">
          {topics
            .map((topic) => {
              const key = (topic._id as unknown as string) ?? "";
              let items = byTopicId.get(key) ?? [];
              if (parsedSelectedGrade) {
                items = items.filter((s) =>
                  (s.gradeLevels as number[]).includes(parsedSelectedGrade!),
                );
              }
              return { topic, items };
            })
            .filter(({ items }) => items.length > 0)
            .map(({ topic, items }) => (
              <div key={(topic._id as unknown as string) ?? topic.name}>
                <h2 className="text-2xl font-bold mb-4">
                  {topic.emoji} {topic.name}
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {items.map((s) => (
                    <TopicCard
                      key={(s._id as unknown as string) ?? s.name}
                      title={s.name}
                      grade={gradeRangeLabel(s.gradeLevels)}
                      deckCount={s.numDecks}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function TopicCard({
  title,
  grade,
  deckCount,
}: {
  title: string;
  grade: string;
  deckCount: number;
}) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{grade}</p>
      <p className="text-sm text-slate-500 dark:text-slate-500">
        {deckCount} decks available
      </p>
    </div>
  );
}

function gradeRangeLabel(gradeLevels: number[]): string {
  if (!gradeLevels || gradeLevels.length === 0) return "All Grades";
  const min = Math.min(...gradeLevels);
  const max = Math.max(...gradeLevels);
  if (min === max) return ordinal(min) + " Grade";
  return `Grades ${ordinal(min)}–${ordinal(max)}`;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
