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

export type AddCategoryInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc: Scalars['String']['input'];
  items?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  status: StatusEnum;
  visibility?: InputMaybe<Array<VisibilityInput>>;
};

export type AddConfigInput = {
  type: ConfigTypeEnum;
  value: Scalars['Float']['input'];
};

export type AddCuisineInput = {
  description: Scalars['String']['input'];
  value: Scalars['String']['input'];
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

export type AddItemInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  options?: Array<OptionsInput>;
  orderLimit?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  priceOptions: Array<PriceOptionsInput>;
  status: StatusEnum;
  subCategory?: InputMaybe<ItemSubCategoryInput>;
  visibility?: InputMaybe<Array<VisibilityInput>>;
};

export type AddItemOptionInput = {
  desc: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  type: ItemOptionsEnum;
};

export type AddMenuInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  taxRateId?: InputMaybe<Scalars['String']['input']>;
  type: MenuTypeEnum;
};

export type AddModifierGroupInput = {
  desc: Scalars['String']['input'];
  maxSelections: Scalars['Float']['input'];
  minSelections: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  optional: Scalars['Boolean']['input'];
  price: Scalars['Float']['input'];
  pricingType: PriceTypeEnum;
};

export type AddModifierInput = {
  desc: Scalars['String']['input'];
  isItem: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  preSelect: Scalars['Boolean']['input'];
  price: Scalars['Float']['input'];
};

export type AddPermissionInput = {
  isFunction?: Scalars['Boolean']['input'];
  preselect: Array<UserRole>;
  type: PermissionTypeEnum;
};

export type AddStateInput = {
  abbreviation: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AddSubCategoryInput = {
  desc: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type AddTeamMemberInput = {
  accountPreferences: AccountPreferenceInput;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  permissions: Array<UserPermissionInput>;
  phone: Scalars['String']['input'];
  restaurants: Array<Scalars['String']['input']>;
  role: UserRole;
};

export type AddTimezoneInput = {
  gmtOffset: Scalars['Float']['input'];
  value: Scalars['String']['input'];
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
  restaurantName: Scalars['String']['input'];
  software: SoftWareEnum;
  website: Scalars['String']['input'];
};

export type AddressInfo = {
  __typename?: 'AddressInfo';
  _id: Scalars['ID']['output'];
  addressLine1: Scalars['String']['output'];
  addressLine2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  coordinate?: Maybe<LocationCommon>;
  place?: Maybe<Places>;
  state: StateData;
  zipcode: Scalars['Float']['output'];
};

export type AddressInfoInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  coordinate: LocationCommonInput;
  place: PlaceInput;
  state: StateDataInput;
  zipcode: Scalars['Float']['input'];
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID']['output'];
  accessHistory?: Maybe<Array<AccessHistory>>;
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
  hours: Array<Hours>;
};

export type AvailabilityInput = {
  active: Scalars['Boolean']['input'];
  day: Day;
  hours: Array<HoursInput>;
};

/** Restaurant beverage category type enum. */
export enum BeverageCategory {
  Alcohol = 'Alcohol',
  NonAlcohol = 'NonAlcohol'
}

export type Business = {
  __typename?: 'Business';
  _id: Scalars['ID']['output'];
  address?: Maybe<AddressInfo>;
  businessName?: Maybe<Scalars['String']['output']>;
  businessType?: Maybe<BusinessTypeEnum>;
  createdAt: Scalars['DateTimeISO']['output'];
  ein?: Maybe<Scalars['String']['output']>;
  employeeSize?: Maybe<StaffCountEnum>;
  establishedAt?: Maybe<Scalars['String']['output']>;
  estimatedRevenue?: Maybe<EstimatedRevenueEnum>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: UserInfo;
};

/** Business type enum */
export enum BusinessTypeEnum {
  Corporation = 'Corporation',
  Llc = 'LLC',
  Llp = 'LLP',
  Lp = 'LP',
  SoleProprietor = 'SoleProprietor'
}

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  availability?: Maybe<Array<Availability>>;
  createdAt: Scalars['DateTimeISO']['output'];
  desc: Scalars['String']['output'];
  items: Array<ItemInfo>;
  menu?: Maybe<Array<Menu>>;
  name: Scalars['String']['output'];
  restaurantId: Restaurant;
  status: StatusEnum;
  upSellCategories?: Maybe<Array<Category>>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
  visibility: Array<Visibility>;
};

