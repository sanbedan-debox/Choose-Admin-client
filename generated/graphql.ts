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
  desc: MasterCommonInput;
  name: MasterCommonInput;
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
  applySalesTax: Scalars['Boolean']['input'];
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc?: InputMaybe<MasterCommonInput>;
  hasNuts: Scalars['Boolean']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isGlutenFree: Scalars['Boolean']['input'];
  isHalal: Scalars['Boolean']['input'];
  isSpicy: Scalars['Boolean']['input'];
  isVegan: Scalars['Boolean']['input'];
  name: MasterCommonInput;
  popularItem: Scalars['Boolean']['input'];
  price: MasterCommonInputNumber;
  status: StatusEnum;
  upSellItem: Scalars['Boolean']['input'];
};

export type AddMenuInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  name: MasterCommonInput;
  taxRateId?: InputMaybe<Scalars['String']['input']>;
  type: MenuTypeEnum;
};

export type AddModifierGroupInput = {
  maxSelections: MasterCommonInputNumber;
  name: MasterCommonInput;
  optional: Scalars['Boolean']['input'];
  pricingType: PriceTypeEnum;
};

export type AddModifierInput = {
  name: MasterCommonInput;
  price: MasterCommonInputNumber;
};

export type AddRestaurantInput = {
  address: AddressInfoInput;
  availability: Array<AvailabilityInput>;
  brandingLogo?: InputMaybe<Scalars['String']['input']>;
  locationName: MasterCommonInput;
  name: MasterCommonInput;
  socialInfo?: InputMaybe<SocialInfoInput>;
  timezone: Scalars['String']['input'];
};

export type AddStateInput = {
  abbreviation: Scalars['String']['input'];
  value: Scalars['String']['input'];
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
  addressLine1: MasterCommon;
  addressLine2?: Maybe<MasterCommon>;
  city: MasterCommon;
  coordinate?: Maybe<LocationCommon>;
  place?: Maybe<Places>;
  postcode: MasterCommon;
  state: MasterCommon;
};

