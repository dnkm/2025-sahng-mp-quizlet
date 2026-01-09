import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import MyDecksPage from "./pages/MyDecksPage";
import CreateDeckPage from "./pages/CreateDeckPage";
import PlayDeckPage from "./pages/PlayDeckPage";
import CreateDeckModePage from "./pages/CreateDeckModePage";
import ProtectedLayout from "./layouts/ProtectedLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="min-h-screen bg-light dark:bg-dark">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/decks" element={<MyDecksPage />} />
            <Route
              path="/decks/create/select"
              element={<CreateDeckModePage />}
            />
            <Route path="/decks/create" element={<CreateDeckPage />} />
            <Route path="/decks/:deckId/play" element={<PlayDeckPage />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
