import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useLanguage from "@/hooks/useLanguage";
import { registerUser } from "@/redux/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error(t("pleaseFillAllFields"));
      return;
    }

    if (password.length < 6) {
      toast.error(t("passwordMinLength"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    try {
      const result = await dispatch(
        registerUser({
          name,
          email,
          password,
        }),
      ).unwrap();

      toast.success(result.message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      toast.error(error.message || t("somethingWentWrong"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="mt-24 w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {t("createAccount")}
          </CardTitle>

          <CardDescription>
            {t("createAccountToContinue")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
                {t("name")}
              </label>

              <Input
                id="name"
                type="text"
                placeholder={t("enterYourName")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 pr-11 text-sm transition-all duration-200 focus-visible:ring-purple-500 sm:h-10 sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                {t("email")}
              </label>

              <Input
                id="email"
                type="email"
                placeholder={t("enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 pr-11 text-sm transition-all duration-200 focus-visible:ring-purple-500 sm:h-10 sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="relative space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                {t("password")}
              </label>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("enterYourPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pr-11 text-sm transition-all duration-200 focus-visible:ring-purple-500 sm:h-10 sm:text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 -translate-y-1/2 cursor-pointer text-purple-600 transition-colors duration-300 hover:text-purple-700"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
              >
                {t("confirmPassword")}
              </label>

              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("confirmYourPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 pr-11 text-sm transition-all duration-200 focus-visible:ring-purple-500 sm:h-10 sm:text-base"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-10 -translate-y-1/2 cursor-pointer text-purple-600 transition-colors duration-300 hover:text-purple-700"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-purple-600 text-white transition-all duration-300 hover:bg-purple-700"
            >
              {loading
                ? t("creatingAccount")
                : t("createAccount")}
            </Button>

            {/* Login */}
            <p className="text-center text-sm text-muted-foreground">
              {t("alreadyHaveAccount")}{" "}
              <Link
                to="/login"
                className="cursor-pointer font-medium text-foreground transition-all duration-300 hover:text-purple-700 hover:underline"
              >
                {t("login")}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;