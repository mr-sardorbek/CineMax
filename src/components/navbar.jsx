import { Link, NavLink } from "react-router-dom";
import { MovieLogo } from "../assets";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher, ThemeToggle } from ".";
import useLanguage from "@/hooks/useLanguage";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-purple-500 transition-colors duration-200"
    : "text-foreground transition-colors duration-200 hover:text-purple-500";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 const languageData = useLanguage();


const { t } = languageData;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent  backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between py-0">
          <div>
            <Link to="/">
              <img src={MovieLogo} alt="Movie logo" className="w-32" />
            </Link>
          </div>
          <div className="hidden md:flex gap-6">
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
          <div className="hidden  md:flex gap-3">
            <ThemeToggle/>
            <LanguageSwitcher/>
            <Link
              to={`/search`}
              className="flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <Search size={20} /> {t("search")}
            </Link>
            <Link
              to={`/profile`}
              className="flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <User size={20} /> {t("profile")}
            </Link>
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
            <NavLink end to="/" className={navLinkClass} onClick={closeMenu}>
              {t("home")}
            </NavLink>
            <NavLink to="/movies" className={navLinkClass} onClick={closeMenu}>
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

            <ThemeToggle/>
            <LanguageSwitcher />
            <Link
              to="/search"
              onClick={closeMenu}
              className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
            >
              <Search size={20} />
             {t("search")}
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
            >
              <User size={20} />
              {t("profile")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
