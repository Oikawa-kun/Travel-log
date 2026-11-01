import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
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
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "stretch",
      }}
    >
      {/* Left panel — decorative */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0d111c 0%, #151c2c 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 60px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(212,165,116,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,165,116,0.08), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "-5%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(126,184,212,0.06), transparent)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              marginBottom: "60px",
            }}
          >
            <span style={{ fontSize: "24px" }}>✈️</span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "24px",
                fontWeight: "700",
                color: "#f2ede6",
              }}
            >
              Travel<span style={{ color: "#d4a574" }}>Log</span>
            </span>
          </Link>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "700",
              letterSpacing: "-1.5px",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}
          >
            Start Your
            <br />
            <span className="accent-text" style={{ fontStyle: "italic" }}>
              Himalayan
            </span>
            <br />
            Journey
          </h1>

          <p
            style={{
              color: "rgba(242,237,230,0.5)",
              fontSize: "16px",
              lineHeight: "1.7",
              marginBottom: "48px",
              maxWidth: "360px",
            }}
          >
            Join thousands of travelers documenting Nepal's most incredible
            routes, peaks, and hidden gems.
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {[
              {
                emoji: "🗺️",
                text: "Google Maps integration for every destination",
              },
              { emoji: "📸", text: "Share photos from your trek" },
              { emoji: "👥", text: "Connect with Nepal travel community" },
              { emoji: "⭐", text: "Rate and review destinations" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  animation: "slideIn 0.5s ease",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(212,165,116,0.1)",
                    border: "1px solid rgba(212,165,116,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>
                <span
                  style={{ fontSize: "14px", color: "rgba(242,237,230,0.6)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            animation: "fadeUp 0.7s ease",
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#f2ede6",
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}
            >
              Create Account
            </h2>
            <p style={{ color: "rgba(242,237,230,0.45)", fontSize: "15px" }}>
              Free forever. No credit card needed.
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
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "Your full name",
              },
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
                placeholder: "Min. 6 characters",
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
                  minLength={field.name === "password" ? 6 : undefined}
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
                marginTop: "8px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Creating Account..." : "Create Account →"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#d4a574",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>

          <p
            style={{
              textAlign: "center",
              color: "rgba(242,237,230,0.2)",
              fontSize: "12px",
              marginTop: "20px",
            }}
          >
            By registering you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
