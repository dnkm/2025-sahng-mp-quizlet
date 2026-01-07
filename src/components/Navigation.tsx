import { Link, useLocation } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/decks", label: "My Decks" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-10 bg-light dark:bg-dark border-b-2 border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold">
                QuizDeck
              </Link>
              <div className="flex gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-md transition ${
                      location.pathname === link.path
                        ? "bg-slate-200 dark:bg-slate-800"
                        : "hover:bg-slate-100 dark:hover:bg-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              {isAuthenticated ? (
                <button
                  onClick={() => void signOut()}
                  className="bg-slate-200 dark:bg-slate-800 text-dark dark:text-light rounded-md px-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-dark dark:bg-light text-light dark:text-dark rounded-md px-4 py-2 hover:opacity-90 transition"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}

function AuthModal({ onClose }: { onClose: () => void }) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-light dark:bg-dark p-8 rounded-lg max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {flow === "signIn" ? "Sign In" : "Sign Up"}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            formData.set("flow", flow);
            void signIn("password", formData)
              .then(() => onClose())
              .catch((error) => {
                setError(error.message);
              });
          }}
        >
          <input
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-3 border-2 border-slate-200 dark:border-slate-800"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-3 border-2 border-slate-200 dark:border-slate-800"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            className="bg-dark dark:bg-light text-light dark:text-dark rounded-md py-3 hover:opacity-90 transition"
            type="submit"
          >
            {flow === "signIn" ? "Sign in" : "Sign up"}
          </button>

          <div className="text-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              {flow === "signIn"
                ? "Don't have an account? "
                : "Already have an account? "}
            </span>
            <button
              type="button"
              className="text-dark dark:text-light underline hover:no-underline"
              onClick={() => {
                setFlow(flow === "signIn" ? "signUp" : "signIn");
                setError(null);
              }}
            >
              {flow === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
