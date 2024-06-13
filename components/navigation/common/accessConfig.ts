import Admin from "@/components/modules/adminManagement/admin";
import Emails from "@/components/modules/campaign/email/emails";
import Messg from "@/components/modules/campaign/messages/messages";
import Dashboard from "@/components/modules/dashboard";
import LaunchWaitlist from "@/components/modules/launchWaitlist";
import Reports from "@/components/modules/restaurantManagement";
import UserManagement from "@/components/modules/userManagement";

export const modules = [
  {
    name: "Dashboard",
    roles: ["admin", "worker"],
    component: Dashboard,
  },
  {
    name: "Admin Management",
    roles: ["admin"],
    component: Admin,
  },

  {
    name: "Restaurant Management",
    roles: ["admin", "worker"],
    component: Reports,
  },
  {
    name: "Users Management",
    roles: ["admin", "worker"],
    component: UserManagement,
  },
  {
    name: "Launch Waitlist",
    roles: ["admin", "worker"],
    component: LaunchWaitlist,
  },

  {
    name: "Campaigns",
    roles: ["admin", "worker"],
    subModules: [
      {
        name: "Messages",
        roles: ["admin", "worker"],
        component: Messg,
      },
      {
        name: "Emails",
        roles: ["admin", "worker"],
        component: Emails,
      },
    ],
  },
];
