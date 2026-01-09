import { useConvexAuth, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";

export default function CreateDeckPage() {
  const { isAuthenticated } = useConvexAuth();
  const topics = useQuery(api.topics.listTopics);
  const subTopics = useQuery(api.subTopics.listSubTopics);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryModeParam = searchParams.get("mode");
  const initialMode: "manual" | "ai" =
    queryModeParam === "ai" ? "ai" : "manual";
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<
    "private" | "unlisted" | "public"
  >("private");
  const [mode, setMode] = useState<"manual" | "ai">(initialMode);
  const [aiOption, setAiOption] = useState<"image" | "url">("image");
  const [aiImage, setAiImage] = useState<File | null>(null);
  const [aiUrl, setAiUrl] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>("");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  // If landing directly on /decks/create without a mode, send user to selector first
  useEffect(() => {
    if (!queryModeParam) {
      navigate("/decks/create/select");
    }
  }, [queryModeParam, navigate]);

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
      <h1 className="text-4xl font-bold mb-6">Create New Deck</h1>

      {/* Mode Toggle */}
      <div className="mb-8">
        <div className="inline-flex rounded-lg border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={
              "px-4 py-2 text-sm font-medium transition " +
              (mode === "manual"
                ? "bg-dark text-light dark:bg-light dark:text-dark"
                : "bg-light dark:bg-dark text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
            }
            aria-pressed={mode === "manual"}
          >
            Use Form (Manual)
          </button>
          <button
            type="button"
            onClick={() => setMode("ai")}
            className={
              "px-4 py-2 text-sm font-medium border-l-2 border-slate-200 dark:border-slate-800 transition " +
              (mode === "ai"
                ? "bg-dark text-light dark:bg-light dark:text-dark"
                : "bg-light dark:bg-dark text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
            }
            aria-pressed={mode === "ai"}
          >
            Use AI
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Choose how you’d like to build your deck.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium mb-2">Deck Name</label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="e.g., Algebra Basics"
            className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a brief description of your deck..."
            className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2 resize-none"
            rows={3}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <select
              className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Select a topic</option>
              {topics?.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name} {topic.popular ? "⭐" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sub-topic</label>
            <select
              className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
              value={selectedSubTopic}
              onChange={(e) => setSelectedSubTopic(e.target.value)}
            >
              <option value="">Select a sub-topic</option>
              {subTopics
                ?.filter((subTopic) => subTopic.topicId === selectedTopic)
                .map((subTopic) => (
                  <option key={subTopic._id} value={subTopic._id}>
                    {subTopic.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Grade Level
            </label>
            <select
              className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
              value={selectedGradeLevel}
              onChange={(e) => setSelectedGradeLevel(e.target.value)}
            >
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Visibility</label>
          <select
            className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "private" | "unlisted" | "public")
            }
          >
            <option value="private">Private (Only you)</option>
            <option value="unlisted">Unlisted (Share via link)</option>
            <option value="public">Public (Anyone can find)</option>
          </select>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {visibility === "private" && "Only you can see this deck."}
            {visibility === "unlisted" &&
              "Share the link with anyone to let them study."}
            {visibility === "public" &&
              "This deck will appear in browse and searches."}
          </p>
        </div>

        {mode === "manual" ? (
          <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-6">
            <h2 className="text-2xl font-bold mb-4">Add Cards</h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Enter your question"
                  className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">
                  Options
                </label>
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
        ) : (
          <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-6">
            <h2 className="text-2xl font-bold mb-2">AI Builder</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Generate multiple-choice cards from a photo or a webpage URL. (UI
              only)
            </p>

            {/* AI Option Toggle */}
            <div className="inline-flex rounded-lg border-2 border-slate-200 dark:border-slate-800 overflow-hidden mb-4">
              <button
                type="button"
                onClick={() => setAiOption("image")}
                className={
                  "px-4 py-2 text-sm font-medium transition " +
                  (aiOption === "image"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-light dark:bg-dark text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
                }
                aria-pressed={aiOption === "image"}
              >
                Upload Photo
              </button>
              <button
                type="button"
                onClick={() => setAiOption("url")}
                className={
                  "px-4 py-2 text-sm font-medium border-l-2 border-slate-200 dark:border-slate-800 transition " +
                  (aiOption === "url"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-light dark:bg-dark text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
                }
                aria-pressed={aiOption === "url"}
              >
                Enter URL
              </button>
            </div>

            {aiOption === "image" ? (
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <label className="block text-sm font-medium mb-2">
                  Select an image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAiImage(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-200 dark:file:bg-slate-700 file:text-slate-900 dark:file:text-slate-100 hover:file:bg-slate-300 dark:hover:file:bg-slate-600"
                />
                {aiImage ? (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Selected:{" "}
                    <span className="font-medium">{aiImage.name}</span>
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    JPG, PNG or HEIC. Max ~10MB.
                  </p>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="cursor-not-allowed opacity-60 bg-dark dark:bg-light text-light dark:text-dark px-4 py-2 rounded-md"
                    title="Placeholder – backend not implemented"
                  >
                    Extract & Generate (AI)
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    onClick={() => setAiImage(null)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <label className="block text-sm font-medium mb-2">
                  Source URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/article-or-notes"
                  value={aiUrl}
                  onChange={(e) => setAiUrl(e.target.value)}
                  className="w-full bg-light dark:bg-dark border-2 border-slate-200 dark:border-slate-800 rounded-md px-4 py-2"
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Paste a page with study content; the AI will summarize into
                  cards.
                </p>

                <div className="mt-4">
                  <button
                    type="button"
                    className="cursor-not-allowed opacity-60 bg-dark dark:bg-light text-light dark:text-dark px-4 py-2 rounded-md"
                    title="Placeholder – backend not implemented"
                  >
                    Fetch & Generate (AI)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