export type CategoryInfo = {
  __typename?: 'CategoryInfo';
  _id: Category;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type Config = {
  __typename?: 'Config';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  type: ConfigTypeEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  value: Scalars['Float']['output'];
};

/** Enum to store the types of master config that can be changed by admins anytime */
export enum ConfigTypeEnum {
  MaxCsvRows = 'MaxCSVRows',
  MonthlySubscription = 'MonthlySubscription',
  ProcessingFee = 'ProcessingFee',
  TrialDays = 'TrialDays'
}

/** ConnectionStatusEnum enum type  */
export enum ConnectionStatusEnum {
  Connected = 'Connected',
  Error = 'Error',
  Expired = 'Expired',
  NotConnected = 'NotConnected'
}

export type CsvUploadError = {
  __typename?: 'CsvUploadError';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  errorFile: Scalars['String']['output'];
  issues: Array<Scalars['String']['output']>;
  restaurantId: Restaurant;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type Cuisine = {
  __typename?: 'Cuisine';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  value: Scalars['String']['output'];
};

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
  Admins = 'Admins',
  Csv = 'CSV',
  Users = 'Users',
  Waitlist = 'Waitlist'
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

/** Enum used for storing static values of Estimated Revenue */
export enum EstimatedRevenueEnum {
  Above1M = 'Above1M',
  From0to50K = 'From0to50K',
  From50Kto200K = 'From50Kto200K',
  From200Kto500K = 'From200Kto500K',
  From500Kto1M = 'From500Kto1M'
}

/** Apply filter operators while fetching the data  */
export enum FilterOperatorsEnum {
  Any = 'any',
  EqualTo = 'equalTo',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqualTo = 'greaterThanOrEqualTo',
  LessThan = 'lessThan',
  LessThanOrEqualTo = 'lessThanOrEqualTo',
  NotEqualTo = 'notEqualTo'
}

/** Restaurant food type enum. */
export enum FoodType {
  NonVegetarian = 'NonVegetarian',
  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian'
}

export type Hours = {
  __typename?: 'Hours';
  end: Scalars['DateTimeISO']['output'];
  start: Scalars['DateTimeISO']['output'];
};

export type HoursInput = {
  end: Scalars['DateTimeISO']['input'];
  start: Scalars['DateTimeISO']['input'];
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
  availability?: Maybe<Array<Availability>>;
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  desc: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  modifierGroup: Array<ModifierGroupInfo>;
  name: Scalars['String']['output'];
  options: Array<Options>;
  orderLimit?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  priceOptions: Array<PriceOptions>;
  restaurantId: Restaurant;
  status: StatusEnum;
  subCategory?: Maybe<ItemSubCategory>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
  visibility: Array<Visibility>;
};

export type ItemInfo = {
  __typename?: 'ItemInfo';
  _id: Item;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  status: StatusEnum;
};

export type ItemOption = {
  __typename?: 'ItemOption';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  desc: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  type: ItemOptionsEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
};

/** Enum to store the options for menu items */
export enum ItemOptionsEnum {
  HasNuts = 'HasNuts',
  IsGlutenFree = 'IsGlutenFree',
  IsHalal = 'IsHalal',
  IsSpicy = 'IsSpicy',
  IsVegan = 'IsVegan',
  PopularItem = 'PopularItem',
  UpSellItem = 'UpSellItem'
}

export type ItemSubCategory = {
  __typename?: 'ItemSubCategory';
  desc: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type ItemSubCategoryInput = {
  desc: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type LocationCommon = {
  __typename?: 'LocationCommon';
  coordinates: Array<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LocationCommonInput = {
  coordinates: Array<Scalars['Float']['input']>;
};

/** Restaurant Meat type enum. */
export enum MeatType {
  Halal = 'Halal',
  NonHalal = 'NonHalal'
}

export type Menu = {
  __typename?: 'Menu';
  _id: Scalars['ID']['output'];
  availability?: Maybe<Array<Availability>>;
  categories: Array<CategoryInfo>;
  createdAt: Scalars['DateTimeISO']['output'];
  name: Scalars['String']['output'];
  restaurantId: Restaurant;
  status: StatusEnum;
  taxes?: Maybe<TaxRateInfo>;
  type: MenuTypeEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
};

export type MenuInfo = {
  __typename?: 'MenuInfo';
  _id: Menu;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type: MenuTypeEnum;
};

/** Menu status enum */
export enum MenuTypeEnum {
  Catering = 'Catering',
  DineIn = 'DineIn',
  OnlineOrdering = 'OnlineOrdering'
}

export type Modifier = {
  __typename?: 'Modifier';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  desc: Scalars['String']['output'];
  isItem: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  preSelect: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  restaurantId: Restaurant;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
};

export type ModifierGroup = {
  __typename?: 'ModifierGroup';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  desc: Scalars['String']['output'];
  maxSelections: Scalars['Float']['output'];
  minSelections: Scalars['Float']['output'];
  modifiers: Array<ModifierInfo>;
  name: Scalars['String']['output'];
  optional: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  pricingType: PriceTypeEnum;
  restaurantId: Restaurant;
  status: StatusEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
};

export type ModifierGroupInfo = {
  __typename?: 'ModifierGroupInfo';
  _id: ModifierGroup;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pricingType: PriceTypeEnum;
};

export type ModifierInfo = {
  __typename?: 'ModifierInfo';
  _id: Modifier;
  desc: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isItem: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  preSelect: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean']['output'];
  addCategoriesToMenu: Scalars['Boolean']['output'];
  addCategory: Scalars['Boolean']['output'];
  addConfig: Scalars['Boolean']['output'];
  addCuisine: Scalars['Boolean']['output'];
  addItem: Scalars['Boolean']['output'];
  addItemOption: Scalars['Boolean']['output'];
  addItemsToCategory: Scalars['Boolean']['output'];
  addMenu: Scalars['Boolean']['output'];
  addModifier: Scalars['Boolean']['output'];
  addModifierGroup: Scalars['Boolean']['output'];
  addModifierGroupToItem: Scalars['Boolean']['output'];
  addModifierToModifierGroup: Scalars['Boolean']['output'];
  addPermission: Scalars['Boolean']['output'];
  addState: Scalars['Boolean']['output'];
  addSubCategory: Scalars['Boolean']['output'];
  addTaxRate: Scalars['String']['output'];
  addTeamMember: Scalars['Boolean']['output'];
  addTimezone: Scalars['Boolean']['output'];
  addUser: Scalars['String']['output'];
  addWaitListUser: Scalars['Boolean']['output'];
  adminUserDetailsRejection: Scalars['Boolean']['output'];
  adminUserDetailsVerification: Scalars['Boolean']['output'];
  blockAdmin: Scalars['Boolean']['output'];
  businessOnboarding: Scalars['Boolean']['output'];
  changeCategoryStatus: Scalars['Boolean']['output'];
  changeItemStatus: Scalars['Boolean']['output'];
  changeMenuStatus: Scalars['Boolean']['output'];
  changeModifierGroupStatus: Scalars['Boolean']['output'];
  changeRestaurantStatus: Scalars['Boolean']['output'];
  changeRole: Scalars['Boolean']['output'];
  changeUserStatus: Scalars['Boolean']['output'];
  completeBusinessOnboarding: Scalars['Boolean']['output'];
  createEmailCampaign: Scalars['Boolean']['output'];
  createEmailTemplate: Scalars['Boolean']['output'];
  deleteAdmin: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  deleteEmailTemplate: Scalars['Boolean']['output'];
  deleteItem: Scalars['Boolean']['output'];
  deleteMenu: Scalars['Boolean']['output'];
  deleteModifier: Scalars['Boolean']['output'];
  getItemByCategory: Item;
  removeCategoryFromMenu: Scalars['Boolean']['output'];
  removeItemFromCategory: Scalars['Boolean']['output'];
  removeModifierFromModifierGroup: Scalars['Boolean']['output'];
  removeModifierGroup: Scalars['Boolean']['output'];
  removeModifierGroupFromItem: Scalars['Boolean']['output'];
  removeTeamMember: Scalars['Boolean']['output'];
  restaurantOnboarding: Scalars['Boolean']['output'];
  sendTestEmails: Scalars['Boolean']['output'];
  updateCategory: Scalars['Boolean']['output'];
  updateConfig: Scalars['Boolean']['output'];
  updateCuisineStatus: Scalars['Boolean']['output'];
  updateItem: Scalars['Boolean']['output'];
  updateItemOption: Scalars['Boolean']['output'];
  updateMenu: Scalars['Boolean']['output'];
  updateModifier: Scalars['Boolean']['output'];
  updateModifierGroup: Scalars['Boolean']['output'];
  updatePermissionPreselect: Scalars['Boolean']['output'];
  updateStateStatus: Scalars['Boolean']['output'];
  updateSubCategory: Scalars['Boolean']['output'];
  updateTaxRate: Scalars['Boolean']['output'];
  updateTimezoneStatus: Scalars['Boolean']['output'];
  updateUserProfile: Scalars['Boolean']['output'];
  verifyTeamEmail: Scalars['Boolean']['output'];
  verifyUserDetails: Scalars['Boolean']['output'];
};


export type MutationAddAdminArgs = {
  input: AddAdminInput;
};


export type MutationAddCategoriesToMenuArgs = {
  categoryIds: Array<Scalars['String']['input']>;
  menuId: Scalars['String']['input'];
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddConfigArgs = {
  input: AddConfigInput;
};


export type MutationAddCuisineArgs = {
  input: AddCuisineInput;
};


export type MutationAddItemArgs = {
  input: AddItemInput;
  modifierGroups: Array<Scalars['String']['input']>;
};


export type MutationAddItemOptionArgs = {
  input: AddItemOptionInput;
};


export type MutationAddItemsToCategoryArgs = {
  categoryId: Scalars['String']['input'];
  itemIds: Array<Scalars['String']['input']>;
};


export type MutationAddMenuArgs = {
  input: AddMenuInput;
};


export type MutationAddModifierArgs = {
  input: AddModifierInput;
};


export type MutationAddModifierGroupArgs = {
  input: AddModifierGroupInput;
  modifiers: Array<Scalars['String']['input']>;
};


export type MutationAddModifierGroupToItemArgs = {
  itemId: Scalars['String']['input'];
  modifierGroupIds: Array<Scalars['String']['input']>;
};


export type MutationAddModifierToModifierGroupArgs = {
  modifierGroupId: Scalars['String']['input'];
  modifierIds: Array<Scalars['String']['input']>;
};


export type MutationAddPermissionArgs = {
  input: AddPermissionInput;
};


export type MutationAddStateArgs = {
  input: AddStateInput;
};


export type MutationAddSubCategoryArgs = {
  input: AddSubCategoryInput;
};


export type MutationAddTaxRateArgs = {
  input: TaxRateInput;
};


export type MutationAddTeamMemberArgs = {
  input: AddTeamMemberInput;
};


export type MutationAddTimezoneArgs = {
  input: AddTimezoneInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationAddWaitListUserArgs = {
  input: AddWaitListUserInput;
};


export type MutationAdminUserDetailsRejectionArgs = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationAdminUserDetailsVerificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationBlockAdminArgs = {
  id: Scalars['String']['input'];
  updateStatus: PlatformStatus;
};


export type MutationBusinessOnboardingArgs = {
  input: RegisterBusinessInput;
};


export type MutationChangeCategoryStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeItemStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeMenuStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeModifierGroupStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeRestaurantStatusArgs = {
  id: Scalars['String']['input'];
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


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEmailTemplateArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMenuArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteModifierArgs = {
  id: Scalars['String']['input'];
};


export type MutationGetItemByCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationRemoveCategoryFromMenuArgs = {
  categoryId: Scalars['String']['input'];
  menuId: Scalars['String']['input'];
};


export type MutationRemoveItemFromCategoryArgs = {
  categoryId: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
};


export type MutationRemoveModifierFromModifierGroupArgs = {
  modifierGroupId: Scalars['String']['input'];
  modifierId: Scalars['String']['input'];
};


export type MutationRemoveModifierGroupArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveModifierGroupFromItemArgs = {
  itemId: Scalars['String']['input'];
  modifierGroupId: Scalars['String']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  id: Scalars['String']['input'];
};


export type MutationRestaurantOnboardingArgs = {
  input: UpdateRestaurantDetailsInput;
};


export type MutationSendTestEmailsArgs = {
  input: TestEmailInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateConfigArgs = {
  id: Scalars['String']['input'];
  value: Scalars['Float']['input'];
};


export type MutationUpdateCuisineStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationUpdateItemOptionArgs = {
  input: UpdateItemOptionInput;
};


export type MutationUpdateMenuArgs = {
  input: UpdateMenuInput;
};


export type MutationUpdateModifierArgs = {
  input: UpdateModifierInput;
};


export type MutationUpdateModifierGroupArgs = {
  input: UpdateModifierGroupInput;
};


export type MutationUpdatePermissionPreselectArgs = {
  id: Scalars['String']['input'];
  preselect: Array<UserRole>;
};


export type MutationUpdateStateStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateSubCategoryArgs = {
  input: UpdateSubCategoryInput;
};


export type MutationUpdateTaxRateArgs = {
  input: UpdateTaxRateInput;
};


export type MutationUpdateTimezoneStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationVerifyTeamEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyUserDetailsArgs = {
  input: VerifyUserDetails;
};

export type Options = {
  __typename?: 'Options';
  _id: Scalars['ID']['output'];
  desc: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  type: ItemOptionsEnum;
};

export type OptionsInput = {
  _id: Scalars['String']['input'];
  desc: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
  type: ItemOptionsEnum;
};

export type PaginatedFilter = {
  field: Scalars['String']['input'];
  operator: FilterOperatorsEnum;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Permission = {
  __typename?: 'Permission';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  isFunction: Scalars['Boolean']['output'];
  preselect: Array<UserRole>;
  type: PermissionTypeEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
};

/** Enum to store the types of permissions that can be given to sub-users */
export enum PermissionTypeEnum {
  AddRestaurant = 'AddRestaurant',
  Cms = 'CMS',
  Customers = 'Customers',
  Dashboard = 'Dashboard',
  Integrations = 'Integrations',
  Marketing = 'Marketing',
  Menu = 'Menu',
  Offers = 'Offers',
  Orders = 'Orders',
  PaymentManagement = 'PaymentManagement',
  Reports = 'Reports',
  Rewards = 'Rewards',
  UpdateBusiness = 'UpdateBusiness',
  UpdateRestaurant = 'UpdateRestaurant',
  UpdateTax = 'UpdateTax',
  UserManagement = 'UserManagement'
}

export type PlaceDetail = {
  __typename?: 'PlaceDetail';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type PlaceInput = {
  displayName: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
};

export type Places = {
  __typename?: 'Places';
  displayName: Scalars['String']['output'];
  placeId: Scalars['String']['output'];
};

/** Restaurant user status */
export enum PlatformStatus {
  Active = 'active',
  Blocked = 'blocked',
  InternalVerificationPending = 'internalVerificationPending',
  OnboardingPending = 'onboardingPending',
  PaymentPending = 'paymentPending'
}

export type PriceOptions = {
  __typename?: 'PriceOptions';
  menuType: MenuTypeEnum;
  price: Scalars['Float']['output'];
};

export type PriceOptionsInput = {
  menuType: MenuTypeEnum;
  price: Scalars['Float']['input'];
};

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
  changeRestaurantStatusFromUser: Scalars['Boolean']['output'];
  completeRestaurantOnboarding: Scalars['Boolean']['output'];
  deleteData: Scalars['Boolean']['output'];
  deleteMenuData: Scalars['Boolean']['output'];
  emailOtpVerification: Scalars['Boolean']['output'];
  generateOtpForEmailVerification: Scalars['String']['output'];
  generateOtpForLogin: Scalars['String']['output'];
  getActiveCuisines: Array<Cuisine>;
  getActiveStates: Array<State>;
  getActiveTimezones: Array<Timezone>;
  getAdmins: Array<Admin>;
  getAllConfigs: Array<Config>;
  getAllCuisines: Array<Cuisine>;
  getAllEmailCampaigns: Array<EmailCampaignsObject>;
  getAllEmailTemplates: Array<EmailTemplatesObject>;
  getAllItemOptions: Array<ItemOption>;
  getAllMenus: Array<Menu>;
  getAllPermissions: Array<Permission>;
  getAllRestaurantUsers: Array<User>;
  getAllRestaurants: Array<Restaurant>;
  getAllStates: Array<State>;
  getAllTimezones: Array<Timezone>;
  getBusinessDetails: Business;
  getBusinessOnboardingDetails?: Maybe<Business>;
  getCategories: Array<Category>;
  getCategory: Category;
  getCategoryByMenu: Category;
  getConfig: Config;
  getCsvError: CsvUploadError;
  getCsvErrors: Array<CsvUploadError>;
  getCsvHeaders: Array<Scalars['String']['output']>;
  getItem: Item;
  getItems: Array<Item>;
  getMenu: Menu;
  getMenuByRestaurant: Array<Menu>;
  getMenusByType: Array<Menu>;
  getModifier: Modifier;
  getModifierGroup: ModifierGroup;
  getModifierGroups: Array<ModifierGroup>;
  getModifiers: Array<Modifier>;
  getPlaceDetails?: Maybe<PlaceDetail>;
  getPlacesList: Array<Places>;
  getRestaurantDetails: Restaurant;
  getRestaurantOnboardingData: Restaurant;
  getSubCategories: Array<SubCategory>;
  getSubCategory: SubCategory;
  getTaxRate: TaxRate;
  getTeamMembers: Array<SubUser>;
  getUserRestaurants: Array<RestaurantInfo>;
  getUserRestaurantsPending: Array<RestaurantInfo>;
  getUsersForTarget: Scalars['Float']['output'];
  getWaitListUsers: Array<WaitListUser>;
  logout: Scalars['Boolean']['output'];
  me: Admin;
  meUser: User;
  resetPasswordAdmin: Scalars['Boolean']['output'];
  saveCsvError: Scalars['Boolean']['output'];
  setRestaurantIdAsCookie: Scalars['Boolean']['output'];
  uploadCsvData: Scalars['Boolean']['output'];
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


export type QueryGetAllEmailTemplatesArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetAllRestaurantUsersArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetAllRestaurantsArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetCategoriesArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoryByMenuArgs = {
  menuId: Scalars['String']['input'];
};


export type QueryGetConfigArgs = {
  type: ConfigTypeEnum;
};


export type QueryGetCsvErrorArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetItemsArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetMenuArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MenuTypeEnum>;
};


export type QueryGetMenusByTypeArgs = {
  id: Scalars['String']['input'];
  type?: InputMaybe<MenuTypeEnum>;
};


export type QueryGetModifierArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetModifierGroupArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetModifierGroupsArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetModifiersArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetPlaceDetailsArgs = {
  placeId: Scalars['String']['input'];
};


export type QueryGetPlacesListArgs = {
  input: Scalars['String']['input'];
};


export type QueryGetSubCategoriesArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetSubCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUsersForTargetArgs = {
  target: EmailCampaignTargetTypes;
};


export type QueryResetPasswordAdminArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QuerySaveCsvErrorArgs = {
  input: UploadCsvErrorInput;
};


export type QuerySetRestaurantIdAsCookieArgs = {
  id: Scalars['String']['input'];
};


export type QueryUploadCsvDataArgs = {
  input: UploadCsvInput;
};


export type QueryVerifyOtpForLoginArgs = {
  input: Scalars['String']['input'];
  key: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type RegisterBusinessInput = {
  address?: InputMaybe<AddressInfoInput>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<BusinessTypeEnum>;
  ein?: InputMaybe<Scalars['String']['input']>;
  employeeSize?: InputMaybe<StaffCountEnum>;
  establishedAt?: InputMaybe<Scalars['String']['input']>;
  estimatedRevenue?: InputMaybe<EstimatedRevenueEnum>;
};

export type RejectRecord = {
  __typename?: 'RejectRecord';
  admin: Admin;
  createdAt: Scalars['DateTimeISO']['output'];
  name: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['ID']['output'];
  address?: Maybe<AddressInfo>;
  availability?: Maybe<Array<Availability>>;
  beverageCategory?: Maybe<Array<BeverageCategory>>;
  brandingLogo?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Array<RestaurantCategory>>;
  createdAt: Scalars['DateTimeISO']['output'];
  dineInCapacity?: Maybe<Scalars['Float']['output']>;
  foodType?: Maybe<Array<FoodType>>;
  integrations?: Maybe<Array<Integration>>;
  meatType?: Maybe<MeatType>;
  menus?: Maybe<Array<MenuInfo>>;
  name: Scalars['String']['output'];
  socialInfo?: Maybe<SocialInfo>;
  status: RestaurantStatus;
  taxRates?: Maybe<Array<TaxRateInfo>>;
  timezone?: Maybe<TimezoneData>;
  type?: Maybe<RestaurantType>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
  website?: Maybe<Scalars['String']['output']>;
};

/** Restaurant category type enum. */
export enum RestaurantCategory {
  CloudKitchen = 'CloudKitchen',
  DineIn = 'DineIn',
  PremiumDineIn = 'PremiumDineIn',
  Qsr = 'QSR',
  Takeout = 'Takeout'
}

export type RestaurantInfo = {
  __typename?: 'RestaurantInfo';
  _id: Restaurant;
  city?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: RestaurantStatus;
};

/** Restaurant status enum. */
export enum RestaurantStatus {
  Active = 'active',
  Blocked = 'blocked',
  BlockedBySystem = 'blockedBySystem',
  Inactive = 'inactive',
  OnboardingPending = 'onboardingPending'
}

/** Restaurant type enum. */
export enum RestaurantType {
  Independent = 'Independent',
  PartOfChain = 'PartOfChain'
}

export type SocialInfo = {
  __typename?: 'SocialInfo';
  _id: Scalars['ID']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type SocialInfoInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Types of SoftWare Enum */
export enum SoftWareEnum {
  Clover = 'Clover',
  None = 'None',
  Square = 'Square',
  Toast = 'Toast'
}

/** Enum used for storing static values of Staff Size */
export enum StaffCountEnum {
  Above40 = 'Above40',
  From0To10 = 'From0To10',
  From11to25 = 'From11to25',
  From26to40 = 'From26to40'
}

export type State = {
  __typename?: 'State';
  _id: Scalars['ID']['output'];
  abbreviation?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  value: Scalars['String']['output'];
};

export type StateData = {
  __typename?: 'StateData';
  stateId: Scalars['String']['output'];
  stateName: Scalars['String']['output'];
};

export type StateDataInput = {
  stateId?: InputMaybe<Scalars['String']['input']>;
  stateName: Scalars['String']['input'];
};

/** Status enum  */
export enum StatusEnum {
  Active = 'active',
  Inactive = 'inactive'
}

export type SubCategory = {
  __typename?: 'SubCategory';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  desc: Scalars['String']['output'];
  name: Scalars['String']['output'];
  restaurantId: Restaurant;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
};

export type SubUser = {
  __typename?: 'SubUser';
  _id?: Maybe<User>;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: UserStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type TaxRate = {
  __typename?: 'TaxRate';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  name: Scalars['String']['output'];
  restaurantId: Restaurant;
  salesTax: Scalars['Float']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  user: User;
};

export type TaxRateInfo = {
  __typename?: 'TaxRateInfo';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  salesTax: Scalars['Float']['output'];
};

export type TaxRateInput = {
  name: Scalars['String']['input'];
  salesTax: Scalars['Float']['input'];
};

export type TestEmailInput = {
  emails: Scalars['String']['input'];
  html: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type Timezone = {
  __typename?: 'Timezone';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  gmtOffset: Scalars['Float']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  value: Scalars['String']['output'];
};

export type TimezoneData = {
  __typename?: 'TimezoneData';
  timezoneId: Scalars['String']['output'];
  timezoneName: Scalars['String']['output'];
};

export type TimezoneDataInput = {
  timezoneId?: InputMaybe<Scalars['String']['input']>;
  timezoneName: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  _id: Scalars['String']['input'];
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusEnum>;
  visibility?: InputMaybe<Array<VisibilityInput>>;
};

export type UpdateItemInput = {
  _id: Scalars['String']['input'];
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: Array<OptionsInput>;
  orderLimit?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  priceOptions?: InputMaybe<Array<PriceOptionsInput>>;
  status?: InputMaybe<StatusEnum>;
  subCategory?: InputMaybe<ItemSubCategoryInput>;
  visibility?: InputMaybe<Array<VisibilityInput>>;
};

export type UpdateItemOptionInput = {
  _id: Scalars['String']['input'];
  desc: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  type: ItemOptionsEnum;
};

export type UpdateMenuInput = {
  _id: Scalars['String']['input'];
  availability?: InputMaybe<Array<AvailabilityInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MenuTypeEnum>;
};

export type UpdateModifierGroupInput = {
  _id: Scalars['String']['input'];
  desc?: InputMaybe<Scalars['String']['input']>;
  maxSelections: Scalars['Float']['input'];
  minSelections: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  optional?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  pricingType: PriceTypeEnum;
};

export type UpdateModifierInput = {
  _id: Scalars['String']['input'];
  desc?: InputMaybe<Scalars['String']['input']>;
  isItem?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preSelect?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRestaurantDetailsInput = {
  address?: InputMaybe<AddressInfoInput>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  beverageCategory?: InputMaybe<Array<BeverageCategory>>;
  brandingLogo?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Array<RestaurantCategory>>;
  dineInCapacity?: InputMaybe<Scalars['Float']['input']>;
  foodType?: InputMaybe<Array<FoodType>>;
  meatType?: InputMaybe<MeatType>;
  name?: InputMaybe<Scalars['String']['input']>;
  socialInfo?: InputMaybe<SocialInfoInput>;
  timezone?: InputMaybe<TimezoneDataInput>;
  type?: InputMaybe<RestaurantType>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubCategoryInput = {
  desc?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaxRateInput = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  salesTax?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserProfileInput = {
  address?: InputMaybe<AddressInfoInput>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<BusinessTypeEnum>;
  dob?: InputMaybe<Scalars['DateTimeISO']['input']>;
  ein?: InputMaybe<Scalars['String']['input']>;
  employeeSize?: InputMaybe<StaffCountEnum>;
  establishedAt?: InputMaybe<Scalars['String']['input']>;
  estimatedRevenue?: InputMaybe<EstimatedRevenueEnum>;
};

export type UploadCsvErrorInput = {
  errorFile: Scalars['String']['input'];
  issues: Array<Scalars['String']['input']>;
};

export type UploadCsvInput = {
  csvFile: Scalars['String']['input'];
  menu: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  accessHistory?: Maybe<Array<AccessHistory>>;
  accountPreferences?: Maybe<AccountPreference>;
  businessInfo?: Maybe<Business>;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastLoggedIn: Scalars['DateTimeISO']['output'];
  lastLoggedOut: Scalars['DateTimeISO']['output'];
  lastName: Scalars['String']['output'];
  ownerUserId?: Maybe<Scalars['String']['output']>;
  permissions: Array<UserPermission>;
  phone: Scalars['String']['output'];
  restaurants?: Maybe<Array<RestaurantInfo>>;
  role: UserRole;
  status: UserStatus;
  statusUpdatedBy?: Maybe<Admin>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<User>;
  verificationRejections?: Maybe<Array<RejectRecord>>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  _id: User;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: UserStatus;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  status: Scalars['Boolean']['output'];
  type: PermissionTypeEnum;
};

export type UserPermissionInput = {
  _id: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
  type: PermissionTypeEnum;
};

/** User roles  */
export enum UserRole {
  Accountant = 'Accountant',
  Manager = 'Manager',
  MarketingPartner = 'MarketingPartner',
  Owner = 'Owner',
  Staff = 'Staff'
}

/** UserStatus type enum  */
export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked',
  InternalVerificationPending = 'internalVerificationPending',
  OnboardingPending = 'onboardingPending',
  PaymentPending = 'paymentPending',
  RestaurantOnboardingPending = 'restaurantOnboardingPending',
  SubUserEmailVerificationPending = 'subUserEmailVerificationPending'
}

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
  menuType: MenuTypeEnum;
  status: StatusEnum;
};

export type VisibilityInput = {
  menuType: MenuTypeEnum;
  status: StatusEnum;
};

export type WaitListUser = {
  __typename?: 'WaitListUser';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
  restaurantName: Scalars['String']['output'];
  software: SoftWareEnum;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  website: Scalars['String']['output'];
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


export type GetAllRestaurantUsersQuery = { __typename?: 'Query', getAllRestaurantUsers: Array<{ __typename?: 'User', _id: string, email: string, phone: string, createdAt: any, updatedAt: any, status: UserStatus, firstName: string, lastName: string, businessInfo?: { __typename?: 'Business', businessName?: string | null, estimatedRevenue?: EstimatedRevenueEnum | null, employeeSize?: StaffCountEnum | null, businessType?: BusinessTypeEnum | null, address?: { __typename?: 'AddressInfo', addressLine1: string, city: string, zipcode: number, state: { __typename?: 'StateData', stateId: string, stateName: string }, place?: { __typename?: 'Places', displayName: string } | null } | null } | null }> };

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: Array<{ __typename?: 'Restaurant', _id: string, status: RestaurantStatus, name: string, beverageCategory?: Array<BeverageCategory> | null, foodType?: Array<FoodType> | null, meatType?: MeatType | null, website?: string | null, category?: Array<RestaurantCategory> | null, type?: RestaurantType | null, address?: { __typename?: 'AddressInfo', addressLine1: string, addressLine2?: string | null, city: string, zipcode: number, state: { __typename?: 'StateData', stateId: string, stateName: string }, place?: { __typename?: 'Places', displayName: string } | null } | null, timezone?: { __typename?: 'TimezoneData', timezoneId: string, timezoneName: string } | null }> };

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

export type ChangeRestaurantStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ChangeRestaurantStatusMutation = { __typename?: 'Mutation', changeRestaurantStatus: boolean };

export type BlockAdminMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateStatus: PlatformStatus;
}>;


export type BlockAdminMutation = { __typename?: 'Mutation', blockAdmin: boolean };

export type AdminLogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminLogoutQuery = { __typename?: 'Query', adminLogout: boolean };

export type AdminUserDetailsVerificationMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminUserDetailsVerificationMutation = { __typename?: 'Mutation', adminUserDetailsVerification: boolean };

export type AdminUserDetailsRejectionMutationVariables = Exact<{
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type AdminUserDetailsRejectionMutation = { __typename?: 'Mutation', adminUserDetailsRejection: boolean };

export type GetUsersForTargetQueryVariables = Exact<{
  target: EmailCampaignTargetTypes;
}>;


export type GetUsersForTargetQuery = { __typename?: 'Query', getUsersForTarget: number };

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

export type GetAllStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStatesQuery = { __typename?: 'Query', getAllStates: Array<{ __typename?: 'State', _id: string, value: string, status: boolean, abbreviation?: string | null, createdAt: any, updatedAt: any }> };

export type UpdateStateStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UpdateStateStatusMutation = { __typename?: 'Mutation', updateStateStatus: boolean };

export type AddStateMutationVariables = Exact<{
  input: AddStateInput;
}>;


export type AddStateMutation = { __typename?: 'Mutation', addState: boolean };

export type GetAllTimezonesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTimezonesQuery = { __typename?: 'Query', getAllTimezones: Array<{ __typename?: 'Timezone', _id: string, value: string, status: boolean, gmtOffset: number, createdAt: any, updatedAt: any }> };

export type AddTimezoneMutationVariables = Exact<{
  input: AddTimezoneInput;
}>;


export type AddTimezoneMutation = { __typename?: 'Mutation', addTimezone: boolean };

export type UpdateTimezoneStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UpdateTimezoneStatusMutation = { __typename?: 'Mutation', updateTimezoneStatus: boolean };

export type AddCuisineMutationVariables = Exact<{
  input: AddCuisineInput;
}>;


export type AddCuisineMutation = { __typename?: 'Mutation', addCuisine: boolean };

export type UpdateCuisineStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UpdateCuisineStatusMutation = { __typename?: 'Mutation', updateCuisineStatus: boolean };

export type GetAllCuisinesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCuisinesQuery = { __typename?: 'Query', getAllCuisines: Array<{ __typename?: 'Cuisine', _id: string, value: string, status: boolean, description?: string | null, createdAt: any, updatedAt: any }> };

export type AddPermissionMutationVariables = Exact<{
  input: AddPermissionInput;
}>;


export type AddPermissionMutation = { __typename?: 'Mutation', addPermission: boolean };

export type UpdatePermissionPreselectMutationVariables = Exact<{
  id: Scalars['String']['input'];
  preselect: Array<UserRole> | UserRole;
}>;


export type UpdatePermissionPreselectMutation = { __typename?: 'Mutation', updatePermissionPreselect: boolean };

export type GetAllPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPermissionsQuery = { __typename?: 'Query', getAllPermissions: Array<{ __typename?: 'Permission', _id: string, type: PermissionTypeEnum, preselect: Array<UserRole>, isFunction: boolean, createdAt: any, updatedAt: any, createdBy: { __typename?: 'Admin', name: string }, updatedBy: { __typename?: 'Admin', name: string } }> };

export type AddConfigMutationVariables = Exact<{
  input: AddConfigInput;
}>;


export type AddConfigMutation = { __typename?: 'Mutation', addConfig: boolean };

export type UpdateConfigMutationVariables = Exact<{
  id: Scalars['String']['input'];
  value: Scalars['Float']['input'];
}>;


export type UpdateConfigMutation = { __typename?: 'Mutation', updateConfig: boolean };

export type GetAllConfigsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllConfigsQuery = { __typename?: 'Query', getAllConfigs: Array<{ __typename?: 'Config', _id: string, type: ConfigTypeEnum, value: number, createdAt: any, updatedAt: any, createdBy: { __typename?: 'Admin', name: string }, updatedBy: { __typename?: 'Admin', name: string } }> };

export type GetConfigQueryVariables = Exact<{
  type: ConfigTypeEnum;
}>;


export type GetConfigQuery = { __typename?: 'Query', getConfig: { __typename?: 'Config', _id: string, type: ConfigTypeEnum, value: number, createdAt: any, updatedAt: any, createdBy: { __typename?: 'Admin', name: string }, updatedBy: { __typename?: 'Admin', name: string } } };

export type AddItemOptionMutationVariables = Exact<{
  input: AddItemOptionInput;
}>;


export type AddItemOptionMutation = { __typename?: 'Mutation', addItemOption: boolean };

export type UpdateItemOptionMutationVariables = Exact<{
  input: UpdateItemOptionInput;
}>;


export type UpdateItemOptionMutation = { __typename?: 'Mutation', updateItemOption: boolean };

export type GetAllItemOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemOptionsQuery = { __typename?: 'Query', getAllItemOptions: Array<{ __typename?: 'ItemOption', _id: string, type: ItemOptionsEnum, displayName: string, desc: string, createdAt: any, updatedAt: any, createdBy: { __typename?: 'Admin', name: string }, updatedBy: { __typename?: 'Admin', name: string } }> };

export type GetWaitListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWaitListUsersQuery = { __typename?: 'Query', getWaitListUsers: Array<{ __typename?: 'WaitListUser', _id?: string | null, name: string, email: string, website: string, number: string, restaurantName: string, software: SoftWareEnum, createdAt?: any | null }> };


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
    phone
    createdAt
    updatedAt
    status
    firstName
    lastName
    businessInfo {
      businessName
      estimatedRevenue
      employeeSize
      businessType
      address {
        addressLine1
        state {
          stateId
          stateName
        }
        place {
          displayName
        }
        city
        zipcode
      }
    }
  }
}
    `;
export const GetAllRestaurantsDocument = gql`
    query GetAllRestaurants {
  getAllRestaurants {
    _id
    status
    name
    address {
      addressLine1
      addressLine2
      city
      state {
        stateId
        stateName
      }
      zipcode
      place {
        displayName
      }
    }
    timezone {
      timezoneId
      timezoneName
    }
    beverageCategory
    foodType
    meatType
    website
    category
    type
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
export const ChangeRestaurantStatusDocument = gql`
    mutation changeRestaurantStatus($id: String!) {
  changeRestaurantStatus(id: $id)
}
    `;
export const BlockAdminDocument = gql`
    mutation blockAdmin($id: String!, $updateStatus: PlatformStatus!) {
  blockAdmin(id: $id, updateStatus: $updateStatus)
}
    `;
export const AdminLogoutDocument = gql`
    query AdminLogout {
  adminLogout
}
    `;
export const AdminUserDetailsVerificationDocument = gql`
    mutation AdminUserDetailsVerification($id: String!) {
  adminUserDetailsVerification(id: $id)
}
    `;
export const AdminUserDetailsRejectionDocument = gql`
    mutation AdminUserDetailsRejection($content: String!, $id: String!) {
  adminUserDetailsRejection(content: $content, id: $id)
}
    `;
export const GetUsersForTargetDocument = gql`
    query GetUsersForTarget($target: EmailCampaignTargetTypes!) {
  getUsersForTarget(target: $target)
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
export const GetAllStatesDocument = gql`
    query GetAllStates {
  getAllStates {
    _id
    value
    status
    abbreviation
    createdAt
    updatedAt
    createdAt
  }
}
    `;
export const UpdateStateStatusDocument = gql`
    mutation updateStateStatus($id: String!) {
  updateStateStatus(id: $id)
}
    `;
export const AddStateDocument = gql`
    mutation addState($input: AddStateInput!) {
  addState(input: $input)
}
    `;
export const GetAllTimezonesDocument = gql`
    query GetAllTimezones {
  getAllTimezones {
    _id
    value
    status
    gmtOffset
    createdAt
    updatedAt
    createdAt
  }
}
    `;
export const AddTimezoneDocument = gql`
    mutation AddTimezone($input: AddTimezoneInput!) {
  addTimezone(input: $input)
}
    `;
export const UpdateTimezoneStatusDocument = gql`
    mutation updateTimezoneStatus($id: String!) {
  updateTimezoneStatus(id: $id)
}
    `;
export const AddCuisineDocument = gql`
    mutation AddCuisine($input: AddCuisineInput!) {
  addCuisine(input: $input)
}
    `;
export const UpdateCuisineStatusDocument = gql`
    mutation UpdateCuisineStatus($id: String!) {
  updateCuisineStatus(id: $id)
}
    `;
export const GetAllCuisinesDocument = gql`
    query getAllCuisines {
  getAllCuisines {
    _id
    value
    status
    description
    createdAt
    updatedAt
    createdAt
  }
}
    `;
export const AddPermissionDocument = gql`
    mutation AddPermission($input: AddPermissionInput!) {
  addPermission(input: $input)
}
    `;
export const UpdatePermissionPreselectDocument = gql`
    mutation UpdatePermissionPreselect($id: String!, $preselect: [UserRole!]!) {
  updatePermissionPreselect(preselect: $preselect, id: $id)
}
    `;
export const GetAllPermissionsDocument = gql`
    query GetAllPermissions {
  getAllPermissions {
    _id
    type
    preselect
    isFunction
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
export const AddConfigDocument = gql`
    mutation AddConfig($input: AddConfigInput!) {
  addConfig(input: $input)
}
    `;
export const UpdateConfigDocument = gql`
    mutation UpdateConfig($id: String!, $value: Float!) {
  updateConfig(id: $id, value: $value)
}
    `;
export const GetAllConfigsDocument = gql`
    query GetAllConfigs {
  getAllConfigs {
    _id
    type
    value
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
export const GetConfigDocument = gql`
    query GetConfig($type: ConfigTypeEnum!) {
  getConfig(type: $type) {
    _id
    type
    value
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
export const AddItemOptionDocument = gql`
    mutation AddItemOption($input: AddItemOptionInput!) {
  addItemOption(input: $input)
}
    `;
export const UpdateItemOptionDocument = gql`
    mutation UpdateItemOption($input: UpdateItemOptionInput!) {
  updateItemOption(input: $input)
}
    `;
export const GetAllItemOptionsDocument = gql`
    query GetAllItemOptions {
  getAllItemOptions {
    _id
    type
    displayName
    desc
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
    website
    number
    restaurantName
    software
    createdAt
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
    changeRestaurantStatus(variables: ChangeRestaurantStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChangeRestaurantStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeRestaurantStatusMutation>(ChangeRestaurantStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'changeRestaurantStatus', 'mutation', variables);
    },
    blockAdmin(variables: BlockAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BlockAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlockAdminMutation>(BlockAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'blockAdmin', 'mutation', variables);
    },
    AdminLogout(variables?: AdminLogoutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminLogoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminLogoutQuery>(AdminLogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminLogout', 'query', variables);
    },
    AdminUserDetailsVerification(variables: AdminUserDetailsVerificationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminUserDetailsVerificationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminUserDetailsVerificationMutation>(AdminUserDetailsVerificationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminUserDetailsVerification', 'mutation', variables);
    },
    AdminUserDetailsRejection(variables: AdminUserDetailsRejectionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminUserDetailsRejectionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminUserDetailsRejectionMutation>(AdminUserDetailsRejectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminUserDetailsRejection', 'mutation', variables);
    },
    GetUsersForTarget(variables: GetUsersForTargetQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUsersForTargetQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersForTargetQuery>(GetUsersForTargetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsersForTarget', 'query', variables);
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
    GetAllStates(variables?: GetAllStatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllStatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllStatesQuery>(GetAllStatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllStates', 'query', variables);
    },
    updateStateStatus(variables: UpdateStateStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateStateStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateStateStatusMutation>(UpdateStateStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateStateStatus', 'mutation', variables);
    },
    addState(variables: AddStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddStateMutation>(AddStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addState', 'mutation', variables);
    },
    GetAllTimezones(variables?: GetAllTimezonesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllTimezonesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllTimezonesQuery>(GetAllTimezonesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllTimezones', 'query', variables);
    },
    AddTimezone(variables: AddTimezoneMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddTimezoneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddTimezoneMutation>(AddTimezoneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddTimezone', 'mutation', variables);
    },
    updateTimezoneStatus(variables: UpdateTimezoneStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateTimezoneStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTimezoneStatusMutation>(UpdateTimezoneStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTimezoneStatus', 'mutation', variables);
    },
    AddCuisine(variables: AddCuisineMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddCuisineMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCuisineMutation>(AddCuisineDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddCuisine', 'mutation', variables);
    },
    UpdateCuisineStatus(variables: UpdateCuisineStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateCuisineStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCuisineStatusMutation>(UpdateCuisineStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateCuisineStatus', 'mutation', variables);
    },
    getAllCuisines(variables?: GetAllCuisinesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllCuisinesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCuisinesQuery>(GetAllCuisinesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllCuisines', 'query', variables);
    },
    AddPermission(variables: AddPermissionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddPermissionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddPermissionMutation>(AddPermissionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddPermission', 'mutation', variables);
    },
    UpdatePermissionPreselect(variables: UpdatePermissionPreselectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdatePermissionPreselectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePermissionPreselectMutation>(UpdatePermissionPreselectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdatePermissionPreselect', 'mutation', variables);
    },
    GetAllPermissions(variables?: GetAllPermissionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllPermissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllPermissionsQuery>(GetAllPermissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllPermissions', 'query', variables);
    },
    AddConfig(variables: AddConfigMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddConfigMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddConfigMutation>(AddConfigDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddConfig', 'mutation', variables);
    },
    UpdateConfig(variables: UpdateConfigMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateConfigMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateConfigMutation>(UpdateConfigDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateConfig', 'mutation', variables);
    },
    GetAllConfigs(variables?: GetAllConfigsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllConfigsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllConfigsQuery>(GetAllConfigsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllConfigs', 'query', variables);
    },
    GetConfig(variables: GetConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetConfigQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetConfigQuery>(GetConfigDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetConfig', 'query', variables);
    },
    AddItemOption(variables: AddItemOptionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddItemOptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddItemOptionMutation>(AddItemOptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddItemOption', 'mutation', variables);
    },
    UpdateItemOption(variables: UpdateItemOptionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateItemOptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateItemOptionMutation>(UpdateItemOptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateItemOption', 'mutation', variables);
    },
    GetAllItemOptions(variables?: GetAllItemOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllItemOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllItemOptionsQuery>(GetAllItemOptionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllItemOptions', 'query', variables);
    },
    GetWaitListUsers(variables?: GetWaitListUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetWaitListUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWaitListUsersQuery>(GetWaitListUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWaitListUsers', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;