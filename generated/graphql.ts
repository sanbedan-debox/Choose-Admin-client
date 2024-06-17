import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type AddAdminInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  type: AdminRole;
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  email: Scalars['String']['output'];
  lastLoggedIn?: Maybe<Scalars['DateTimeISO']['output']>;
  lastLoggedOut?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  numberOfResetPassword: Scalars['Float']['output'];
  type: AdminRole;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
};

/** Types of Admin Roles */
export enum AdminRole {
  Admin = 'admin',
  Master = 'master',
  Normal = 'normal'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean']['output'];
  changeRole: Scalars['Boolean']['output'];
  deleteAdmin: Scalars['Boolean']['output'];
};


export type MutationAddAdminArgs = {
  input: AddAdminInput;
};


export type MutationChangeRoleArgs = {
  id: Scalars['String']['input'];
  role: AdminRole;
};


export type MutationDeleteAdminArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String']['output'];
  adminLogout: Scalars['Boolean']['output'];
  getAdmins: Array<Admin>;
  me: Admin;
  resetPasswordAdmin: Scalars['Boolean']['output'];
};


export type QueryAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryResetPasswordAdminArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Admin', _id: string, name: string, type: AdminRole } };

export type GetAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = { __typename?: 'Query', getAdmins: Array<{ __typename?: 'Admin', _id: string, name: string, email: string, type: AdminRole, numberOfResetPassword: number, createdAt: any, updatedAt: any }> };

export type AdminLoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: string };

export type AddAdminMutationVariables = Exact<{
  input: AddAdminInput;
}>;


export type AddAdminMutation = { __typename?: 'Mutation', addAdmin: boolean };

export type DeleteAdminMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAdminMutation = { __typename?: 'Mutation', deleteAdmin: boolean };

export type ChangeRoleMutationVariables = Exact<{
  id: Scalars['String']['input'];
  role: AdminRole;
}>;


export type ChangeRoleMutation = { __typename?: 'Mutation', changeRole: boolean };


export const MeDocument = gql`
    query Me {
  me {
    _id
    name
    type
  }
}
    `;
export const GetAdminsDocument = gql`
    query GetAdmins {
  getAdmins {
    _id
    name
    email
    type
    numberOfResetPassword
    createdAt
    updatedAt
  }
}
    `;
export const AdminLoginDocument = gql`
    query AdminLogin($email: String!, $password: String!) {
  adminLogin(email: $email, password: $password)
}
    `;
export const AddAdminDocument = gql`
    mutation AddAdmin($input: AddAdminInput!) {
  addAdmin(input: $input)
}
    `;
export const DeleteAdminDocument = gql`
    mutation DeleteAdmin($id: String!) {
  deleteAdmin(id: $id)
}
    `;
export const ChangeRoleDocument = gql`
    mutation ChangeRole($id: String!, $role: AdminRole!) {
  changeRole(id: $id, role: $role)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Me(variables?: MeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Me', 'query', variables);
    },
    GetAdmins(variables?: GetAdminsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAdminsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAdminsQuery>(GetAdminsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAdmins', 'query', variables);
    },
    AdminLogin(variables: AdminLoginQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminLoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminLoginQuery>(AdminLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminLogin', 'query', variables);
    },
    AddAdmin(variables: AddAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddAdminMutation>(AddAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddAdmin', 'mutation', variables);
    },
    DeleteAdmin(variables: DeleteAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAdminMutation>(DeleteAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAdmin', 'mutation', variables);
    },
    ChangeRole(variables: ChangeRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChangeRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeRoleMutation>(ChangeRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChangeRole', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;