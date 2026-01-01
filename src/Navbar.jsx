import { Link, useLocation, useNavigate } from "react-router-dom";
import Token from "./token";
import { withApi } from "./apiConfig";
import "./CSS/Navbar.css";

export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const user = Token.getUser();
    const isLoggedIn = Boolean(Token.getToken());

    const isActive = (path) => {
      if (path === "/") return location.pathname === "/";
      return location.pathname.startsWith(path);
    };

    const handleLogout = async () => {
      try {
        await fetch(withApi('/api/users/logout'), {
          method: 'POST',
          credentials: 'include',
        });
      } catch (err) {
        console.error('Logout failed', err);
      } finally {
        Token.clear();
        navigate('/signin');
      }
    };

    return (
        <>
        <header className="navbar" role="banner">
          <div className="navbar-inner">
            <Link to="/" className="logo" aria-label="Edugram home">
              <span>Edugram</span>
            </Link>
            <nav className="nav-links" aria-label="Primary">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
              {!isLoggedIn && (
                <>
                  <Link to="/signin" className={`nav-link ${isActive('/signin') ? 'active' : ''}`}>Sign in</Link>
                  <Link to="/signup" className={`nav-link ${isActive('/signup') ? 'active' : ''}`}>Sign up</Link>
                </>
              )}
              {isLoggedIn && (
                <div className="nav-actions">
                  <span className="nav-user" aria-label="Current user">
                    {user?.name ? `Hi, ${user.name}` : 'Hi'}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="nav-button"
                  >
                    Log out
                  </button>
                </div>
              )}
            </nav>
          </div>
        </header>

        </>
    )
}