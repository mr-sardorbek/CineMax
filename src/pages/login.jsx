import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useLanguage from "@/hooks/useLanguage";
import { loginUser } from "@/redux/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("pleaseFillAllFields"));
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          email,
          password,
        }),
      ).unwrap();

      localStorage.setItem("token", result.token);

      toast.success(t("loginSuccessful"));

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      toast.error(error.message || t("somethingWentWrong"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            {t("login")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t("email")}
              </label>

              <Input
                id="email"
                type="email"
                placeholder={t("enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus-visible:ring-purple-500"
              />
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="password" className="text-sm font-medium">
                {t("password")}
              </label>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("enterYourPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus-visible:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 -translate-y-1/2 text-purple-600 transition-colors duration-300 hover:text-purple-700 cursor-pointer"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-purple-600 text-white transition-all duration-300 hover:bg-purple-700"
            >
              {loading ? t("loggingIn") : t("login")}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t("dontHaveAccount")}{" "}
              <Link
                to="/register"
                className="font-medium text-foreground transition-colors duration-300 hover:text-purple-700"
              >
                {t("register")}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
