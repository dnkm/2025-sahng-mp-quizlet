import { useConvexAuth } from "convex/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function ProtectedLayout() {
  const { isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Sign in required</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
        You need to be signed in to access this page.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          type="button"
          className="bg-dark dark:bg-light text-light dark:text-dark px-6 py-2 rounded-md hover:opacity-90 transition"
          onClick={() => navigate("/", { state: { from: location.pathname } })}
        >
          Go to Home
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded-md border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
        Use the Sign in button in the top-right to authenticate.
      </p>
    </div>
  );
}
