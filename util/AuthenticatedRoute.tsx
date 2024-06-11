// AuthenticatedRoute.tsx
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { getUserRole } from "@/util/auth";
import routeConfig, { RouteConfig } from "@/routes/routeConfig";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const router = useRouter();
  const userRole = getUserRole();

  useEffect(() => {
    const { pathname } = router;

    const route = routeConfig.find(
      (route: RouteConfig) => route.path === pathname
    );

    if (!route || !route.roles.includes(userRole)) {
      router.push("/404");
    }
  }, [userRole]);

  return <>{children}</>;
};

export default AuthenticatedRoute;
