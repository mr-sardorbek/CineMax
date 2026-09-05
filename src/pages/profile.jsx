import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail } from "lucide-react";
import useLanguage from "@/hooks/useLanguage";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/redux/authSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-muted-foreground">
          {t("loadingProfile")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="mt-16 w-full max-w-md shadow-lg sm:mt-20">
        <CardHeader className="items-center space-y-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-3xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <CardTitle className="text-2xl font-bold sm:text-3xl">
              {t("profile")}
            </CardTitle>

            <p className="mt-2 text-sm text-muted-foreground">
              {t("profileDescription")}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors duration-300 hover:border-purple-500">
            <User className="h-5 w-5 text-purple-600" />

            <div>
              <p className="text-sm text-muted-foreground">
                {t("name")}
              </p>

              <p className="font-medium">
                {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors duration-300 hover:border-purple-500">
            <Mail className="h-5 w-5 text-purple-600" />

            <div>
              <p className="text-sm text-muted-foreground">
                {t("email")}
              </p>

              <p className="break-all font-medium">
                {user?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;