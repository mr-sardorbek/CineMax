import { MovieLogo } from "@/assets";
import useLanguage from "@/hooks/useLanguage";
import { FaGithub, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="max-w-md">
            <img src={MovieLogo} alt="Movie logo" className="w-32" />

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t("footerDescription")}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t("quickLinks")}</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/">{t("home")}</Link>
              <Link to="/movies">{t("movies")}</Link>
              <Link to="/tv-shows">{t("tvShows")}</Link>
              <Link to="/trending">{t("trending")}</Link>
            </div>
          </div>
          <div className="mt-4  gap-3">
            <h3 className="font-semibold text-foreground">{t("followUs")}</h3>

            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-purple-500 hover:bg-purple-500 hover:text-white"
              >
                <FaGithub size={22} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-purple-500 hover:bg-purple-500 hover:text-white"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="#"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-purple-500 hover:bg-purple-500 hover:text-white"
              >
                <FaTelegramPlane size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Movie Founder. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
