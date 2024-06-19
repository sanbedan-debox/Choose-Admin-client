import { AdminRole } from "@/generated/graphql";

export interface AdminInterface {
  _id: string;
  name: string;
  email: string;
  type: AdminRole;
  createdAt: string;
  updatedAt: string;
}
export interface AddAdminFormInputs {
  name: string;
  email: string;
  password: string;
  role: RoleOption | null;
}

export interface RoleOption {
  value: AdminRole;
  label: string;
}

export const roleOptions: RoleOption[] = [
  { value: AdminRole.Admin, label: "Admin" },
  { value: AdminRole.Master, label: "Master" },
  { value: AdminRole.Normal, label: "Normal" },
];

export interface ChangePasswordInputs {
  newPassword: string;
}

export interface ChangeRoleInputs {
  role: RoleOption | null;
}
