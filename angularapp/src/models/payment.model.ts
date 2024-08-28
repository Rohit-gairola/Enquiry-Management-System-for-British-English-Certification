
import { Student } from "./student.model";

export interface Payment {
    paymentID?: number;
    enquiryID: number;
    userId: number;
    amountPaid: number;
    paymentDate: Date;
    modeOfPayment: string;
    student?: Student;
  }