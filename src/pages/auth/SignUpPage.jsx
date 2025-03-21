import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useSession } from "../../context/SessionContext";

const SignUpPage = () => {
  // ==============================
  // If user is already logged in, redirect to home
  const { session } = useSession();
  if (session) return <Navigate to="/" />;
  // maybe we can create a wrapper component for these pages
  // just like the ./router/AuthProtectedRoute.tsx? up to you.
  // ==============================
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
    setStatus("Creating account...");
    const { error } = await supabase.auth.signUp({
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
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <form
        className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="">Sign Up</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
          Demo app, please don't use your real email or password
        </p>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Account
        </button>
        <Link to="/login">Already have an account? Sign In</Link>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
