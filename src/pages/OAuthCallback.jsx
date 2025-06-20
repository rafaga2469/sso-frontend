import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      loginWithCode(code).then(() => navigate("/dashboard"));
    } else {
      navigate("/login");
    }
  }, [loginWithCode, navigate]);

  return <p className="p-6 text-center">Procesando autenticación...</p>;
}