export type AddressInfoInput = {
  addressLine1: MasterCommonInput;
  addressLine2?: InputMaybe<MasterCommonInput>;
  city: MasterCommonInput;
  coordinate: LocationCommonInput;
  place: PlaceInput;
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
  desc: MasterCommon;
  items: Array<ItemInfo>;
  menu: Menu;
  name: MasterCommon;
  restaurantId: Restaurant;
  status: StatusEnum;
  upSellCategories?: Maybe<Array<Category>>;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type CategoryGroupInput = {
  categoryId: Scalars['String']['input'];
  itemIds: Array<Scalars['String']['input']>;
};

export type CategoryInfo = {
  __typename?: 'CategoryInfo';
  _id: Category;
  name?: Maybe<MasterCommon>;
  status: StatusEnum;
};

/** ConnectionStatusEnum enum type  */
export enum ConnectionStatusEnum {
  Connected = 'Connected',
  Error = 'Error',
  Expired = 'Expired',
  NotConnected = 'NotConnected'
}

export type CreateMenuFullInput = {
  category: Array<CategoryGroupInput>;
  menu: CreateMenuInput;
};

export type CreateMenuInput = {
  availability?: InputMaybe<Array<AvailabilityInput>>;
  name: MasterCommonInput;
  taxRateId?: InputMaybe<Scalars['String']['input']>;
  type: MenuTypeEnum;
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
  applySalesTax: Scalars['Boolean']['output'];
  availability?: Maybe<Array<Availability>>;
  category: Category;
  createdAt: Scalars['DateTimeISO']['output'];
  desc: MasterCommon;
  hasNuts: Scalars['Boolean']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isGlutenFree: Scalars['Boolean']['output'];
  isHalal: Scalars['Boolean']['output'];
  isSpicy: Scalars['Boolean']['output'];
  isVegan: Scalars['Boolean']['output'];
  modifierGroup: Array<ModifierGroupInfo>;
  name: MasterCommon;
  popularItem: Scalars['Boolean']['output'];
  price: MasterCommonNumber;
  restaurantId: Restaurant;
  status: StatusEnum;
  upSellItem: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type ItemInfo = {
  __typename?: 'ItemInfo';
  _id: Item;
  name?: Maybe<MasterCommon>;
  price: MasterCommonNumber;
  status: StatusEnum;
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
  name: MasterCommon;
  restaurantId: Restaurant;
  status: StatusEnum;
  taxes: TaxRateInfo;
  type: MenuTypeEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type MenuInfo = {
  __typename?: 'MenuInfo';
  _id: Menu;
  name?: Maybe<MasterCommon>;
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
  name: MasterCommon;
  price: MasterCommonNumber;
  restaurantId: Restaurant;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type ModifierGroup = {
  __typename?: 'ModifierGroup';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  maxSelections: MasterCommonNumber;
  modifiers: Array<ModifierInfo>;
  name: MasterCommon;
  optional: Scalars['Boolean']['output'];
  pricingType: PriceTypeEnum;
  restaurantId: Restaurant;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type ModifierGroupInfo = {
  __typename?: 'ModifierGroupInfo';
  _id: Scalars['ID']['output'];
  name: MasterCommon;
  pricingType: PriceTypeEnum;
};

export type ModifierInfo = {
  __typename?: 'ModifierInfo';
  _id: Scalars['ID']['output'];
  name: MasterCommon;
  price: MasterCommonNumber;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean']['output'];
  addCategory: Scalars['Boolean']['output'];
  addCategoryToMenu: Scalars['Boolean']['output'];
  addCuisine: Scalars['Boolean']['output'];
  addItem: Scalars['Boolean']['output'];
  addItemToCategory: Scalars['Boolean']['output'];
  addMenu: Scalars['Boolean']['output'];
  addModifier: Scalars['Boolean']['output'];
  addModifierGroup: Scalars['Boolean']['output'];
  addModifierGroupToItem: Scalars['Boolean']['output'];
  addModifierToModifierGroup: Scalars['Boolean']['output'];
  addRestaurant: Scalars['Boolean']['output'];
  addState: Scalars['Boolean']['output'];
  addTaxRate: Scalars['Boolean']['output'];
  addTaxRateInRestaurant: Scalars['Boolean']['output'];
  addTimezone: Scalars['Boolean']['output'];
  addUser: Scalars['String']['output'];
  addWaitListUser: Scalars['Boolean']['output'];
  adminUserDetailsRejection: Scalars['Boolean']['output'];
  adminUserDetailsVerification: Scalars['Boolean']['output'];
  blockAdmin: Scalars['Boolean']['output'];
  changeCategoryStatus: Scalars['Boolean']['output'];
  changeItemStatus: Scalars['Boolean']['output'];
  changeMenuStatus: Scalars['Boolean']['output'];
  changeRestaurantStatus: Scalars['Boolean']['output'];
  changeRole: Scalars['Boolean']['output'];
  changeUserStatus: Scalars['Boolean']['output'];
  completeUserOnboarding: Scalars['Boolean']['output'];
  createEmailCampaign: Scalars['Boolean']['output'];
  createEmailTemplate: Scalars['Boolean']['output'];
  createMenuFull: Scalars['Boolean']['output'];
  deleteAdmin: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  deleteEmailTemplate: Scalars['Boolean']['output'];
  deleteItem: Scalars['Boolean']['output'];
  deleteMenu: Scalars['Boolean']['output'];
  deleteModifier: Scalars['Boolean']['output'];
  deleteTaxRate: Scalars['Boolean']['output'];
  deleteTaxRateFromRestaurant: Scalars['Boolean']['output'];
  getItemByCategory: Item;
  removeCategoryFromMenu: Scalars['Boolean']['output'];
  removeItemFromCategory: Scalars['Boolean']['output'];
  removeModifierFromModifierGroup: Scalars['Boolean']['output'];
  removeModifierGroup: Scalars['Boolean']['output'];
  removeModifierGroupFromItem: Scalars['Boolean']['output'];
  removeRestaurant: Scalars['Boolean']['output'];
  restaurantOnboarding: Scalars['String']['output'];
  sendTestEmails: Scalars['Boolean']['output'];
  updateCategory: Scalars['Boolean']['output'];
  updateCuisineStatus: Scalars['Boolean']['output'];
  updateItem: Scalars['Boolean']['output'];
  updateMenu: Scalars['Boolean']['output'];
  updateModifier: Scalars['Boolean']['output'];
  updateModifierGroup: Scalars['Boolean']['output'];
  updateRestaurant: Scalars['Boolean']['output'];
  updateStateStatus: Scalars['Boolean']['output'];
  updateTaxRate: Scalars['Boolean']['output'];
  updateTimezoneStatus: Scalars['Boolean']['output'];
  updateUserOnboarding: Scalars['Boolean']['output'];
  updateUserProfile: Scalars['Boolean']['output'];
  verifyUserDetails: Scalars['Boolean']['output'];
};


export type MutationAddAdminArgs = {
  input: AddAdminInput;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddCategoryToMenuArgs = {
  categoryId: Scalars['String']['input'];
  menuId: Scalars['String']['input'];
};


export type MutationAddCuisineArgs = {
  input: AddCuisineInput;
};


export type MutationAddItemArgs = {
  input: AddItemInput;
};


export type MutationAddItemToCategoryArgs = {
  categoryId: Scalars['String']['input'];
  itemId: Scalars['String']['input'];
};


export type MutationAddMenuArgs = {
  input: AddMenuInput;
};


export type MutationAddModifierArgs = {
  input: AddModifierInput;
};


export type MutationAddModifierGroupArgs = {
  input: AddModifierGroupInput;
};


export type MutationAddModifierGroupToItemArgs = {
  itemId: Scalars['String']['input'];
  modifierGroupId: Scalars['String']['input'];
};


export type MutationAddModifierToModifierGroupArgs = {
  modifierGroupId: Scalars['String']['input'];
  modifierId: Scalars['String']['input'];
};


export type MutationAddRestaurantArgs = {
  input: AddRestaurantInput;
};


export type MutationAddStateArgs = {
  input: AddStateInput;
};


export type MutationAddTaxRateArgs = {
  input: TaxRateInput;
};


export type MutationAddTaxRateInRestaurantArgs = {
  restaurantId: Scalars['String']['input'];
  taxRateId: Scalars['String']['input'];
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


export type MutationChangeCategoryStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeItemStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeMenuStatusArgs = {
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


export type MutationCreateMenuFullArgs = {
  input: CreateMenuFullInput;
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


export type MutationDeleteTaxRateArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaxRateFromRestaurantArgs = {
  restaurantId: Scalars['String']['input'];
  taxId: Scalars['String']['input'];
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


export type MutationRestaurantOnboardingArgs = {
  input: UpdateRestaurantDetailsInput;
};


export type MutationSendTestEmailsArgs = {
  input: TestEmailInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateCuisineStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
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


export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};


export type MutationUpdateStateStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateTaxRateArgs = {
  input: UpdateTaxRateInput;
};


export type MutationUpdateTimezoneStatusArgs = {
  id: Scalars['String']['input'];
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

export type PaginatedFilter = {
  field: Scalars['String']['input'];
  operator: FilterOperatorsEnum;
  value?: InputMaybe<Scalars['String']['input']>;
};

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
  emailOtpVerification: Scalars['Boolean']['output'];
  generateOtpForEmailVerification: Scalars['String']['output'];
  generateOtpForLogin: Scalars['String']['output'];
  generateOtpForNumberVerification: Scalars['String']['output'];
  getActiveCuisines: Array<Cuisine>;
  getActiveStates: Array<State>;
  getActiveTimezones: Array<Timezone>;
  getAdmins: Array<Admin>;
  getAllCuisines: Array<Cuisine>;
  getAllEmailCampaigns: Array<EmailCampaignsObject>;
  getAllEmailTemplates: Array<EmailTemplatesObject>;
  getAllMenus: Array<Menu>;
  getAllRestaurantUsers: Array<User>;
  getAllRestaurants: Array<Restaurant>;
  getAllStates: Array<State>;
  getAllTimezones: Array<Timezone>;
  getCategories: Array<Category>;
  getCategory: Category;
  getCategoryByMenu: Category;
  getItem: Item;
  getItems: Array<Item>;
  getMenu: Menu;
  getMenusByType: Array<Menu>;
  getModifier: Modifier;
  getModifierGroup: ModifierGroup;
  getModifierGroups: Array<ModifierGroup>;
  getModifiers: Array<Modifier>;
  getPlaceDetails?: Maybe<PlaceDetail>;
  getPlacesList: Array<Places>;
  getRestaurantDetails: Restaurant;
  getRestaurantOnboardingData: Restaurant;
  getTaxRate: TaxRate;
  getTaxRates: Array<TaxRate>;
  getUserOnboardingDetails: User;
  getUserRestaurants: Array<Restaurant>;
  getUsersForTarget: Scalars['Float']['output'];
  getWaitListUsers: Array<WaitListUser>;
  logout: Scalars['Boolean']['output'];
  me: Admin;
  meUser: User;
  mobileNumberOtpVerification: Scalars['Boolean']['output'];
  resetPasswordAdmin: Scalars['Boolean']['output'];
  setRestaurantIdAsCookie: Scalars['Boolean']['output'];
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


export type QueryGetAllEmailTemplatesArgs = {
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


export type QueryGetItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetItemsArgs = {
  filter?: InputMaybe<PaginatedFilter>;
  page?: Scalars['Float']['input'];
};


export type QueryGetMenuArgs = {
  id: Scalars['String']['input'];
  type: MenuTypeEnum;
};


export type QueryGetMenusByTypeArgs = {
  id: Scalars['String']['input'];
  type: MenuTypeEnum;
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


export type QueryGetTaxRateArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUsersForTargetArgs = {
  target: EmailCampaignTargetTypes;
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


export type QuerySetRestaurantIdAsCookieArgs = {
  id: Scalars['String']['input'];
};


export type QueryVerifyOtpForLoginArgs = {
  input: Scalars['String']['input'];
  key: Scalars['String']['input'];
  otp: Scalars['String']['input'];
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
  dineInCapacity?: Maybe<MasterCommonNumber>;
  foodType?: Maybe<Array<FoodType>>;
  integrations?: Maybe<Array<Integration>>;
  meatType?: Maybe<MeatType>;
  menus?: Maybe<Array<MenuInfo>>;
  name: MasterCommon;
  socialInfo?: Maybe<SocialInfo>;
  status: RestaurantStatus;
  taxRates?: Maybe<Array<TaxRateInfo>>;
  timezone?: Maybe<Scalars['String']['output']>;
  type?: Maybe<RestaurantType>;
  updatedAt: Scalars['DateTimeISO']['output'];
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
  _id: Scalars['ID']['output'];
  city?: Maybe<MasterCommon>;
  name: MasterCommon;
  status: RestaurantStatus;
};

/** Restaurant status enum. */
export enum RestaurantStatus {
  Active = 'active',
  Blocked = 'blocked',
  BlockedBySystem = 'blockedBySystem',
  Inactive = 'inactive'
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
  user: User;
};

export type TaxRateInfo = {
  __typename?: 'TaxRateInfo';
  _id: Scalars['ID']['output'];
  default: Scalars['Boolean']['output'];
  name: MasterCommon;
  salesTax: MasterCommonNumber;
};

export type TaxRateInput = {
  default: Scalars['Boolean']['input'];
  name: MasterCommonInput;
  salesTax: MasterCommonInputNumber;
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

export type UpdateCategoryInput = {
  _id: Scalars['String']['input'];
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc?: InputMaybe<MasterCommonInput>;
  name?: InputMaybe<MasterCommonInput>;
};

export type UpdateItemInput = {
  _id: Scalars['String']['input'];
  applySalesTax?: InputMaybe<Scalars['Boolean']['input']>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  desc?: InputMaybe<MasterCommonInput>;
  hasNuts?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isGlutenFree?: InputMaybe<Scalars['Boolean']['input']>;
  isHalal?: InputMaybe<Scalars['Boolean']['input']>;
  isSpicy?: InputMaybe<Scalars['Boolean']['input']>;
  isVegan?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<MasterCommonInput>;
  popularItem?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<MasterCommonInputNumber>;
  status?: InputMaybe<StatusEnum>;
  upSellItem?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateMenuInput = {
  _id: Scalars['String']['input'];
  availability?: InputMaybe<Array<AvailabilityInput>>;
  name?: InputMaybe<MasterCommonInput>;
  taxes?: InputMaybe<TaxRateInput>;
  type?: InputMaybe<MenuTypeEnum>;
};

export type UpdateModifierGroupInput = {
  _id: Scalars['String']['input'];
  maxSelections: MasterCommonInputNumber;
  name: MasterCommonInput;
  optional: Scalars['Boolean']['input'];
  pricingType: PriceTypeEnum;
};

export type UpdateModifierInput = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<MasterCommonInput>;
  price?: InputMaybe<MasterCommonInputNumber>;
};

export type UpdateRestaurantDetailsInput = {
  address?: InputMaybe<AddressInfoInput>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  beverageCategory?: InputMaybe<Array<BeverageCategory>>;
  brandingLogo?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Array<RestaurantCategory>>;
  dineInCapacity?: InputMaybe<MasterCommonInputNumber>;
  foodType?: InputMaybe<Array<FoodType>>;
  meatType?: InputMaybe<MeatType>;
  name?: InputMaybe<MasterCommonInput>;
  socialInfo?: InputMaybe<SocialInfoInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<RestaurantType>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRestaurantInput = {
  address?: InputMaybe<AddressInfoInput>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  brandingLogo?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<MasterCommonInput>;
  socialInfo?: InputMaybe<SocialInfoInput>;
  status: RestaurantStatus;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaxRateInput = {
  _id: Scalars['String']['input'];
  default?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<MasterCommonInput>;
  salesTax?: InputMaybe<MasterCommonInputNumber>;
};

export type UpdateUserOnboardingInput = {
  address?: InputMaybe<AddressInfoInput>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<BusinessTypeEnum>;
  dob?: InputMaybe<Scalars['DateTimeISO']['input']>;
  ein?: InputMaybe<Scalars['String']['input']>;
  employeeSize?: InputMaybe<StaffCountEnum>;
  establishedAt?: InputMaybe<Scalars['String']['input']>;
  estimatedRevenue?: InputMaybe<EstimatedRevenueEnum>;
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

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  accessHistory?: Maybe<Array<AccessHistory>>;
  accountPreferences?: Maybe<AccountPreference>;
  address?: Maybe<AddressInfo>;
  businessName?: Maybe<Scalars['String']['output']>;
  businessType?: Maybe<BusinessTypeEnum>;
  createdAt: Scalars['DateTimeISO']['output'];
  dob?: Maybe<Scalars['DateTimeISO']['output']>;
  ein?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  employeeSize?: Maybe<StaffCountEnum>;
  establishedAt?: Maybe<Scalars['String']['output']>;
  estimatedRevenue?: Maybe<EstimatedRevenueEnum>;
  firstName: Scalars['String']['output'];
  lastLoggedIn: Scalars['DateTimeISO']['output'];
  lastLoggedOut: Scalars['DateTimeISO']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  restaurants?: Maybe<Array<RestaurantInfo>>;
  status: UserStatus;
  statusUpdatedBy?: Maybe<Admin>;
  updatedAt: Scalars['DateTimeISO']['output'];
  verificationRejections?: Maybe<Array<RejectRecord>>;
};

/** UserStatus type enum  */
export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked',
  InternalVerificationPending = 'internalVerificationPending',
  OnboardingPending = 'onboardingPending',
  PaymentPending = 'paymentPending',
  RestaurantOnboardingPending = 'restaurantOnboardingPending'
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


export type GetAllRestaurantUsersQuery = { __typename?: 'Query', getAllRestaurantUsers: Array<{ __typename?: 'User', _id: string, email: string, phone: string, businessName?: string | null, businessType?: BusinessTypeEnum | null, ein?: string | null, establishedAt?: string | null, createdAt: any, updatedAt: any, status: UserStatus, firstName: string, lastName: string, address?: { __typename?: 'AddressInfo', addressLine1: { __typename?: 'MasterCommon', value: string }, addressLine2?: { __typename?: 'MasterCommon', value: string } | null, coordinate?: { __typename?: 'LocationCommon', coordinates: Array<number> } | null, city: { __typename?: 'MasterCommon', value: string }, state: { __typename?: 'MasterCommon', value: string }, postcode: { __typename?: 'MasterCommon', value: string } } | null, restaurants?: Array<{ __typename?: 'RestaurantInfo', _id: string }> | null }> };

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: Array<{ __typename?: 'Restaurant', _id: string, status: RestaurantStatus, beverageCategory?: Array<BeverageCategory> | null, foodType?: Array<FoodType> | null, meatType?: MeatType | null, website?: string | null, category?: Array<RestaurantCategory> | null, type?: RestaurantType | null, name: { __typename?: 'MasterCommon', value: string }, address?: { __typename?: 'AddressInfo', addressLine1: { __typename?: 'MasterCommon', value: string }, addressLine2?: { __typename?: 'MasterCommon', value: string } | null, city: { __typename?: 'MasterCommon', value: string }, state: { __typename?: 'MasterCommon', value: string }, postcode: { __typename?: 'MasterCommon', value: string }, place?: { __typename?: 'Places', displayName: string } | null } | null }> };

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
    businessName
    businessType
    ein
    address {
      addressLine1 {
        value
      }
      addressLine2 {
        value
      }
      coordinate {
        coordinates
      }
      city {
        value
      }
      state {
        value
      }
      postcode {
        value
      }
    }
    establishedAt
    restaurants {
      _id
    }
    createdAt
    updatedAt
    status
    firstName
    lastName
  }
}
    `;
export const GetAllRestaurantsDocument = gql`
    query GetAllRestaurants {
  getAllRestaurants {
    _id
    status
    name {
      value
    }
    address {
      addressLine1 {
        value
      }
      addressLine2 {
        value
      }
      city {
        value
      }
      state {
        value
      }
      postcode {
        value
      }
      place {
        displayName
      }
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
    GetWaitListUsers(variables?: GetWaitListUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetWaitListUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWaitListUsersQuery>(GetWaitListUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWaitListUsers', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;