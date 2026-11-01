import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 20px 40px",
      }}
    >
      {/* BG effects */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,165,116,0.06), transparent)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(126,184,212,0.05), transparent)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          animation: "fadeUp 0.7s ease",
          position: "relative",
        }}
      >
        {/* Card */}
        <div
          className="glass-card"
          style={{ borderRadius: "24px", padding: "52px 44px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                fontSize: "44px",
                marginBottom: "18px",
                display: "block",
              }}
            >
              🌏
            </div>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#f2ede6",
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}
            >
              Welcome{" "}
              <span className="accent-text" style={{ fontStyle: "italic" }}>
                Back
              </span>
            </h1>
            <p style={{ color: "rgba(242,237,230,0.45)", fontSize: "15px" }}>
              Continue your journey
            </p>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(220,80,80,0.1)",
                border: "1px solid rgba(220,80,80,0.25)",
                color: "#f08080",
                padding: "13px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              {
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "you@example.com",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Your password",
              },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    color: "rgba(242,237,230,0.65)",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {field.label}
                </label>
                <input
                  className="input-field"
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "16px",
                marginTop: "10px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "rgba(242,237,230,0.4)",
              marginTop: "28px",
              fontSize: "14px",
            }}
          >
            New to TravelLog?{" "}
            <Link
              to="/register"
              style={{
                color: "#d4a574",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Decorative bottom */}
        <p
          style={{
            textAlign: "center",
            color: "rgba(242,237,230,0.2)",
            fontSize: "12px",
            marginTop: "24px",
          }}
        >
          🏔️ Nepal's Premier Travel Community
        </p>
      </div>
    </div>
  );
}
