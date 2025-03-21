import { useState } from "react";
import { supabase } from "../../supabase/client";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

export default function SignInPage() {
  const { session } = useSession();
  if (session) return <Navigate to="/" />;

  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Iniciando session...");
    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      alert(error.message);
    }
    setStatus("");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-white gap-2">
      <Link to="/">◄ Home</Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign In
        </h2>

        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleInputChange}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleInputChange}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <Link to="/register">Don't have an account? Sign Up</Link>
      {status && <p>{status}</p>}
    </main>
  );
}
