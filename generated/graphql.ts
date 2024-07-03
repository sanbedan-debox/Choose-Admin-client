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

export type AddMenuInput = {
  name: MasterCommonInput;
  status: StatusEnum;
  taxes?: InputMaybe<TaxRateInput>;
  type: MenuStatusEnum;
};

export type AddRestaurantInput = {
  address: AddressInfoInput;
  name: MasterCommonInput;
};

export type AddUserInput = {
  accountPreferences: AccountPreferenceInput;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
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
  accessHistory: Array<AccessHistory>;
  blockedBy: Admin;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  email: Scalars['String']['output'];
  lastLoggedIn?: Maybe<Scalars['DateTimeISO']['output']>;
  lastLoggedOut?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  numberOfResetPassword: Scalars['Float']['output'];
  role: AdminRole;
  status: PlatformStatus;
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

export type Availability = {
  __typename?: 'Availability';
  _id: Scalars['ID']['output'];
  active: Scalars['Boolean']['output'];
  day: Scalars['String']['output'];
  end: Scalars['DateTimeISO']['output'];
  start: Scalars['DateTimeISO']['output'];
};

export type AvailabilityInput = {
  active: Scalars['Boolean']['input'];
  day: Day;
  end: Scalars['DateTimeISO']['input'];
  start: Scalars['DateTimeISO']['input'];
};

/** Business type enum  */
export enum BusinessTypeEnum {
  Llc = 'LLC',
  PrivateLimited = 'PrivateLimited'
}

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  availability?: Maybe<Array<Availability>>;
  createdAt: Scalars['DateTimeISO']['output'];
  desc: MasterCommon;
  items?: Maybe<Array<Item>>;
  name: MasterCommon;
  restaurantId: Restaurant;
  status: StatusEnum;
  upSellCategories?: Maybe<Array<Category>>;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  visibility?: Maybe<Array<Visibility>>;
};

export type CategoryInfo = {
  __typename?: 'CategoryInfo';
  _id: Category;
  name?: Maybe<MasterCommon>;
};

