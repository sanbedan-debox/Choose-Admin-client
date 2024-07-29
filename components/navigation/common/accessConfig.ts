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
import React from "react";
import {
  MdOutlineSpaceDashboard,
  MdAdminPanelSettings,
  MdOutlineRocketLaunch,
  MdOutlineAnalytics,
  MdOutlineMail,
} from "react-icons/md";
import { CiUser, CiShop, CiDatabase } from "react-icons/ci";
import MasterPermissions from "@/components/modules/masters/permissions";
import MasterConfigs from "@/components/modules/masters/configs";

export const modules = [
  {
    name: "Dashboard",
    roles: ["admin", "master", "normal"],
    icon: MdOutlineSpaceDashboard,
    component: Dashboard,
  },
  {
    name: "Admin Management",
    roles: ["admin", "normal", "master"],
    icon: MdAdminPanelSettings,
    component: Admin,
  },
  {
    name: "Launch Waitlist",
    roles: ["admin", "master", "normal"],
    icon: MdOutlineRocketLaunch,
    component: LaunchWaitlist,
  },
  {
    name: "Users Management",
    roles: ["admin", "normal", "master"],
    icon: CiUser,
    component: UserManagement,
  },
  {
    name: "Restaurant Management",
    roles: ["admin", "normal", "master"],
    icon: CiShop,
    component: Reports,
  },
  {
    name: "Campaigns",
    roles: ["admin", "master", "normal"],
    icon: MdOutlineAnalytics,
    subModules: [
      {
        name: "Emails",
        roles: ["admin", "master", "normal"],
        component: Emails,
        icon: MdOutlineMail,
      },
    ],
  },
  {
    name: "Masters",
    roles: ["admin", "master", "normal"],
    icon: CiDatabase,
    subModules: [
      {
        name: "States",
        roles: ["admin", "master", "normal"],
        component: MasterStates,
        icon: CiDatabase,
      },
      {
        name: "Timezones",
        roles: ["admin", "master", "normal"],
        component: MasterTimezones,
        icon: CiDatabase,
      },
      {
        name: "Cuisines",
        roles: ["admin", "master", "normal"],
        component: MasterCuisines,
        icon: CiDatabase,
      },
      {
        name: "Permissions",
        roles: ["admin", "master", "normal"],
        component: MasterPermissions,
        icon: CiDatabase,
      },
      {
        name: "Configs",
        roles: ["admin", "master", "normal"],
        component: MasterConfigs,
        icon: CiDatabase,
      },
    ],
  },
];
