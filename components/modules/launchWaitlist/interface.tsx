export interface WaitlistInterface {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// export type GetWaitListUsersQuery = { __typename?: 'Query', getWaitListUsers: Array<{ __typename?: 'WaitListUser', _id?: string | null, email: string, createdAt?: any | null, updatedAt?: any | null, name: string }> };
// export type GetAdminsQuery = { __typename?: 'Query', getAdmins: Array<{ __typename?: 'Admin', _id: string, name: string, email: string, type: AdminRole, numberOfResetPassword: number, createdAt: any, updatedAt: any }> };
