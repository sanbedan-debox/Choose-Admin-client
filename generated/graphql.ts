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

export type AccessHistory = {
  __typename?: 'AccessHistory';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  device: DeviceInfo;
  lastLoggedIn: Scalars['DateTimeISO']['output'];
  lastLoggedOut: Scalars['DateTimeISO']['output'];
};

export type AccountPreference = {
  __typename?: 'AccountPreference';
  email: Scalars['Boolean']['output'];
  whatsApp: Scalars['Boolean']['output'];
};

export type AccountPreferenceInput = {
  email: Scalars['Boolean']['input'];
  whatsApp: Scalars['Boolean']['input'];
};

export type AddAdminInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: AdminRole;
};

export type AddEmailCampaignInput = {
  campaignName: Scalars['String']['input'];
  csvDataUrl?: InputMaybe<Scalars['String']['input']>;
  customLink?: InputMaybe<Scalars['String']['input']>;
  emailSubject: Scalars['String']['input'];
  emailTemplate: Scalars['String']['input'];
  scheduleTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  scheduleType: EmailCampaignScheduleTypes;
  target: EmailCampaignTargetTypes;
};

export type AddEmailTemplateInput = {
  content: Scalars['String']['input'];
  designJson: Scalars['String']['input'];
  html: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AddRestaurantInput = {
  address: AddressInfoInput;
  name: MasterCommonInput;
};

export type AddUserKeys = {
  __typename?: 'AddUserKeys';
  emailOtpVerifyKey: Scalars['String']['output'];
  numberOtpVerifyKey: Scalars['String']['output'];
};

export type AddWaitListUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  number: Scalars['String']['input'];
  software: SoftWareEnum;
  website: Scalars['String']['input'];
};

export type AddressInfo = {
  __typename?: 'AddressInfo';
  _id: Scalars['ID']['output'];
  addressLine1: MasterCommon;
  addressLine2?: Maybe<MasterCommon>;
  city: MasterCommon;
  coordinate?: Maybe<LocationCommon>;
  postcode: MasterCommon;
  state: MasterCommon;
};

export type AddressInfoInput = {
  addressLine1: MasterCommonInput;
  addressLine2?: InputMaybe<MasterCommonInput>;
  city: MasterCommonInput;
  coordinate?: InputMaybe<LocationCommonInput>;
  postcode: MasterCommonInput;
  state: MasterCommonInput;
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID']['output'];
  blockedBy: Admin;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  devices: Array<AccessHistory>;
  email: Scalars['String']['output'];
  lastLoggedIn?: Maybe<Scalars['DateTimeISO']['output']>;
  lastLoggedOut?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  numberOfResetPassword: Scalars['Float']['output'];
  role: AdminRole;
  status: PlantFormStatus;
  unBlockedBy: Admin;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
};

/** Types of Admin Roles */
export enum AdminRole {
  Admin = 'admin',
  Master = 'master',
  Normal = 'normal'
}

export type AvailabilityDate = {
  __typename?: 'AvailabilityDate';
  _id: Scalars['ID']['output'];
  day: Scalars['String']['output'];
  end: Scalars['DateTimeISO']['output'];
  start: Scalars['DateTimeISO']['output'];
  status?: Maybe<RestaurantStatus>;
};

export type AvailabilityDateInput = {
  day: Day;
  end: Scalars['DateTimeISO']['input'];
  start: Scalars['DateTimeISO']['input'];
  status?: InputMaybe<RestaurantStatus>;
};

/** Business type enum  */
export enum BusinessTypeEnum {
  Llc = 'LLC',
  PrivateLimited = 'PrivateLimited'
}

/** The day */
export enum Day {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday'
}

