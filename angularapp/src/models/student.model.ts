import { Course } from "./course.model";
import { Enquiry } from "./enquiry.model";
import { Payment } from "./payment.model";
import { User } from "./user.model";

export interface Student {
    studentId: number;
    studentName: string;
    studentMobileNumber: string;
    enquiryCount:number;
    enquiries: Enquiry[];
    courses: Course[];
    payments: Payment[];
    user: User;
  }