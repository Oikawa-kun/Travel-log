/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const NEPAL_DESTINATIONS = [
  {
    name: "Everest Base Camp",
    region: "Khumbu",
    emoji: "🏔️",
    desc: "Trek to the foot of the world",
    color: "#d4a574",
    mapQ: "Everest Base Camp Nepal",
  },
  {
    name: "Pokhara",
    region: "Gandaki",
    emoji: "🏞️",
    desc: "Lakeside adventure capital",
    color: "#7eb8d4",
    mapQ: "Pokhara Nepal",
  },
  {
    name: "Annapurna Circuit",
    region: "Gandaki",
    emoji: "⛰️",
    desc: "Epic Himalayan circuit trek",
    color: "#a574d4",
    mapQ: "Annapurna Circuit Nepal",
  },
  {
    name: "Kathmandu",
    region: "Bagmati",
    emoji: "🏛️",
    desc: "Ancient temples & culture",
    color: "#d4b474",
    mapQ: "Kathmandu Nepal",
  },
  {
    name: "Chitwan",
    region: "Terai",
    emoji: "🐘",
    desc: "Wildlife & jungle safari",
    color: "#74d4a5",
    mapQ: "Chitwan National Park Nepal",
  },
  {
    name: "Langtang",
    region: "Bagmati",
    emoji: "🌿",
    desc: "Valley of glaciers",
    color: "#74a5d4",
    mapQ: "Langtang Valley Nepal",
  },
];

