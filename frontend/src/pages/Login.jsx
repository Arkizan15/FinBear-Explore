import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from '../config';

function Login() {
  const [mode, setMode] = useState("menu");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#59669C] h-screen overflow-hidden">
      <div className="flex justify-center items-center h-full">
        <div className="bg-[#ABB3DA] backdrop-blur-md p-40 rounded-2xl shadow-lg flex flex-col justify-center items-center w-fit gap-6">
          <h1
            className="text-7xl mb-10 text-[#1b1a1f]"
            style={{ fontFamily: "'Jersey 20', sans-serif" }}
          >
            Welcome
          </h1>

          {mode === "menu" && (
            <div className="flex flex-col gap-5 items-center">
              <button
                onClick={() => navigate("/")}
                className="absolute top-5 left-5 cursor-pointer text-white"
              >
                ← Kembali ke Home
              </button>
              <button
                onClick={() => setMode("signup")}
                className="bg-[#1b1a1f] px-20 py-5 rounded text-white hover:opacity-80 transiton cursor-pointer"
              >
                Sign Up
              </button>
              <button
                onClick={() => setMode("signin")}
                className="bg-[#1b1a1f] px-21 py-5 rounded text-white hover:opacity-80 transiton cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}

          {mode === "signin" && (
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-5 items-center"
            >
              <input
                type="text"
                placeholder="Masukkan Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="bg-[#1b1a1f] px-10 py-3 rounded text-center outline-none text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-[#1b1a1f] px-10 py-3 rounded text-center outline-none text-white"
              />

              <button className="mt-3 cursor-pointer text-[#1b1a1f] font-semibold bg-white px-8 py-2 rounded" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Masuk"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={() => setMode("menu")}
                className="text-sm mt-2 cursor-pointer"
              >
                ← Kembali
              </button>
            </form>
          )}

          {mode === "signup" && (
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-5 items-center"
            >
              <input
                type="text"
                placeholder="Masukkan Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="bg-[#1b1a1f] px-10 py-3 rounded text-center outline-none text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="bg-[#1b1a1f] px-10 py-3 rounded text-center outline-none text-white"
              />

              <button
                className="mt-3 font-semibold cursor-pointer text-[#1b1a1f] bg-white px-8 py-2 rounded"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Daftar"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button onClick={() => { setMode("menu"); setError(""); }} className="text-sm mt-2 cursor-pointer text-white">
                ← Kembali
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