/** ConnectionStatusEnum enum type  */
export enum ConnectionStatusEnum {
  Connected = 'Connected',
  Error = 'Error',
  Expired = 'Expired',
  NotConnected = 'NotConnected'
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

export type Integration = {
  __typename?: 'Integration';
  _id: Scalars['ID']['output'];
  connectionStatus: ConnectionStatusEnum;
  createdAt: Scalars['DateTimeISO']['output'];
  credentials: IntegrationCredentials;
  platform: IntegrationPlatformEnum;
  status: StatusEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type IntegrationCredentials = {
  __typename?: 'IntegrationCredentials';
  _id: Scalars['ID']['output'];
  accessToke: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  storeId: Scalars['String']['output'];
};

/** Integration enum type  */
export enum IntegrationPlatformEnum {
  Clover = 'Clover',
  DoorDash = 'DoorDash',
  GrubHub = 'GrubHub',
  UberEats = 'UberEats'
}

export type Item = {
  __typename?: 'Item';
  _id: Scalars['ID']['output'];
  applySalesTax: Scalars['Boolean']['output'];
  availability?: Maybe<Array<Availability>>;
  createdAt: Scalars['DateTimeISO']['output'];
  desc: MasterCommon;
  image: MasterCommon;
  modifierGroup?: Maybe<Array<ModifierGroup>>;
  name: MasterCommon;
  popularItem: Scalars['Boolean']['output'];
  price: MasterCommonNumber;
  upSellItem: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  visibility?: Maybe<Array<Visibility>>;
};

export type LocationCommon = {
  __typename?: 'LocationCommon';
  coordinates: Array<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LocationCommonInput = {
  coordinates: Array<Scalars['Float']['input']>;
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
  availability?: Maybe<Array<Availability>>;
  categories: Array<CategoryInfo>;
  createdAt: Scalars['DateTimeISO']['output'];
  name: MasterCommon;
  status: StatusEnum;
  taxes: TaxRate;
  type: MenuStatusEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  visibility?: Maybe<Array<Visibility>>;
};

export type MenuInfo = {
  __typename?: 'MenuInfo';
  _id: Menu;
  name?: Maybe<MasterCommon>;
};

/** Menu status enum */
export enum MenuStatusEnum {
  Catering = 'Catering',
  DineIn = 'DineIn',
  OnlineOrdering = 'OnlineOrdering'
}

export type Modifier = {
  __typename?: 'Modifier';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  name: MasterCommon;
  price: MasterCommonNumber;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ModifierGroup = {
  __typename?: 'ModifierGroup';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  maxSelections: MasterCommonNumber;
  modifiers?: Maybe<Array<Modifier>>;
  name: MasterCommon;
  optional: Scalars['Boolean']['output'];
  pricingType: PriceTypeEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean']['output'];
  addCategory: Scalars['Boolean']['output'];
  addMenu: Scalars['Boolean']['output'];
  addRestaurant: Scalars['String']['output'];
  addUser: Scalars['String']['output'];
  addWaitListUser: Scalars['Boolean']['output'];
  blockAdmin: Scalars['Boolean']['output'];
  changeRole: Scalars['Boolean']['output'];
  changeUserStatus: Scalars['Boolean']['output'];
  createEmailCampaign: Scalars['Boolean']['output'];
  createEmailTemplate: Scalars['Boolean']['output'];
  deleteAdmin: Scalars['Boolean']['output'];
  deleteEmailTemplate: Scalars['Boolean']['output'];
  deleteMenu: Scalars['Boolean']['output'];
  removeRestaurant: Scalars['Boolean']['output'];
  sendTestEmails: Scalars['Boolean']['output'];
  updateCategory: Scalars['Boolean']['output'];
  updateMenu: Scalars['Boolean']['output'];
  updateRestaurant: Scalars['Boolean']['output'];
  updateUserOnboarding: Scalars['Boolean']['output'];
  updateUserProfile: Scalars['Boolean']['output'];
  verifyUserDetails: Scalars['String']['output'];
};


export type MutationAddAdminArgs = {
  input: AddAdminInput;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
  menuId: Scalars['String']['input'];
  restaurantId: Scalars['String']['input'];
};


export type MutationAddMenuArgs = {
  input: AddMenuInput;
  restaurantId: Scalars['String']['input'];
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
  updateStatus: PlatformStatus;
};


export type MutationChangeRoleArgs = {
  id: Scalars['String']['input'];
  role: AdminRole;
};


export type MutationChangeUserStatusArgs = {
  id: Scalars['String']['input'];
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


export type MutationDeleteMenuArgs = {
  menuId: Scalars['String']['input'];
};


export type MutationRemoveRestaurantArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendTestEmailsArgs = {
  input: TestEmailInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateMenuArgs = {
  input: UpdateMenuInput;
  menuId: Scalars['String']['input'];
};


export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};


export type MutationUpdateUserOnboardingArgs = {
  input: UpdateUserOnboardingInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationVerifyUserDetailsArgs = {
  input: VerifyUserDetails;
};

/** Restaurant user status */
export enum PlatformStatus {
  Active = 'active',
  Blocked = 'blocked',
  InternalVerificationPending = 'internalVerificationPending',
  OnboardingPending = 'onboardingPending',
  PaymentPending = 'paymentPending'
}

/** Price type enum  */
export enum PriceTypeEnum {
  FreeOfCharge = 'FreeOfCharge',
  IndividualPrice = 'IndividualPrice',
  SamePrice = 'SamePrice'
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
  getUserRestaurant: Restaurant;
  getUserRestaurants: Array<Restaurant>;
  getWaitListUsers: Array<WaitListUser>;
  logout: Scalars['Boolean']['output'];
  me: Admin;
  meUser: User;
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


export type QueryGetUserRestaurantArgs = {
  id: Scalars['String']['input'];
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
  availability: Array<Availability>;
  brandingLogo: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  integrations?: Maybe<Array<Integration>>;
  locationName?: Maybe<MasterCommon>;
  menus: Array<MenuInfo>;
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
  _id: Scalars['ID']['output'];
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

export type SocialInfoInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Types of SoftWare Enum */
export enum SoftWareEnum {
  None = 'None',
  Software1 = 'Software1',
  Software2 = 'Software2',
  Software3 = 'Software3'
}

/** Status enum  */
export enum StatusEnum {
  Active = 'active',
  Inactive = 'inactive'
}

export type TaxRate = {
  __typename?: 'TaxRate';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  default: Scalars['Boolean']['output'];
  name: MasterCommon;
  salesTax: MasterCommonNumber;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type TaxRateInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  default: Scalars['Boolean']['input'];
  name: MasterCommonInput;
  salesTax: MasterCommonInputNumber;
};

export type TestEmailInput = {
  emails: Scalars['String']['input'];
  html: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  visibility?: InputMaybe<Array<VisibilityInput>>;
};

export type UpdateMenuInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  visibility?: InputMaybe<Array<VisibilityInput>>;
};

export type UpdateRestaurantInput = {
  address?: InputMaybe<AddressInfoInput>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  brandingLogo?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<MasterCommonInput>;
  restaurantId: Scalars['String']['input'];
  socialInfo?: InputMaybe<SocialInfoInput>;
  status: RestaurantStatus;
  taxRates?: InputMaybe<TaxRateInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOnboardingInput = {
  address?: InputMaybe<AddressInfoInput>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<BusinessTypeEnum>;
  dob?: InputMaybe<Scalars['String']['input']>;
  ein?: InputMaybe<Scalars['String']['input']>;
  employeeSize?: InputMaybe<MasterCommonInput>;
  establishedAt?: InputMaybe<Scalars['String']['input']>;
  estimatedRevenue?: InputMaybe<MasterCommonInput>;
  ssn?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PlatformStatus>;
  taxRates?: InputMaybe<Array<TaxRateInput>>;
};

export type UpdateUserProfileInput = {
  address?: InputMaybe<AddressInfoInput>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<BusinessTypeEnum>;
  dob?: InputMaybe<Scalars['DateTimeISO']['input']>;
  ein?: InputMaybe<Scalars['String']['input']>;
  employeeSize?: InputMaybe<MasterCommonInput>;
  establishedAt?: InputMaybe<Scalars['String']['input']>;
  estimatedRevenue?: InputMaybe<MasterCommonInput>;
  ssn?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  accessHistory: Array<AccessHistory>;
  accountPreferences?: Maybe<AccountPreference>;
  address?: Maybe<AddressInfo>;
  businessName?: Maybe<Scalars['String']['output']>;
  businessType?: Maybe<BusinessTypeEnum>;
  createdAt: Scalars['DateTimeISO']['output'];
  dob?: Maybe<Scalars['DateTimeISO']['output']>;
  ein?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  employeeSize?: Maybe<MasterCommon>;
  establishedAt?: Maybe<Scalars['String']['output']>;
  estimatedRevenue?: Maybe<MasterCommon>;
  firstName: Scalars['String']['output'];
  lastLoggedIn: Scalars['DateTimeISO']['output'];
  lastLoggedOut: Scalars['DateTimeISO']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  restaurants?: Maybe<Array<RestaurantInfo>>;
  ssn?: Maybe<Scalars['String']['output']>;
  status: PlatformStatus;
  statusUpdatedBy?: Maybe<Admin>;
  taxRates: Array<TaxRate>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type VerifyUserDetails = {
  accountPreferences: AccountPreferenceInput;
  email: Scalars['String']['input'];
  emailOtp: Scalars['String']['input'];
  emailOtpVerifyKey: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Visibility = {
  __typename?: 'Visibility';
  name: MasterCommon;
  status: Scalars['Boolean']['output'];
};

export type VisibilityInput = {
  name: MasterCommonInput;
  status: Scalars['Boolean']['input'];
};

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

export type AddCategoryInput = {
  desc: MasterCommonInput;
  name: MasterCommonInput;
  status: StatusEnum;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Admin', _id: string, name: string, role: AdminRole } };

export type AddAdminMutationVariables = Exact<{
  input: AddAdminInput;
}>;


export type AddAdminMutation = { __typename?: 'Mutation', addAdmin: boolean };

export type GetAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = { __typename?: 'Query', getAdmins: Array<{ __typename?: 'Admin', _id: string, name: string, email: string, role: AdminRole, numberOfResetPassword: number, createdAt: any, updatedAt: any, status: PlatformStatus }> };

export type AdminLoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: string };

export type GetAllRestaurantUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantUsersQuery = { __typename?: 'Query', getAllRestaurantUsers: Array<{ __typename?: 'User', _id: string, email: string, createdAt: any, updatedAt: any, status: PlatformStatus, firstName: string }> };

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: Array<{ __typename?: 'Restaurant', _id: string, status: RestaurantStatus }> };

export type ResetPasswordAdminQueryVariables = Exact<{
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordAdminQuery = { __typename?: 'Query', resetPasswordAdmin: boolean };

export type DeleteAdminMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAdminMutation = { __typename?: 'Mutation', deleteAdmin: boolean };

export type ChangeRoleMutationVariables = Exact<{
  id: Scalars['String']['input'];
  role: AdminRole;
}>;


export type ChangeRoleMutation = { __typename?: 'Mutation', changeRole: boolean };

export type ChangeUserStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ChangeUserStatusMutation = { __typename?: 'Mutation', changeUserStatus: boolean };

export type BlockAdminMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type BlockAdminMutation = { __typename?: 'Mutation', blockAdmin: boolean };

export type AdminLogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminLogoutQuery = { __typename?: 'Query', adminLogout: boolean };

export type CreateEmailTemplateMutationVariables = Exact<{
  input: AddEmailTemplateInput;
}>;


export type CreateEmailTemplateMutation = { __typename?: 'Mutation', createEmailTemplate: boolean };

export type DeleteEmailTemplateMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEmailTemplateMutation = { __typename?: 'Mutation', deleteEmailTemplate: boolean };

export type CreateEmailCampaignMutationVariables = Exact<{
  input: AddEmailCampaignInput;
}>;


export type CreateEmailCampaignMutation = { __typename?: 'Mutation', createEmailCampaign: boolean };

export type SendTestEmailsMutationVariables = Exact<{
  input: TestEmailInput;
}>;


export type SendTestEmailsMutation = { __typename?: 'Mutation', sendTestEmails: boolean };

export type GetAllEmailTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailTemplatesQuery = { __typename?: 'Query', getAllEmailTemplates: Array<{ __typename?: 'EmailTemplatesObject', _id: string, content: string, designJson: string, title: string, createdAt: any, updatedAt: any, createdBy: { __typename?: 'Admin', name: string }, updatedBy: { __typename?: 'Admin', name: string } }> };

export type GetAllEmailTemplatesTitleAndIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailTemplatesTitleAndIdQuery = { __typename?: 'Query', getAllEmailTemplates: Array<{ __typename?: 'EmailTemplatesObject', _id: string, designJson: string, title: string, content: string }> };

export type GetAllEmailCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailCampaignsQuery = { __typename?: 'Query', getAllEmailCampaigns: Array<{ __typename?: 'EmailCampaignsObject', _id: string, campaignName: string, emailSubject: string, status: EmailCampaignStatusEnum, target: EmailCampaignTargetTypes, usersCount: number, scheduleType: EmailCampaignScheduleTypes, scheduleTime?: any | null, csvDataUrl?: string | null, logUrl?: string | null, createdAt: any, updatedAt: any, emailTemplate: { __typename?: 'EmailBuilderTemplate', _id: string, title: string }, stats: { __typename?: 'EmailCampaignStats', mailsSent: number, mailsDelivered: number, mailsOpened: Array<{ __typename?: 'EmailCampaignEventHistory', email: string, date: any }>, mailsClicked: Array<{ __typename?: 'EmailCampaignEventHistory', email: string, date: any }> }, createdBy: { __typename?: 'Admin', name: string }, updatedBy: { __typename?: 'Admin', name: string } }> };

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
export const AddAdminDocument = gql`
    mutation addAdmin($input: AddAdminInput!) {
  addAdmin(input: $input)
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
    status
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
    status
    firstName
  }
}
    `;
export const GetAllRestaurantsDocument = gql`
    query GetAllRestaurants {
  getAllRestaurants {
    _id
    status
  }
}
    `;
export const ResetPasswordAdminDocument = gql`
    query resetPasswordAdmin($id: String!, $password: String!) {
  resetPasswordAdmin(id: $id, password: $password)
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
export const ChangeUserStatusDocument = gql`
    mutation changeUserStatus($id: String!) {
  changeUserStatus(id: $id)
}
    `;
export const BlockAdminDocument = gql`
    mutation blockAdmin($id: String!) {
  blockAdmin(id: $id, updateStatus: active)
}
    `;
export const AdminLogoutDocument = gql`
    query AdminLogout {
  adminLogout
}
    `;
export const CreateEmailTemplateDocument = gql`
    mutation CreateEmailTemplate($input: AddEmailTemplateInput!) {
  createEmailTemplate(input: $input)
}
    `;
export const DeleteEmailTemplateDocument = gql`
    mutation DeleteEmailTemplate($id: String!) {
  deleteEmailTemplate(id: $id)
}
    `;
export const CreateEmailCampaignDocument = gql`
    mutation CreateEmailCampaign($input: AddEmailCampaignInput!) {
  createEmailCampaign(input: $input)
}
    `;
export const SendTestEmailsDocument = gql`
    mutation SendTestEmails($input: TestEmailInput!) {
  sendTestEmails(input: $input)
}
    `;
export const GetAllEmailTemplatesDocument = gql`
    query GetAllEmailTemplates {
  getAllEmailTemplates {
    _id
    content
    designJson
    title
    createdBy {
      name
    }
    updatedBy {
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export const GetAllEmailTemplatesTitleAndIdDocument = gql`
    query GetAllEmailTemplatesTitleAndId {
  getAllEmailTemplates {
    _id
    designJson
    title
    content
  }
}
    `;
export const GetAllEmailCampaignsDocument = gql`
    query GetAllEmailCampaigns {
  getAllEmailCampaigns {
    _id
    campaignName
    emailSubject
    emailTemplate {
      _id
      title
    }
    status
    target
    usersCount
    scheduleType
    scheduleTime
    csvDataUrl
    logUrl
    stats {
      mailsSent
      mailsDelivered
      mailsOpened {
        email
        date
      }
      mailsClicked {
        email
        date
      }
    }
    createdBy {
      name
    }
    updatedBy {
      name
    }
    createdAt
    updatedAt
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
    addAdmin(variables: AddAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddAdminMutation>(AddAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addAdmin', 'mutation', variables);
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
    resetPasswordAdmin(variables: ResetPasswordAdminQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ResetPasswordAdminQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordAdminQuery>(ResetPasswordAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetPasswordAdmin', 'query', variables);
    },
    DeleteAdmin(variables: DeleteAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAdminMutation>(DeleteAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAdmin', 'mutation', variables);
    },
    ChangeRole(variables: ChangeRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChangeRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeRoleMutation>(ChangeRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChangeRole', 'mutation', variables);
    },
    changeUserStatus(variables: ChangeUserStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChangeUserStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeUserStatusMutation>(ChangeUserStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'changeUserStatus', 'mutation', variables);
    },
    blockAdmin(variables: BlockAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BlockAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlockAdminMutation>(BlockAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'blockAdmin', 'mutation', variables);
    },
    AdminLogout(variables?: AdminLogoutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminLogoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminLogoutQuery>(AdminLogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminLogout', 'query', variables);
    },
    CreateEmailTemplate(variables: CreateEmailTemplateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateEmailTemplateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEmailTemplateMutation>(CreateEmailTemplateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEmailTemplate', 'mutation', variables);
    },
    DeleteEmailTemplate(variables: DeleteEmailTemplateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteEmailTemplateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEmailTemplateMutation>(DeleteEmailTemplateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEmailTemplate', 'mutation', variables);
    },
    CreateEmailCampaign(variables: CreateEmailCampaignMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateEmailCampaignMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEmailCampaignMutation>(CreateEmailCampaignDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEmailCampaign', 'mutation', variables);
    },
    SendTestEmails(variables: SendTestEmailsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SendTestEmailsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendTestEmailsMutation>(SendTestEmailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SendTestEmails', 'mutation', variables);
    },
    GetAllEmailTemplates(variables?: GetAllEmailTemplatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllEmailTemplatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEmailTemplatesQuery>(GetAllEmailTemplatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEmailTemplates', 'query', variables);
    },
    GetAllEmailTemplatesTitleAndId(variables?: GetAllEmailTemplatesTitleAndIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllEmailTemplatesTitleAndIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEmailTemplatesTitleAndIdQuery>(GetAllEmailTemplatesTitleAndIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEmailTemplatesTitleAndId', 'query', variables);
    },
    GetAllEmailCampaigns(variables?: GetAllEmailCampaignsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllEmailCampaignsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEmailCampaignsQuery>(GetAllEmailCampaignsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEmailCampaigns', 'query', variables);
    },
    GetWaitListUsers(variables?: GetWaitListUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetWaitListUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWaitListUsersQuery>(GetWaitListUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWaitListUsers', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;