export type DeviceInfo = {
  __typename?: 'DeviceInfo';
  _id: Scalars['ID']['output'];
  deviceName: Scalars['String']['output'];
  deviceOS: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EmailBuilderTemplate = {
  __typename?: 'EmailBuilderTemplate';
  _id: Scalars['ID']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  designJson?: Maybe<Scalars['String']['output']>;
  templateFileName: Scalars['String']['output'];
  templateUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
};

export type EmailCampaignEventHistory = {
  __typename?: 'EmailCampaignEventHistory';
  date: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
};

/** This enum stores the types of schedule for email campaigns */
export enum EmailCampaignScheduleTypes {
  Later = 'later',
  Now = 'now'
}

export type EmailCampaignStats = {
  __typename?: 'EmailCampaignStats';
  mailsClicked: Array<EmailCampaignEventHistory>;
  mailsDelivered: Scalars['Float']['output'];
  mailsOpened: Array<EmailCampaignEventHistory>;
  mailsSent: Scalars['Float']['output'];
};

/** This enum stores the status of email campaign */
export enum EmailCampaignStatusEnum {
  Failed = 'failed',
  Processing = 'processing',
  Success = 'success'
}

/** This enum stores the types of target for email campaigns */
export enum EmailCampaignTargetTypes {
  Csv = 'csv'
}

export type EmailCampaignsObject = {
  __typename?: 'EmailCampaignsObject';
  _id: Scalars['ID']['output'];
  campaignName: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  csvDataUrl?: Maybe<Scalars['String']['output']>;
  emailSubject: Scalars['String']['output'];
  emailTemplate: EmailBuilderTemplate;
  logUrl?: Maybe<Scalars['String']['output']>;
  scheduleTime?: Maybe<Scalars['DateTimeISO']['output']>;
  scheduleType: EmailCampaignScheduleTypes;
  stats: EmailCampaignStats;
  status: EmailCampaignStatusEnum;
  target: EmailCampaignTargetTypes;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  usersCount: Scalars['Float']['output'];
};

export type EmailTemplatesObject = {
  __typename?: 'EmailTemplatesObject';
  _id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  designJson: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
};

export type LocationCommon = {
  __typename?: 'LocationCommon';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type LocationCommonInput = {
  coordinates: Array<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type MasterCommon = {
  __typename?: 'MasterCommon';
  _id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type MasterCommonInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  value: Scalars['String']['input'];
};

export type MasterCommonInputNumber = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  value: Scalars['Float']['input'];
};

export type MasterCommonNumber = {
  __typename?: 'MasterCommonNumber';
  _id: Scalars['ID']['output'];
  value: Scalars['Float']['output'];
};

export type Menu = {
  __typename?: 'Menu';
  _id: Scalars['ID']['output'];
  availability: Array<AvailabilityDate>;
  master: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  visibility: Visibility;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean']['output'];
  addRestaurant: Scalars['Boolean']['output'];
  addUser: AddUserKeys;
  addWaitListUser: Scalars['Boolean']['output'];
  blockAdmin: Scalars['Boolean']['output'];
  changeRole: Scalars['Boolean']['output'];
  createEmailCampaign: Scalars['Boolean']['output'];
  createEmailTemplate: Scalars['Boolean']['output'];
  deleteAdmin: Scalars['Boolean']['output'];
  deleteEmailTemplate: Scalars['Boolean']['output'];
  removeRestaurant: Scalars['Boolean']['output'];
  sendTestEmails: Scalars['Boolean']['output'];
  updateRestaurant: Scalars['Boolean']['output'];
  updateUserProfile: Scalars['Boolean']['output'];
  verifyUserDetails: Scalars['Boolean']['output'];
};


export type MutationAddAdminArgs = {
  input: AddAdminInput;
};


export type MutationAddRestaurantArgs = {
  input: AddRestaurantInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationAddWaitListUserArgs = {
  input: AddWaitListUserInput;
};


export type MutationBlockAdminArgs = {
  id: Scalars['String']['input'];
  updateStatus: PlantFormStatus;
};


export type MutationChangeRoleArgs = {
  id: Scalars['String']['input'];
  role: AdminRole;
};


export type MutationCreateEmailCampaignArgs = {
  input: AddEmailCampaignInput;
};


export type MutationCreateEmailTemplateArgs = {
  input: AddEmailTemplateInput;
};


export type MutationDeleteAdminArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEmailTemplateArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRestaurantArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendTestEmailsArgs = {
  input: TestEmailInput;
};


export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationVerifyUserDetailsArgs = {
  input: VerifyUserDetails;
};

/** Restaurant user status */
export enum PlantFormStatus {
  Active = 'active',
  Blocked = 'blocked',
  PaymentPending = 'paymentPending'
}

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String']['output'];
  adminLogout: Scalars['Boolean']['output'];
  emailOtpVerification: Scalars['Boolean']['output'];
  generateOtpForEmailVerification: Scalars['String']['output'];
  generateOtpForLogin: Scalars['String']['output'];
  generateOtpForNumberVerification: Scalars['String']['output'];
  getAdmins: Array<Admin>;
  getAllEmailCampaigns: Array<EmailCampaignsObject>;
  getAllEmailTemplates: Array<EmailTemplatesObject>;
  getAllRestaurantUsers: Array<User>;
  getAllRestaurants: Array<Restaurant>;
  getWaitListUsers: Array<WaitListUser>;
  logout: Scalars['Boolean']['output'];
  me: Admin;
  mobileNumberOtpVerification: Scalars['Boolean']['output'];
  resetPasswordAdmin: Scalars['Boolean']['output'];
  verifyOtpForLogin: Scalars['Boolean']['output'];
};


export type QueryAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryEmailOtpVerificationArgs = {
  email: Scalars['String']['input'];
  key: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};


export type QueryGenerateOtpForEmailVerificationArgs = {
  email: Scalars['String']['input'];
};


export type QueryGenerateOtpForLoginArgs = {
  input: Scalars['String']['input'];
};


export type QueryGenerateOtpForNumberVerificationArgs = {
  number: Scalars['String']['input'];
};


export type QueryMobileNumberOtpVerificationArgs = {
  key: Scalars['String']['input'];
  number: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};


export type QueryResetPasswordAdminArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryVerifyOtpForLoginArgs = {
  input: Scalars['String']['input'];
  key: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['ID']['output'];
  address: AddressInfo;
  availability: Array<AvailabilityDate>;
  brandingLogo: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  locationName?: Maybe<LocationCommon>;
  menus?: Maybe<Array<Menu>>;
  name: MasterCommon;
  socialInfo?: Maybe<SocialInfo>;
  status: RestaurantStatus;
  taxRates: TaxRate;
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type RestaurantInfo = {
  __typename?: 'RestaurantInfo';
  city?: Maybe<MasterCommon>;
  name: MasterCommon;
  status: RestaurantStatus;
};

/** Restaurant status enum. */
export enum RestaurantStatus {
  Active = 'active',
  Blocked = 'blocked',
  BlockedBySystem = 'blockedBySystem'
}

export type SocialInfo = {
  __typename?: 'SocialInfo';
  _id: Scalars['ID']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** Types of SoftWare Enum */
export enum SoftWareEnum {
  None = 'None',
  Software1 = 'Software1',
  Software2 = 'Software2',
  Software3 = 'Software3'
}

export type TaxRate = {
  __typename?: 'TaxRate';
  _id: Scalars['ID']['output'];
  applyOnAllItems: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  salesTax: MasterCommonNumber;
};

export type TaxRateInput = {
  applyOnAllItems: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  salesTax: MasterCommonInputNumber;
};

export type TestEmailInput = {
  emails: Scalars['String']['input'];
  html: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type UpdateRestaurantInput = {
  address?: InputMaybe<AddressInfoInput>;
  availability?: InputMaybe<Array<AvailabilityDateInput>>;
  restaurantId: Scalars['String']['input'];
  status?: InputMaybe<RestaurantStatus>;
  taxRate?: InputMaybe<TaxRateInput>;
};

export type UpdateUserProfileInput = {
  accountPreferences?: InputMaybe<Array<AccountPreferenceInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  restaurantIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  accessHistory: Array<AccessHistory>;
  accountPreferences?: Maybe<AccountPreference>;
  address: AddressInfo;
  businessName: Scalars['String']['output'];
  businessType: BusinessTypeEnum;
  createdAt: Scalars['DateTimeISO']['output'];
  dob: Scalars['DateTimeISO']['output'];
  ein: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employeeSize: MasterCommon;
  establishedAt: Scalars['String']['output'];
  estimatedRevenue: MasterCommon;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  restaurants?: Maybe<Array<RestaurantInfo>>;
  ssn: Scalars['String']['output'];
  status: PlantFormStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type VerifyUserDetails = {
  accountPreferences: AccountPreferenceInput;
  email: Scalars['String']['input'];
  emailOtp: Scalars['String']['input'];
  emailOtpVerifyKey: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  numberOtp: Scalars['String']['input'];
  numberOtpVerifyKey: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

/** Menu visibility enum. */
export enum Visibility {
  Delivery = 'Delivery',
  Online = 'Online',
  Pos = 'POS'
}

export type WaitListUser = {
  __typename?: 'WaitListUser';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
  software: SoftWareEnum;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  website: Scalars['String']['output'];
};

export type AddUserInput = {
  accountPreferences: AccountPreferenceInput;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Admin', _id: string, name: string, role: AdminRole } };

export type GetAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = { __typename?: 'Query', getAdmins: Array<{ __typename?: 'Admin', _id: string, name: string, email: string, role: AdminRole, numberOfResetPassword: number, createdAt: any, updatedAt: any }> };

export type AdminLoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: string };

export type GetAllRestaurantUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantUsersQuery = { __typename?: 'Query', getAllRestaurantUsers: Array<{ __typename?: 'User', _id: string, email: string, createdAt: any, updatedAt: any }> };

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: Array<{ __typename?: 'Restaurant', _id: string }> };

export type DeleteAdminMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAdminMutation = { __typename?: 'Mutation', deleteAdmin: boolean };

export type ChangeRoleMutationVariables = Exact<{
  id: Scalars['String']['input'];
  role: AdminRole;
}>;


export type ChangeRoleMutation = { __typename?: 'Mutation', changeRole: boolean };

export type BlockAdminMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateStatus: PlantFormStatus;
}>;


export type BlockAdminMutation = { __typename?: 'Mutation', blockAdmin: boolean };

export type AdminLogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminLogoutQuery = { __typename?: 'Query', adminLogout: boolean };

export type GetAllEmailTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailTemplatesQuery = { __typename?: 'Query', getAllEmailTemplates: Array<{ __typename?: 'EmailTemplatesObject', title: string, content: string, createdAt: any, updatedAt: any, designJson: string }> };

export type GetAllEmailCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailCampaignsQuery = { __typename?: 'Query', getAllEmailCampaigns: Array<{ __typename?: 'EmailCampaignsObject', campaignName: string, emailSubject: string, status: EmailCampaignStatusEnum, target: EmailCampaignTargetTypes, scheduleType: EmailCampaignScheduleTypes, usersCount: number }> };

export type GetWaitListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWaitListUsersQuery = { __typename?: 'Query', getWaitListUsers: Array<{ __typename?: 'WaitListUser', _id?: string | null, name: string, email: string, createdAt?: any | null, updatedAt?: any | null }> };


export const MeDocument = gql`
    query Me {
  me {
    _id
    name
    role
  }
}
    `;
export const GetAdminsDocument = gql`
    query GetAdmins {
  getAdmins {
    _id
    name
    email
    role
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
export const GetAllRestaurantUsersDocument = gql`
    query GetAllRestaurantUsers {
  getAllRestaurantUsers {
    _id
    email
    createdAt
    updatedAt
  }
}
    `;
export const GetAllRestaurantsDocument = gql`
    query GetAllRestaurants {
  getAllRestaurants {
    _id
  }
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
export const BlockAdminDocument = gql`
    mutation BlockAdmin($id: String!, $updateStatus: PlantFormStatus!) {
  blockAdmin(id: $id, updateStatus: $updateStatus)
}
    `;
export const AdminLogoutDocument = gql`
    query AdminLogout {
  adminLogout
}
    `;
export const GetAllEmailTemplatesDocument = gql`
    query getAllEmailTemplates {
  getAllEmailTemplates {
    title
    content
    createdAt
    updatedAt
    designJson
  }
}
    `;
export const GetAllEmailCampaignsDocument = gql`
    query getAllEmailCampaigns {
  getAllEmailCampaigns {
    campaignName
    emailSubject
    status
    target
    scheduleType
    usersCount
  }
}
    `;
export const GetWaitListUsersDocument = gql`
    query GetWaitListUsers {
  getWaitListUsers {
    _id
    name
    email
    createdAt
    updatedAt
  }
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
    GetAllRestaurantUsers(variables?: GetAllRestaurantUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllRestaurantUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllRestaurantUsersQuery>(GetAllRestaurantUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllRestaurantUsers', 'query', variables);
    },
    GetAllRestaurants(variables?: GetAllRestaurantsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllRestaurantsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllRestaurantsQuery>(GetAllRestaurantsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllRestaurants', 'query', variables);
    },
    DeleteAdmin(variables: DeleteAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAdminMutation>(DeleteAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAdmin', 'mutation', variables);
    },
    ChangeRole(variables: ChangeRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChangeRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeRoleMutation>(ChangeRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChangeRole', 'mutation', variables);
    },
    BlockAdmin(variables: BlockAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BlockAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlockAdminMutation>(BlockAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlockAdmin', 'mutation', variables);
    },
    AdminLogout(variables?: AdminLogoutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminLogoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminLogoutQuery>(AdminLogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminLogout', 'query', variables);
    },
    getAllEmailTemplates(variables?: GetAllEmailTemplatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllEmailTemplatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEmailTemplatesQuery>(GetAllEmailTemplatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllEmailTemplates', 'query', variables);
    },
    getAllEmailCampaigns(variables?: GetAllEmailCampaignsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllEmailCampaignsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEmailCampaignsQuery>(GetAllEmailCampaignsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllEmailCampaigns', 'query', variables);
    },
    GetWaitListUsers(variables?: GetWaitListUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetWaitListUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWaitListUsersQuery>(GetWaitListUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWaitListUsers', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;