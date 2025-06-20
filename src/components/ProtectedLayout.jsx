// src/components/ProtectedLayout.jsx
import { getGlobalLogout, useAuth } from "../context/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await getGlobalLogout()();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-200 text-gray-800 dark:text-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-xl font-semibold">Panel de usuario</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            Salir
          </button>
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
