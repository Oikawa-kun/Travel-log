import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function LogDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [log, setLog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    Promise.all([api.get("/logs/" + id), api.get("/comments/" + id)])
      .then(([logRes, commRes]) => {
        setLog(logRes.data);
        setComments(commRes.data);
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const res = await api.post("/comments/" + id, {
        text: commentText,
      });

      setComments([res.data, ...comments]);
      setCommentText("");
    } catch {
      alert("Please login to comment");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this log?")) return;

    try {
      await api.delete("/logs/" + id);
      navigate("/");
    } catch {
      alert("Failed to delete log");
    }
  };

  const openMaps = () => {
    if (log?.destination) {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(
          log.destination + " Nepal",
        )}`,
        "_blank",
      );
    }
  };

  if (loading) {
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
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✈️</div>

          <p
            style={{
              color: "rgba(242,237,230,0.5)",
              fontFamily: "sans-serif",
            }}
          >
            Loading story...
          </p>
        </div>
      </div>
    );
  }

  if (!log) return null;

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    (log.destination || "") + " Nepal",
  )}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        color: "#f2ede6",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── HERO IMAGE ── */}
      <div
        style={{
          position: "relative",
          height: "520px",
          overflow: "hidden",
        }}
      >
        {log.photos?.length > 0 ? (
          <img
            src={log.photos[activePhoto]}
            alt={log.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "opacity 0.4s",
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              background:
                "linear-gradient(135deg, #1a2030 0%, #0d111c 50%, #07090f 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "100px" }}>✈️</span>
          </div>
        )}

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #07090f 0%, rgba(7,9,15,0.65) 45%, rgba(7,9,15,0.15) 100%)",
          }}
        />

        {/* Photo switcher dots */}
        {log.photos?.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "120px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
            }}
          >
            {log.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                style={{
                  width: i === activePhoto ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  padding: 0,
                  background:
                    i === activePhoto ? "#d4a574" : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        )}

        {/* Photo thumbnails row */}
        {log.photos?.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "80px",
              display: "flex",
              gap: "8px",
            }}
          >
            {log.photos.map((photo, i) => (
              <div
                key={i}
                onClick={() => setActivePhoto(i)}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border:
                    i === activePhoto
                      ? "2px solid #d4a574"
                      : "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
              >
                <img
                  src={photo}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "rgba(242,237,230,0.5)",
              textDecoration: "none",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "14px",
            }}
          >
            ← Back to Feed
          </Link>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(28px, 5vw, 58px)",
              fontWeight: "700",
              letterSpacing: "-1.5px",
              color: "#f2ede6",
              margin: 0,
              maxWidth: "800px",
              lineHeight: "1.1",
            }}
          >
            {log.title}
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Meta info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
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
                fontSize: "14px",
                color: "rgba(242,237,230,0.5)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              📍 {log.destination}
            </span>

            <span style={{ color: "rgba(242,237,230,0.2)" }}>·</span>

            <span
              style={{
                fontSize: "14px",
                color: "rgba(242,237,230,0.5)",
              }}
            >
              📅 {new Date(log.date).toDateString()}
            </span>

            <span style={{ color: "rgba(242,237,230,0.2)" }}>·</span>

            <span style={{ fontSize: "15px" }}>{"⭐".repeat(log.rating)}</span>

            <button
              onClick={openMaps}
              style={{
                background: "rgba(212,165,116,0.1)",
                border: "1px solid rgba(212,165,116,0.3)",
                color: "#d4a574",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontWeight: "500",
                letterSpacing: "0.3px",
                transition: "all 0.3s",
              }}
            >
              🗺️ View on Google Maps
            </button>
          </div>

          {/* Edit/Delete */}
          {user && user._id === log.author?._id && (
            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                to={`/edit-log/${log._id}`}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#f2ede6",
                  textDecoration: "none",
                  padding: "9px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                ✏️ Edit
              </Link>

              <button
                onClick={handleDelete}
                style={{
                  background: "rgba(220,80,80,0.1)",
                  border: "1px solid rgba(220,80,80,0.3)",
                  color: "#f08080",
                  padding: "9px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  fontWeight: "500",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        {log.tags?.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}
          >
            {log.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(212,165,116,0.1)",
                  border: "1px solid rgba(212,165,116,0.25)",
                  color: "#d4a574",
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "4px 14px",
                  borderRadius: "20px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Story */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(242,237,230,0.06)",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.95",
              color: "rgba(242,237,230,0.78)",
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {log.description}
          </p>
        </div>

        {/* ── GOOGLE MAP SECTION ── */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "24px",
                fontWeight: "700",
                margin: 0,
              }}
            >
              📍 Location
            </h3>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(212,165,116,0.1)",
                border: "1px solid rgba(212,165,116,0.3)",
                color: "#d4a574",
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              Open in Google Maps →
            </a>
          </div>

          {/* Map container */}
          <div
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid rgba(242,237,230,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <iframe
              title={`Map of ${log.destination}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                (log.destination || "Nepal") + " Nepal",
              )}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="340"
              style={{
                border: 0,
                display: "block",
                filter:
                  "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.9)",
              }}
              allowFullScreen
              loading="lazy"
            />

            {/* Map footer */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px",
                background: "rgba(212,165,116,0.06)",
                borderTop: "1px solid rgba(242,237,230,0.06)",
                color: "#d4a574",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              🗺️ Open{" "}
              <strong style={{ color: "#f2ede6" }}>{log.destination}</strong> in
              Google Maps →
            </a>
          </div>
        </div>

        {/* ── AUTHOR ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            padding: "24px 28px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(242,237,230,0.06)",
            borderRadius: "16px",
            marginBottom: "52px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4a574, #b8845a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "700",
              color: "#07090f",
              flexShrink: 0,
            }}
          >
            {log.author?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <Link
              to={`/profile/${log.author?._id}`}
              style={{
                fontWeight: "600",
                color: "#f2ede6",
                textDecoration: "none",
                fontSize: "17px",
              }}
            >
              {log.author?.name}
            </Link>

            <p
              style={{
                color: "rgba(242,237,230,0.4)",
                fontSize: "13px",
                margin: "3px 0 0",
              }}
            >
              Travel Author
            </p>
          </div>
        </div>

        {/* ── COMMENTS ── */}
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "28px",
            }}
          >
            💬 Comments ({comments.length})
          </h3>

          {/* Comment form */}
          {user ? (
            <form onSubmit={handleComment} style={{ marginBottom: "36px" }}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(242,237,230,0.08)",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  color: "#f2ede6",
                  fontSize: "15px",
                  resize: "vertical",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #d4a574, #b8845a)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 30px",
                  color: "#07090f",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Post Comment
              </button>
            </form>
          ) : (
            <div
              style={{
                background: "rgba(212,165,116,0.05)",
                border: "1px solid rgba(212,165,116,0.15)",
                borderRadius: "14px",
                padding: "24px",
                marginBottom: "28px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "rgba(242,237,230,0.5)",
                  fontSize: "15px",
                  margin: 0,
                }}
              >
                <Link
                  to="/login"
                  style={{
                    color: "#d4a574",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Sign in
                </Link>{" "}
                to join the conversation
              </p>
            </div>
          )}

          {/* Comments list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {comments.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 0",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "12px",
                  }}
                >
                  💬
                </div>

                <p
                  style={{
                    color: "rgba(242,237,230,0.3)",
                    fontStyle: "italic",
                    fontSize: "15px",
                  }}
                >
                  No comments yet.
                </p>
              </div>
            ) : (
              comments.map((c) => (
                <div
                  key={c._id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "20px 22px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(242,237,230,0.05)",
                    borderRadius: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7eb8d4, #a574d4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#07090f",
                      flexShrink: 0,
                    }}
                  >
                    {c.author?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {c.author?.name}
                      </span>

                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(242,237,230,0.3)",
                        }}
                      >
                        {new Date(c.createdAt).toDateString()}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "rgba(242,237,230,0.65)",
                        fontSize: "14px",
                        lineHeight: "1.7",
                        margin: 0,
                      }}
                    >
                      {c.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
