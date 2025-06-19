import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Error al registrar. Verifica los datos e intenta de nuevo."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-300 dark:border-gray-700">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
            <LockClosedIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Completa tus datos
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Usuario"
            name="username"
            icon={UserIcon}
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            icon={EnvelopeIcon}
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Contraseña"
            name="password"
            type="password"
            icon={LockClosedIcon}
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            label="Confirmar contraseña"
            name="confirm_password"
            type="password"
            icon={LockClosedIcon}
            value={formData.confirm_password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Registrarse
          </button>
          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Icon className="absolute top-2.5 left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
}
