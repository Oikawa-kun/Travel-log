import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/users/" + userId), api.get("/logs/user/" + userId)])
      .then(([p, l]) => {
        setProfile(p.data);
        setLogs(l.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#07090f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#f2ede6" }}>
          <div
            style={{
              fontSize: "48px",
              animation: "float 2s ease-in-out infinite",
              marginBottom: "16px",
            }}
          >
            ✈️
          </div>
          <p style={{ color: "rgba(242,237,230,0.5)" }}>Loading profile...</p>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        color: "#f2ede6",
        padding: "110px 80px 60px",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Profile Hero */}
        <div
          style={{
            background: "linear-gradient(135deg, #0d111c, #121826)",
            border: "1px solid rgba(212,165,116,0.15)",
            borderRadius: "24px",
            padding: "52px",
            marginBottom: "48px",
            textAlign: "center",
            animation: "fadeUp 0.6s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,165,116,0.08), transparent)",
            }}
          />

          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4a574, #b8845a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "700",
              color: "#07090f",
              fontFamily: "'Cormorant Garamond', serif",
              margin: "0 auto 20px",
              boxShadow: "0 0 40px rgba(212,165,116,0.3)",
            }}
          >
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              marginBottom: "6px",
            }}
          >
            {profile?.name}
          </h1>
          <p
            style={{
              color: "rgba(242,237,230,0.45)",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {profile?.email}
          </p>
          {profile?.bio && (
            <p
              style={{
                color: "rgba(242,237,230,0.55)",
                maxWidth: "400px",
                margin: "0 auto 28px",
                lineHeight: "1.65",
                fontSize: "15px",
              }}
            >
              {profile.bio}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "56px",
              marginTop: "24px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#d4a574",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {logs.length}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(242,237,230,0.45)",
                  marginTop: "4px",
                }}
              >
                Logs Shared
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#7eb8d4",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {logs.reduce((a, l) => a + (l.rating || 0), 0)}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(242,237,230,0.45)",
                  marginTop: "4px",
                }}
              >
                Total Stars
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#a574d4",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {[...new Set(logs.map((l) => l.destination))].length}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(242,237,230,0.45)",
                  marginTop: "4px",
                }}
              >
                Destinations
              </div>
            </div>
          </div>
        </div>

        {/* Logs */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "28px",
          }}
        >
          Travel{" "}
          <span className="accent-text" style={{ fontStyle: "italic" }}>
            Stories
          </span>
        </h2>

        {logs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "rgba(242,237,230,0.4)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
            No travel logs yet!
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {logs.map((log, i) => (
              <div
                key={log._id}
                className="card-hover"
                style={{
                  background: "#0d111c",
                  border: "1px solid rgba(242,237,230,0.06)",
                  borderRadius: "18px",
                  overflow: "hidden",
                  animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
                }}
              >
                {log.photos?.[0] ? (
                  <img
                    src={log.photos[0]}
                    alt={log.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "160px",
                      background: "linear-gradient(135deg, #1a2030, #0d111c)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                    }}
                  >
                    ✈️
                  </div>
                )}
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      marginBottom: "8px",
                    }}
                  >
                    {log.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(242,237,230,0.45)",
                      marginBottom: "16px",
                    }}
                  >
                    📍 {log.destination}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "13px" }}>
                      {"⭐".repeat(log.rating)}
                    </span>
                    <Link
                      to={`/logs/${log._id}`}
                      className="btn-primary"
                      style={{
                        padding: "7px 16px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
