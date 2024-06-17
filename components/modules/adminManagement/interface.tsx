interface Admin {
  _id: string;
  name: string;
  email: string;
  type: string; // Adjust the type as necessary, such as 'superAdmin', 'admin', etc.
  numberOfResetPassword: number;
  createdAt: string;
  updatedAt: string;
}
