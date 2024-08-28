export interface Enquiry {
    enquiryID?: number;
    enquiryDate?: Date;
    userId: number;
    title: string;
    description: string;
    emailID: string;
    enquiryType: string;
    courseID: number;
    enquiryStatus?: string;
    adminResponse?: string;
  }