import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage("");

    if (!username || !password) {
      setMessage("Please enter username and password.");
      return;
    }

    if (isRegister) {
      const data = await register(username, password);

      if (data.user_id) {
        setMessage("Registration successful. Please login.");
        setIsRegister(false);
        setPassword("");
      } else {
        setMessage(data.detail || "Registration failed.");
      }

      return;
    }

    const data = await login(username, password);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } else {
      setMessage(data.detail || "Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card auth-card-animate" key={isRegister ? "register" : "login"}>
        <h2>Tech Mart</h2>
        <p>{isRegister ? "Create a new account" : "Login to your account"}</p>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>

        {message && <div className="error-message">{message}</div>}

        <button
          className="switch-btn"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "No account? Register"}
        </button>
      </div>
    </div>
  );
}

export default Login;