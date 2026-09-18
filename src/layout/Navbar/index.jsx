import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, MessageSquare } from "lucide-react";
import { buscarImagem } from "../../services/sercheAvatar";
import logo from '../../assets/logo/logo-icone.png'
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    async function carregarAvatar() {
      const url = await buscarImagem();
      if (url) {
        setAvatarUrl(url);
      }
    }
    carregarAvatar();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo */}
        <div className="navbar-logo">
            <img src={logo} alt="icone-logo" />
        </div>
      </div>

      {/* links nav */}
        <div className="navbar-links">
            <Link
            to="/home"
            className={`navbar-link ${isActive("/home") ? "active" : ""}`}
            >
            <Home size={18} />
            <span>Início</span>
            </Link>

            <Link
            to="/feedback"
            className={`navbar-link ${isActive("/feedback") ? "active" : ""}`}
            >
            <MessageSquare size={18} />
            <span>Feedback</span>
            </Link>
        </div>

      {/* Avatar (clicável para perfil) */}
      <button
        className="navbar-avatar"
        onClick={() => navigate("/home/seuUser")}
        title="Ir para perfil"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" />
        ) : (
          <span>U</span>
        )}
      </button>
    </nav>
  );
}