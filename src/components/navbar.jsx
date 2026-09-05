import { Link, NavLink, useNavigate } from "react-router-dom";
import { MovieLogo } from "../assets";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher, ThemeToggle } from ".";
import useLanguage from "@/hooks/useLanguage";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/authSlice";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-purple-500 transition-colors duration-200"
    : "text-white transition-colors duration-200 hover:text-purple-500";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();
  const { t } = useLanguage();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between py-0">
          <div>
            <Link to="/">
              <img
                src={MovieLogo}
                alt="Movie logo"
                className="w-32"
              />
            </Link>
          </div>

          <div className="hidden gap-6 md:flex">
            <NavLink end to="/" className={navLinkClass}>
              {t("home")}
            </NavLink>

            <NavLink to="/movies" className={navLinkClass}>
              {t("movies")}
            </NavLink>

            <NavLink to="/tv-shows" className={navLinkClass}>
              {t("tvShows")}
            </NavLink>

            <NavLink to="/trending" className={navLinkClass}>
              {t("trending")}
            </NavLink>
          </div>

          <div className="hidden gap-3 md:flex">
            <ThemeToggle />
            <LanguageSwitcher />

            <Link
              to="/search"
              className="flex items-center gap-2 text-white transition-colors duration-200 hover:text-purple-500"
            >
              <Search size={20} />
              {t("search")}
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-white transition-colors duration-200 hover:text-purple-500"
                >
                  <User size={20} />
                  {t("profile")}
                </Link>

                <Button
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-800 text-white transition-colors duration-300 hover:bg-red-900"
                >
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted"
                >
                  {t("login")}
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col gap-5 rounded-b-2xl bg-black/90 px-4 pb-6 pt-4 backdrop-blur-md md:hidden">
            <NavLink
              end
              to="/"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/movies"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t("movies")}
            </NavLink>

            <NavLink
              to="/tv-shows"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t("tvShows")}
            </NavLink>

            <NavLink
              to="/trending"
              className={navLinkClass}
              onClick={closeMenu}
            >
              {t("trending")}
            </NavLink>

            <ThemeToggle />
            <LanguageSwitcher />

            <Link
              to="/search"
              onClick={closeMenu}
              className="flex items-center gap-3 text-white transition-colors hover:text-purple-500"
            >
              <Search size={20} />
              {t("search")}
            </Link>

            {isLoggedIn ? (
              <div>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="mb-3 flex items-center gap-3 text-white transition-colors hover:text-purple-500"
                >
                  <User size={20} />
                  {t("profile")}
                </Link>

                <Button
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-800 text-white transition-colors duration-300 hover:bg-red-900"
                >
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted"
                >
                  {t("login")}
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-purple-700"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;