/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateLog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    destination: "",
    date: "",
    description: "",
    rating: 3,
    tags: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const openMaps = () => {
    if (form.destination) {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(form.destination + " Nepal")}`,
        "_blank",
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("destination", form.destination);
      data.append("date", form.date);
      data.append("description", form.description);
      data.append("rating", form.rating);
      data.append("tags", form.tags);
      images.forEach((img) => data.append("photos", img));

      const res = await api.post("/logs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/logs/" + res.data._id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create log");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(242,237,230,0.08)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#f2ede6",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        padding: "110px 80px 60px",
        color: "#f2ede6",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px", animation: "fadeUp 0.6s ease" }}>
          <div className="section-label" style={{ marginBottom: "14px" }}>
            New Entry
          </div>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "700",
              letterSpacing: "-1.5px",
              marginBottom: "10px",
            }}
          >
            Share Your{" "}
            <span className="accent-text" style={{ fontStyle: "italic" }}>
              Story
            </span>
          </h1>
          <p style={{ color: "rgba(242,237,230,0.45)", fontSize: "16px" }}>
            Document your Nepal adventure for the community
          </p>
        </div>

        <div style={{ animation: "fadeUp 0.7s ease 0.1s both" }}>
          {error && (
            <div
              style={{
                background: "rgba(220,80,80,0.1)",
                border: "1px solid rgba(220,80,80,0.25)",
                color: "#f08080",
                padding: "14px 18px",
                borderRadius: "12px",
                fontSize: "14px",
                marginBottom: "28px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(242,237,230,0.6)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                TRIP TITLE
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="My Trek to Everest Base Camp"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(242,237,230,0.08)")
                }
              />
            </div>

            {/* Destination + Map */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(242,237,230,0.6)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                DESTINATION
              </label>
              <div style={{ position: "relative" }}>
                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Everest Base Camp, Khumbu"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(242,237,230,0.08)")
                  }
                />
                {form.destination && (
                  <button
                    type="button"
                    onClick={openMaps}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(212,165,116,0.15)",
                      border: "1px solid rgba(212,165,116,0.3)",
                      color: "#d4a574",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    🗺️ View on Maps
                  </button>
                )}
              </div>
            </div>

            {/* Date + Rating row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "22px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    color: "rgba(242,237,230,0.6)",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  DATE OF TRAVEL
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(242,237,230,0.08)")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "rgba(242,237,230,0.6)",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  RATING: {"⭐".repeat(parseInt(form.rating))} ({form.rating}/5)
                </label>
                <div
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                  }}
                >
                  <input
                    type="range"
                    name="rating"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={handleChange}
                    style={{ flex: 1, accentColor: "#d4a574" }}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(242,237,230,0.6)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                YOUR STORY
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell us everything — the sights, sounds, challenges, and moments that made this trip unforgettable..."
                required
                rows={9}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  lineHeight: "1.65",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(242,237,230,0.08)")
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "6px",
                }}
              >
                <span
                  style={{ fontSize: "12px", color: "rgba(242,237,230,0.3)" }}
                >
                  {form.description.length} chars
                </span>
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(242,237,230,0.6)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                TAGS
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="adventure, trek, himalaya, budget (comma separated)"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(242,237,230,0.08)")
                }
              />
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {[
                  "adventure",
                  "budget",
                  "family",
                  "luxury",
                  "solo",
                  "mountain",
                  "culture",
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        tags: f.tags ? f.tags + ", " + t : t,
                      }))
                    }
                    className="tag"
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "1px solid rgba(212,165,116,0.25)",
                    }}
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Image upload */}
            <div style={{ marginBottom: "36px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(242,237,230,0.6)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                PHOTOS (up to 5)
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  border: "2px dashed rgba(212,165,116,0.25)",
                  borderRadius: "14px",
                  padding: "32px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                  background: "rgba(212,165,116,0.03)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(212,165,116,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(212,165,116,0.25)")
                }
              >
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>📸</div>
                <p style={{ color: "rgba(242,237,230,0.5)", fontSize: "14px" }}>
                  Click to upload photos from your trip
                </p>
                <p
                  style={{
                    color: "rgba(242,237,230,0.3)",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  JPG, PNG, WebP · Max 5MB each
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImages}
                />
              </div>

              {imagePreviews.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "10px",
                    marginTop: "14px",
                  }}
                >
                  {imagePreviews.map((src, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        aspectRatio: "1",
                        border: "1px solid rgba(212,165,116,0.2)",
                      }}
                    >
                      <img
                        src={src}
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
            </div>

            {/* Submit */}
            <div style={{ display: "flex", gap: "14px" }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: "18px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Publishing..." : "Publish Story →"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-ghost"
                style={{
                  padding: "18px 28px",
                  borderRadius: "12px",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
