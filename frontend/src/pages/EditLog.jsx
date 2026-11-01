import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditLog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    destination: "",
    date: "",
    description: "",
    rating: 3,
    tags: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/logs/" + id).then((res) => {
      const l = res.data;
      setForm({
        title: l.title,
        destination: l.destination,
        date: l.date?.substring(0, 10),
        description: l.description,
        rating: l.rating,
        tags: l.tags?.join(", ") || "",
      });
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.put("/logs/" + id, form);
      navigate("/logs/" + id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
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
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          animation: "fadeUp 0.6s ease",
        }}
      >
        <div className="section-label" style={{ marginBottom: "14px" }}>
          Edit Entry
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            letterSpacing: "-1px",
            marginBottom: "10px",
          }}
        >
          Update{" "}
          <span className="accent-text" style={{ fontStyle: "italic" }}>
            Story
          </span>
        </h1>
        <p style={{ color: "rgba(242,237,230,0.45)", marginBottom: "40px" }}>
          Make changes to your travel log
        </p>

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
              label: "TITLE",
              name: "title",
              type: "text",
              placeholder: "Trip title",
            },
            {
              label: "DESTINATION",
              name: "destination",
              type: "text",
              placeholder: "Where did you go?",
            },
            { label: "DATE", name: "date", type: "date", placeholder: "" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(242,237,230,0.55)",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  letterSpacing: "1px",
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={{
                  ...inputStyle,
                  colorScheme: field.type === "date" ? "dark" : "normal",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(242,237,230,0.08)")
                }
              />
            </div>
          ))}

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(242,237,230,0.55)",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "1px",
              }}
            >
              YOUR STORY
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={8}
              style={{ ...inputStyle, resize: "vertical", lineHeight: "1.65" }}
              onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(242,237,230,0.08)")
              }
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(242,237,230,0.55)",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "1px",
              }}
            >
              RATING: {"⭐".repeat(parseInt(form.rating))} ({form.rating}/5)
            </label>
            <input
              type="range"
              name="rating"
              min="1"
              max="5"
              value={form.rating}
              onChange={handleChange}
              style={{ width: "100%", accentColor: "#d4a574" }}
            />
          </div>

          <div style={{ marginBottom: "36px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(242,237,230,0.55)",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "1px",
              }}
            >
              TAGS
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="adventure, trek, himalaya"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#d4a574")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(242,237,230,0.08)")
              }
            />
          </div>

          <div style={{ display: "flex", gap: "14px" }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                flex: 1,
                padding: "17px",
                borderRadius: "12px",
                fontSize: "16px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : "Save Changes →"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/logs/" + id)}
              className="btn-ghost"
              style={{
                padding: "17px 28px",
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
  );
}
