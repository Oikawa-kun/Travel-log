/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user)
      api
        .get("/logs/user/" + user._id)
        .then((res) => setLogs(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    else setLoading(false);
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this log?")) return;
    await api.delete("/logs/" + id);
    setLogs((l) => l.filter((x) => x._id !== id));
  };

  if (!user)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#07090f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f2ede6",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "28px",
              marginBottom: "16px",
            }}
          >
            Please sign in first
          </h4>
          <Link
            to="/login"
            className="btn-primary"
            style={{
              padding: "14px 32px",
              borderRadius: "12px",
              fontSize: "15px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Sign In →
          </Link>
        </div>
      </div>
    );

  const totalStars = logs.reduce((a, l) => a + (l.rating || 0), 0);
  const uniqueTags = [...new Set(logs.flatMap((l) => l.tags || []))].length;
  const destinations = [...new Set(logs.map((l) => l.destination))].length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        color: "#f2ede6",
        padding: "110px 80px 60px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: "48px",
            animation: "fadeUp 0.6s ease",
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: "12px" }}>
              Personal Space
            </div>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "700",
                letterSpacing: "-1.5px",
                marginBottom: "8px",
              }}
            >
              Hey,{" "}
              <span className="accent-text" style={{ fontStyle: "italic" }}>
                {user.name.split(" ")[0]}
              </span>{" "}
              👋
            </h1>
            <p style={{ color: "rgba(242,237,230,0.45)", fontSize: "16px" }}>
              Here's your travel journey at a glance
            </p>
          </div>
          <Link
            to="/create-log"
            className="btn-primary"
            style={{
              padding: "14px 28px",
              borderRadius: "12px",
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            + New Log
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "48px",
            animation: "fadeUp 0.6s ease 0.1s both",
          }}
        >
          {[
            { label: "Total Logs", value: logs.length, emoji: "📝" },
            { label: "Destinations", value: destinations, emoji: "📍" },
            { label: "Total Stars", value: totalStars, emoji: "⭐" },
            { label: "Unique Tags", value: uniqueTags, emoji: "🏷️" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{
                padding: "28px 24px",
                borderRadius: "18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                {stat.emoji}
              </div>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#d4a574",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(242,237,230,0.45)",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Logs */}
        <div style={{ animation: "fadeUp 0.6s ease 0.2s both" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              marginBottom: "24px",
            }}
          >
            Your{" "}
            <span className="accent-text" style={{ fontStyle: "italic" }}>
              Stories
            </span>
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div
                style={{
                  fontSize: "36px",
                  animation: "float 2s ease-in-out infinite",
                }}
              >
                ✈️
              </div>
            </div>
          ) : logs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>🗺️</div>
              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "'Cormorant Garamond', serif",
                  marginBottom: "12px",
                  color: "rgba(242,237,230,0.6)",
                }}
              >
                No logs yet
              </h4>
              <Link
                to="/create-log"
                className="btn-primary"
                style={{
                  padding: "14px 32px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                  marginTop: "16px",
                }}
              >
                Write Your First Story
              </Link>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {logs.map((log, i) => (
                <div
                  key={log._id}
                  style={{
                    background: "#0d111c",
                    border: "1px solid rgba(242,237,230,0.06)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "20px",
                    alignItems: "center",
                    transition: "border-color 0.3s",
                    animation: `fadeUp 0.5s ease ${i * 0.05}s both`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(212,165,116,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(242,237,230,0.06)")
                  }
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        marginBottom: "8px",
                        color: "#f2ede6",
                      }}
                    >
                      {log.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgba(242,237,230,0.45)",
                        }}
                      >
                        📍 {log.destination}
                      </span>
                      <span style={{ fontSize: "13px" }}>
                        {"⭐".repeat(log.rating)}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgba(242,237,230,0.35)",
                        }}
                      >
                        📅 {new Date(log.date).toDateString()}
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(log.destination)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "#d4a574",
                          textDecoration: "none",
                        }}
                      >
                        🗺️ Maps
                      </a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link
                      to={`/logs/${log._id}`}
                      className="btn-ghost"
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        textDecoration: "none",
                      }}
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-log/${log._id}`}
                      style={{
                        background: "rgba(212,165,116,0.1)",
                        border: "1px solid rgba(212,165,116,0.25)",
                        color: "#d4a574",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(log._id)}
                      style={{
                        background: "rgba(220,80,80,0.08)",
                        border: "1px solid rgba(220,80,80,0.2)",
                        color: "#f08080",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
