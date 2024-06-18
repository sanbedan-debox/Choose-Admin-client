export enum AdminRole {
  Admin = "admin",
  Master = "master",
  Normal = "normal",
}

export interface AdminInterface {
  _id: string;
  name: string;
  email: string;
  type: AdminRole;
  createdAt: string;
  updatedAt: string;
}

export interface RoleOption {
  value: AdminRole;
  label: string;
}
