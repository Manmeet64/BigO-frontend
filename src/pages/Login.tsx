import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/bigo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      const user = {
        id: data.user._id,
        // name: data.user.name,
        email: data.user.email,
      };

      // Store user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("token", data.token);

      // Navigate to the dashboard with the user ID
      navigate(`/cards/${user.id}`);
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
        <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
        <p className="text-lg text-gray-100 text-center">
          Unlock a world of learning paths and achievements. Start your journey
          today!
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-slate-50 flex flex-col items-center justify-center p-12">
        <div className="w-3/4 max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Login</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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
                placeholder="Enter your password"
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
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