const STATS = [
  { value: "240+", label: "Trek Routes" },
  { value: "8,849m", label: "World's Highest Peak" },
  { value: "10", label: "UNESCO Sites" },
  { value: "1,400+", label: "Bird Species" },
];

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeDestination, setActiveDestination] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    fetchLogs();
  }, [page]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/logs?page=${page}&limit=6`);
      setLogs(res.data.logs || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      const res = await api.get(`/search?q=${search}&tag=${tag}`);
      setLogs(res.data || []);
      setTotalPages(1);
      feedRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearch("");
    setTag("");
    setPage(1);
    fetchLogs();
  };

  const tags = [
    "adventure",
    "budget",
    "family",
    "luxury",
    "solo",
    "mountain",
    "beach",
    "culture",
  ];

  const openMaps = (query) => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(query)}`,
      "_blank",
    );
  };

  return (
    <div
      style={{ background: "#07090f", minHeight: "100vh", color: "#f2ede6" }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "120px 80px 80px",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(212,165,116,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(126,184,212,0.05) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(242,237,230,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,230,0.015) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Floating orbs */}
        {[
          {
            size: 400,
            top: "5%",
            left: "60%",
            color: "rgba(212,165,116,0.06)",
            delay: 0,
          },
          {
            size: 300,
            top: "60%",
            left: "75%",
            color: "rgba(126,184,212,0.05)",
            delay: 1.5,
          },
          {
            size: 250,
            top: "20%",
            left: "45%",
            color: "rgba(165,116,212,0.04)",
            delay: 0.8,
          },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}, transparent)`,
              top: orb.top,
              left: orb.left,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left content */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(40px)",
              transition: "all 1s ease",
            }}
          >
            <div
              className="section-label"
              style={{
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#d4a574",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              Nepal's Premier Travel Community
            </div>

            <h1
              style={{
                fontSize: "clamp(52px, 6vw, 84px)",
                fontWeight: "700",
                marginBottom: "28px",
                letterSpacing: "-2px",
              }}
            >
              <span style={{ color: "#f2ede6" }}>Every Trail</span>
              <br />
              <span style={{ color: "#f2ede6" }}>Has a </span>
              <span className="accent-text">Story</span>
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  color: "rgba(242,237,230,0.5)",
                  fontSize: "0.75em",
                }}
              >
                Worth Telling
              </span>
            </h1>

            <p
              style={{
                fontSize: "17px",
                color: "rgba(242,237,230,0.55)",
                lineHeight: "1.75",
                maxWidth: "480px",
                marginBottom: "44px",
              }}
            >
              Document your Himalayan adventures, share stunning routes, and
              connect with travelers exploring Nepal's breathtaking landscapes.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "56px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/create-log"
                className="btn-primary"
                style={{
                  padding: "16px 36px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Share Your Adventure
              </Link>
              <button
                className="btn-ghost"
                onClick={() =>
                  feedRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  padding: "16px 28px",
                  borderRadius: "12px",
                  fontSize: "15px",
                }}
              >
                Browse Stories ↓
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
              }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#d4a574",
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(242,237,230,0.45)",
                      marginTop: "4px",
                      lineHeight: "1.4",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Destination cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              opacity: heroVisible ? 1 : 0,
              transition: "all 1.2s ease 0.3s",
            }}
          >
            {NEPAL_DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                className="glass-card card-hover"
                onClick={() => openMaps(dest.mapQ)}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  cursor: "pointer",
                  animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                  {dest.emoji}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#f2ede6",
                    marginBottom: "4px",
                  }}
                >
                  {dest.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: dest.color,
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  {dest.region}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(242,237,230,0.45)",
                    lineHeight: "1.4",
                  }}
                >
                  {dest.desc}
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "11px",
                    color: "rgba(212,165,116,0.6)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  🗺️ Open in Maps
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "rgba(242,237,230,0.3)",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            animation: "float 2s ease-in-out infinite",
          }}
        >
          Scroll
          <div
            style={{
              width: "1px",
              height: "36px",
              background:
                "linear-gradient(to bottom, rgba(212,165,116,0.6), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section style={{ padding: "80px", background: "#0d111c" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>
              Interactive Map
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: "700",
                letterSpacing: "-1px",
              }}
            >
              Nepal on the <span className="accent-text">Map</span>
            </h2>
            <p
              style={{
                color: "rgba(242,237,230,0.5)",
                marginTop: "14px",
                fontSize: "16px",
              }}
            >
              Click any destination to explore on Google Maps
            </p>
          </div>

          {/* Google Maps embed */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(242,237,230,0.07)",
              marginBottom: "28px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3642070!2d84.1240!3d28.3949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="460"
              style={{
                border: 0,
                filter:
                  "invert(95%) hue-rotate(180deg) saturate(0.8) brightness(0.9)",
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nepal Map"
            />
          </div>

          {/* Quick map links */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NEPAL_DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                onClick={() => openMaps(dest.mapQ)}
                className="btn-ghost"
                style={{
                  padding: "10px 18px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {dest.emoji} {dest.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEED SECTION ── */}
      <section ref={feedRef} style={{ padding: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Search */}
          <div
            className="glass-card"
            style={{
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "48px",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              🔍 Find Travel <span className="accent-text">Stories</span>
            </h3>
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <input
                className="input-field"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination or title..."
                style={{ flex: "1", minWidth: "200px" }}
              />
              <select
                className="input-field"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                style={{ minWidth: "160px", flex: "0 0 auto" }}
              >
                <option value="">All Tags</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontSize: "14px",
                }}
              >
                Search
              </button>
              <button
                type="button"
                onClick={resetSearch}
                className="btn-ghost"
                style={{
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontSize: "14px",
                }}
              >
                Reset
              </button>
            </form>
          </div>

          {/* Feed header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "700",
                letterSpacing: "-1px",
              }}
            >
              Latest{" "}
              <span className="accent-text" style={{ fontStyle: "italic" }}>
                Stories
              </span>
            </h2>
            <Link
              to="/create-log"
              style={{
                background: "rgba(212,165,116,0.1)",
                border: "1px solid rgba(212,165,116,0.3)",
                color: "#d4a574",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              + Share Yours
            </Link>
          </div>

          {/* Logs grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "16px",
                  animation: "float 2s ease-in-out infinite",
                }}
              >
                ✈️
              </div>
              <p style={{ color: "rgba(242,237,230,0.5)" }}>
                Loading stories...
              </p>
            </div>
          ) : logs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>🗺️</div>
              <h4
                style={{
                  fontSize: "24px",
                  marginBottom: "12px",
                  color: "rgba(242,237,230,0.6)",
                }}
              >
                No stories found
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
                Be the First →
              </Link>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "24px",
                }}
              >
                {logs.map((log, i) => (
                  <article
                    key={log._id}
                    className="card-hover"
                    style={{
                      background: "#0d111c",
                      border: "1px solid rgba(242,237,230,0.06)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        height: "210px",
                        overflow: "hidden",
                      }}
                    >
                      {log.photos?.length > 0 ? (
                        <img
                          src={log.photos[0]}
                          alt={log.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.6s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.transform = "scale(1.06)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.transform = "scale(1)")
                          }
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            background:
                              "linear-gradient(135deg, #1a2030, #0d111c)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "56px",
                          }}
                        >
                          ✈️
                        </div>
                      )}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(7,9,15,0.8) 0%, transparent 50%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "14px",
                          right: "14px",
                          background: "rgba(7,9,15,0.75)",
                          backdropFilter: "blur(10px)",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          border: "1px solid rgba(242,237,230,0.1)",
                        }}
                      >
                        {"⭐".repeat(log.rating)}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "14px",
                          left: "14px",
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        {log.tags?.slice(0, 2).map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "22px" }}>
                      <h3
                        style={{
                          fontSize: "19px",
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
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "12px",
                          flexWrap: "wrap",
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
                        <span
                          style={{
                            color: "rgba(242,237,230,0.2)",
                            fontSize: "12px",
                          }}
                        >
                          ·
                        </span>
                        <button
                          onClick={() => openMaps(log.destination)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#d4a574",
                            fontSize: "12px",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Maps →
                        </button>
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "rgba(242,237,230,0.5)",
                          lineHeight: "1.65",
                          marginBottom: "18px",
                        }}
                      >
                        {log.description?.substring(0, 110)}...
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #d4a574, #b8845a)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "700",
                              color: "#07090f",
                            }}
                          >
                            {log.author?.name?.charAt(0).toUpperCase()}
                          </div>
                          <span
                            style={{
                              fontSize: "13px",
                              color: "rgba(242,237,230,0.5)",
                            }}
                          >
                            {log.author?.name}
                          </span>
                        </div>
                        <Link
                          to={`/logs/${log._id}`}
                          className="btn-primary"
                          style={{
                            padding: "8px 18px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            textDecoration: "none",
                          }}
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "48px",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="btn-ghost"
                    style={{
                      padding: "12px 22px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      opacity: page === 1 ? 0.4 : 1,
                    }}
                  >
                    ← Prev
                  </button>
                  <span
                    style={{
                      color: "rgba(242,237,230,0.5)",
                      fontSize: "14px",
                      padding: "0 16px",
                    }}
                  >
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="btn-ghost"
                    style={{
                      padding: "12px 22px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      opacity: page === totalPages ? 0.4 : 1,
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px", background: "#0d111c" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>
              Why TravelLog
            </div>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "700",
                letterSpacing: "-1px",
              }}
            >
              Built for <span className="accent-text">Explorers</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                icon: "🗺️",
                title: "Google Maps Integration",
                desc: "Every destination links directly to Google Maps. Navigate from your log to the real world instantly.",
              },
              {
                icon: "📸",
                title: "Photo Stories",
                desc: "Upload up to 5 photos per log. Show the world what you experienced through stunning visuals.",
              },
              {
                icon: "⭐",
                title: "Rate & Review",
                desc: "Leave honest star ratings and detailed reviews to help fellow Nepal travelers plan perfectly.",
              },
              {
                icon: "🔍",
                title: "Smart Search",
                desc: "Filter by destination, tags, rating, or season. Find exactly the adventure you are looking for.",
              },
              {
                icon: "👥",
                title: "Community",
                desc: "Comment on logs, follow experienced trekkers, and build connections with Nepal enthusiasts.",
              },
              {
                icon: "📊",
                title: "Personal Dashboard",
                desc: "Track all your logs, stats, and journey history in one beautiful personal dashboard.",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="glass-card card-hover"
                style={{
                  padding: "28px",
                  borderRadius: "18px",
                  animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "10px",
                    color: "#f2ede6",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(242,237,230,0.5)",
                    lineHeight: "1.65",
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "100px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(212,165,116,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div className="section-label" style={{ marginBottom: "20px" }}>
            Start Today
          </div>
          <h2
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: "700",
              letterSpacing: "-1.5px",
              marginBottom: "22px",
            }}
          >
            Your Story
            <br />
            Deserves to Be{" "}
            <span className="accent-text" style={{ fontStyle: "italic" }}>
              Told
            </span>
          </h2>
          <p
            style={{
              color: "rgba(242,237,230,0.5)",
              fontSize: "17px",
              lineHeight: "1.7",
              marginBottom: "40px",
            }}
          >
            Join thousands of Nepal travelers documenting their Himalayan
            journeys. Start sharing today — it is completely free.
          </p>
          <div
            style={{ display: "flex", gap: "14px", justifyContent: "center" }}
          >
            <Link
              to="/register"
              className="btn-primary"
              style={{
                padding: "18px 44px",
                borderRadius: "12px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Create Free Account
            </Link>
            <Link
              to="/about"
              className="btn-ghost"
              style={{
                padding: "18px 32px",
                borderRadius: "12px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "40px 80px",
          borderTop: "1px solid rgba(242,237,230,0.05)",
          background: "#07090f",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>✈️</span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Travel<span style={{ color: "#d4a574" }}>Log</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            {[
              ["/", "Explore"],
              ["/about", "About"],
              ["/register", "Join"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: "rgba(242,237,230,0.4)",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#d4a574")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(242,237,230,0.4)")
                }
              >
                {label}
              </Link>
            ))}
          </div>
          <p style={{ color: "rgba(242,237,230,0.3)", fontSize: "13px" }}>
            © 2025 TravelLog · Nepal 🏔️
          </p>
        </div>
      </footer>
    </div>
  );
}
