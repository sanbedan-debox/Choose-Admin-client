// routeConfig.ts
export interface RouteConfig {
  path: string;
  roles: string[];
}

const routeConfig: RouteConfig[] = [
  { path: "/admin", roles: ["admin"] },
  { path: "/restaurant", roles: ["admin", "manager"] },
  { path: "/user", roles: ["admin", "manager"] },
  { path: "/campaign", roles: ["admin", "worker"] },
  { path: "/campaign/email", roles: ["admin", "worker"] },
  { path: "/campaign/message", roles: ["admin", "worker"] },
  { path: "/waitlist", roles: ["admin"] },
];

export default routeConfig;
