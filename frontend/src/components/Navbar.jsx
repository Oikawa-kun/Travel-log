/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/travellog.jpeg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Explore" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "14px 48px" : "22px 48px",
          background: scrolled ? "rgba(7,9,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(242,237,230,0.06)" : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          {/* Logo Image */}
          <img
            src={logo}
            alt="TravelLog"
            style={{
              width: "38px",
              height: "38px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          {/* Brand Text */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: "700",
              color: "#f2ede6",
              letterSpacing: "-0.3px",
            }}
          >
            Travel<span style={{ color: "#d4a574" }}>Log</span>
          </span>
        </Link>

        {/* Center links */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color:
                  location.pathname === link.to
                    ? "#d4a574"
                    : "rgba(242,237,230,0.65)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "0.3px",
                transition: "color 0.3s",
                borderBottom:
                  location.pathname === link.to
                    ? "1px solid #d4a574"
                    : "1px solid transparent",
                paddingBottom: "2px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4a574")}
              onMouseLeave={(e) =>
                (e.target.style.color =
                  location.pathname === link.to
                    ? "#d4a574"
                    : "rgba(242,237,230,0.65)")
              }
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/dashboard"
                style={{
                  color:
                    location.pathname === "/dashboard"
                      ? "#d4a574"
                      : "rgba(242,237,230,0.65)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#d4a574")}
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    location.pathname === "/dashboard"
                      ? "#d4a574"
                      : "rgba(242,237,230,0.65)")
                }
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user._id}`}
                style={{
                  color: "rgba(242,237,230,0.65)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#d4a574")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(242,237,230,0.65)")
                }
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <>
              <Link
                to="/create-log"
                className="btn-primary"
                style={{
                  padding: "10px 22px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                + New Log
              </Link>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4a574, #b8845a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#07090f",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
                title="Logout"
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-ghost"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                style={{
                  padding: "10px 22px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
