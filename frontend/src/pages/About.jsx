import { Link } from "react-router-dom";
import { useState } from "react";
import aryanImg from "../assets/aryan.jpg";

export default function About() {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090f",
        color: "#f2ede6",
        padding: "120px 80px 80px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div className="section-label" style={{ marginBottom: "18px" }}>
            About Us
          </div>

          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: "700",
              letterSpacing: "-2px",
              marginBottom: "22px",
            }}
          >
            The Story Behind <br />
            <span className="accent-text" style={{ fontStyle: "italic" }}>
              TravelLog
            </span>
          </h1>

          <p
            style={{
              color: "rgba(242,237,230,0.5)",
              fontSize: "18px",
              lineHeight: "1.75",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Born from a passion for Nepal&apos;s majestic Himalayas and the
            belief that every journey deserves to be remembered and shared.
          </p>
        </div>

        {/* Mission */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            marginBottom: "80px",
          }}
        >
          <div
            className="glass-card"
            style={{ padding: "40px", borderRadius: "20px" }}
          >
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>🏔️</div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                color: "rgba(242,237,230,0.5)",
                lineHeight: "1.75",
                fontSize: "15px",
              }}
            >
              To create Nepal&apos;s most comprehensive travel community where
              adventurers can document, share, and discover amazing places.
            </p>
          </div>

          <div
            className="glass-card"
            style={{ padding: "40px", borderRadius: "20px" }}
          >
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>🌍</div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              Our Vision
            </h2>
            <p
              style={{
                color: "rgba(242,237,230,0.5)",
                lineHeight: "1.75",
                fontSize: "15px",
              }}
            >
              A world where every adventure is shared and remembered across
              cultures and countries.
            </p>
          </div>
        </div>

        {/* Creator */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="section-label" style={{ marginBottom: "14px" }}>
              The Creator
            </div>

            <h2 style={{ fontSize: "40px", fontWeight: "700" }}>
              Meet the{" "}
              <span className="accent-text" style={{ fontStyle: "italic" }}>
                Developer
              </span>
            </h2>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #0d111c, #121826)",
              border: "1px solid rgba(212,165,116,0.2)",
              borderRadius: "24px",
              padding: "52px",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <div style={{ textAlign: "center" }}>
              <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 16px",
                  border: "4px solid rgba(212,165,116,0.5)",
                  boxShadow: "0 0 40px rgba(212,165,116,0.3)",
                  transform: hover ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <img
                  src={aryanImg}
                  alt="Aryan Subedi"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  marginTop: "12px",
                }}
              >
                <span className="tag">Developer</span>
                <span className="tag">Nepal</span>
              </div>
            </div>

            {/* Info */}
            <div>
              <h3
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  marginBottom: "6px",
                }}
              >
                Aryan Subedi
              </h3>

              <p
                style={{
                  color: "#d4a574",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                Full Stack Developer · MERN Stack
              </p>

              <p
                style={{
                  color: "rgba(242,237,230,0.55)",
                  lineHeight: "1.75",
                  marginBottom: "32px",
                }}
              >
                Passionate developer building TravelLog to connect travelers and
                share Nepal’s beauty with the world.
              </p>

              {/* Contact - FIXED PROFESSIONAL STYLE */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Phone */}
                <a
                  href="tel:+9779861475045"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    textDecoration: "none",
                    padding: "16px",
                    borderRadius: "14px",
                    background: "rgba(212,165,116,0.06)",
                    border: "1px solid rgba(212,165,116,0.15)",
                    color: "#f2ede6",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "rgba(212,165,116,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(212,165,116,0.06)";
                  }}
                >
                  📞 <span>+977 98614-75045</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:sharmaaryan2061@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    textDecoration: "none",
                    padding: "16px",
                    borderRadius: "14px",
                    background: "rgba(212,165,116,0.06)",
                    border: "1px solid rgba(212,165,116,0.15)",
                    color: "#f2ede6",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "rgba(212,165,116,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(212,165,116,0.06)";
                  }}
                >
                  ✉️ <span>sharmaaryan2061@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "64px" }}>
          <Link to="/register" className="btn-primary">
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
