import Admin from "@/components/modules/admin/admin";
import Campaigns from "@/components/modules/campaign/campaign";
import Emails from "@/components/modules/campaign/emails";
import Messg from "@/components/modules/campaign/messages";
import Dashboard from "@/components/modules/dashboard/dashboard";
import Reports from "@/components/modules/restaurant/reports";

export const modules = [
  {
    name: "Dashboard",
    roles: ["admin", "worker"],
    component: Dashboard,
  },
  {
    name: "Admin",
    roles: ["admin"],
    component: Admin,
  },

  {
    name: "Reports",
    roles: ["admin", "worker"],
    component: Reports,
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
