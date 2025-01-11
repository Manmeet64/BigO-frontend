import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/bigo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      // Navigate to login page after successful signup
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-row h-[100vh] w-full bg-background">
      {/* Left Side - Welcome Section */}
      <div className="w-1/2 bg-blue-300 flex flex-col items-center justify-center p-12">
        <h1 className="text-4xl font-bold text-white mb-4">Join Us Today!</h1>
        <p className="text-lg text-gray-100 text-center">
          Create your account and start exploring learning paths and earning
          badges.
        </p>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-1/2 bg-slate-50 flex flex-col items-center justify-center p-12">
        <div className="w-3/4 max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Sign Up</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")} // Use navigate hook for Log In
                className="text-blue-600 hover:underline transition-colors cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
