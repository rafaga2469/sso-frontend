import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axios";

export default function OAuthAuthorize() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const clientId = params.get("client_id");
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (clientId) {
      API.get(`/oauth/clients/${clientId}/`)
        .then((res) => setClient(res.data))
        .catch(() => setError("No se pudo obtener la información de la aplicación"));
    } else {
      setError("Solicitud inválida");
    }
  }, [clientId]);

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  if (!client) {
    return <p className="p-6 text-center">Cargando...</p>;
  }

  const redirectToBackend = (allow) => {
    const q = new URLSearchParams(search);
    q.set("allow", allow ? "true" : "false");
    window.location.href = `${API.defaults.baseURL}/o/authorize/?${q.toString()}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-lg font-semibold mb-4">
          {client.name || clientId} solicita acceso
        </h1>
        <p className="text-sm mb-6">¿Deseas conceder acceso a esta aplicación?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => redirectToBackend(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Autorizar
          </button>
          <button
            onClick={() => redirectToBackend(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
