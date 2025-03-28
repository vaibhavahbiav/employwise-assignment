import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.token, "userEmail", email);
      localStorage.setItem("userEmail", email);
      navigate("/dashboard/info");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-400">
      <div className="bg-gray-100 p-8 rounded-lg w-11/12 sm:w-96 shadow-lg shadow-orange-600">
        <h2 className="text-2xl text-center mb-6 font-semibold text-orange-500"><span className="tracking-wider font-bold underline underline-offset-8">EmployWise</span> Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded bg-orange-400 text-gray-100 font-semibold outline-orange-600 placeholder:italic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded bg-orange-400 text-gray-100 font-semibold outline-orange-600 placeholder:italic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            {error && <p className="text-red-500 text-center mb-2 font-semibold">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 font-semibold text-lg text-gray-200 p-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
