// export const modules = [
//   {
//     name: "Admin",
//     roles: ["admin"],
//   },
//   {
//     name: "Dashboard",
//     roles: ["admin", "worker"],
//   },
//   {
//     name: "Reports",
//     roles: ["admin", "worker"],
//   },
//   {
//     name: "Campaigns",
//     roles: ["admin", "worker"],
//     subModules: [
//       {
//         name: "Messages",
//         roles: ["admin", "worker"],
//       },
//       {
//         name: "Emails",
//         roles: ["admin", "worker"],
//       },
//     ],
//   },
// ];

import Admin from "@/components/admin";
import Campaigns from "@/components/campaign";
import Dashboard from "@/components/dashboard";
import Emails from "@/components/emails";
import Messg from "@/components/messages";
import Reports from "@/components/reports";

export const modules = [
  {
    name: "Admin",
    roles: ["admin"],
    component: Admin,
  },
  {
    name: "Dashboard",
    roles: ["admin", "worker"],
    component: Dashboard,
  },
  {
    name: "Reports",
    roles: ["admin", "worker"],
    component: Reports,
  },
  {
    name: "Campaigns",
    roles: ["admin", "worker"],
    component: Campaigns,
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
