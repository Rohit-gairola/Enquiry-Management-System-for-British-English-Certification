export interface User {
    userId: number;
    userName: string;
    emailID: string;
    password: string;
    mobileNumber?: number;
    userRole?: string;
  }