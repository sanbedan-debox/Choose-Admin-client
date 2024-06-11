import { useRouter } from "next/router";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const router = useRouter();

  // Define the sidebar items based on the user's role
  const sidebarItems = [
    { label: "Admin Manager", route: "/admin", roles: ["admin"] },
    {
      label: "Restaurant Management",
      route: "/restaurant",
      roles: ["admin", "manager"],
    },
    { label: "User Management", route: "/user", roles: ["admin", "manager"] },
    { label: "Campaign", route: "/campaign", roles: ["admin", "worker"] },
    { label: "Email", route: "/campaign/email", roles: ["admin", "worker"] },
    {
      label: "Message",
      route: "/campaign/message",
      roles: ["admin", "worker"],
    },
    { label: "Launch Waitlist", route: "/waitlist", roles: ["admin"] },
  ];

  // Filter sidebar items based on user's role
  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const isActive = (route: string) => router.pathname === route;

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen text-white">
      <div className="p-4">
        {filteredSidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            active={isActive(item.route)}
            onClick={() => router.push(item.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
