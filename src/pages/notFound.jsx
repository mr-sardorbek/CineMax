import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useLanguage from "@/hooks/useLanguage";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-purple-600 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <Link to="/">
          <Button className="mt-8 cursor-pointer bg-purple-600 px-6 text-white hover:bg-purple-700">
            {t("home")}
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;