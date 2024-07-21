import Admin from "@/components/modules/adminManagement";
import { Emails } from "@/components/modules/campaign/email";
import { Message } from "@/components/modules/campaign/messages";
import Dashboard from "@/components/modules/dashboard";
import LaunchWaitlist from "@/components/modules/launchWaitlist";
import MasterCuisines from "@/components/modules/masters/Cuisines";
import MasterStates from "@/components/modules/masters/states";
import MasterTimezones from "@/components/modules/masters/timezones";
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
    name: "Launch Waitlist",
    roles: ["admin", "master", "normal"],
    component: LaunchWaitlist,
  },
  {
    name: "Users Management",
    roles: ["admin", "normal", "master"],
    component: UserManagement,
  },
  {
    name: "Restaurant Management",
    roles: ["admin", "normal", "master"],
    component: Reports,
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
  {
    name: "Masters",
    roles: ["admin", "master", "normal"],
    subModules: [
      {
        name: "States",
        roles: ["admin", "master", "normal"],
        component: MasterStates,
      },
      {
        name: "Timezones",
        roles: ["admin", "master", "normal"],
        component: MasterTimezones,
      },
      {
        name: "Cuisines",
        roles: ["admin", "master", "normal"],
        component: MasterCuisines,
      },
    ],
  },
];
