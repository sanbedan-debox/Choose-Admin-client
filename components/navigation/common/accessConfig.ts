import Admin from "@/components/modules/adminManagement";
import { Emails } from "@/components/modules/campaign/email";
import { Message } from "@/components/modules/campaign/messages";
import Dashboard from "@/components/modules/dashboard";
import LaunchWaitlist from "@/components/modules/launchWaitlist";
import Reports from "@/components/modules/restaurantManagement";
import UserManagement from "@/components/modules/userManagement";

export const modules = [
  {
    name: "Dashboard",
    roles: ["admin", "master", "normal"],
    component: Dashboard,
  },
  {
    name: "Admin Management",
    roles: ["admin", "normal", "master"],
    component: Admin,
  },
  {
    name: "Restaurant Management",
    roles: ["admin", "normal", "master"],
    component: Reports,
  },
  {
    name: "Users Management",
    roles: ["admin", "normal", "master"],
    component: UserManagement,
  },
  {
    name: "Launch Waitlist",
    roles: ["admin", "master", "normal"],
    component: LaunchWaitlist,
  },

  {
    name: "Campaigns",
    roles: ["admin", "master", "normal"],
    subModules: [
      // {
      //   name: "Messages",
      //   roles: ["admin", "master", "normal"],
      //   component: Message,
      // },
      {
        name: "Emails",
        roles: ["admin", "master", "normal"],
        component: Emails,
      },
    ],
  },
];
