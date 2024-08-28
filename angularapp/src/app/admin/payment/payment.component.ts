import { Component, OnInit } from '@angular/core';
// import { data } from 'jquery';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payments: any = []
  students: any = []
  listpayment: any = []
  /* 
    {
        paymentId: '1',
        userId: '2',
        status: 'Pending',
        totalAmount: '6000',
        paymentDate: 'Nov 25,2023',
        modeOfPayment: 'UPI',
      }, {
        paymentId: '1',
        userId: '2',
        status: 'Pending',
        totalAmount: '6000',
        paymentDate: 'Nov 25,2023',
        modeOfPayment: 'UPI',
      }
  */
  constructor(private toastService:ToastService,private enquiryService: EnquiryService, private userservice: UserService) {
    this.paymentFetch();
  }

  ngOnInit(): void {
  }

  paymentFetch(): void {
    this.enquiryService.getAllPayment().subscribe(
      (paymentsData) => {
        this.payments = paymentsData;
        this.userservice.getUser().subscribe(
          (studentsData) => {
            this.students = studentsData;
            this.payments.forEach((payment) => {
              var matchingStudent = this.students.find((student) => student.userId == payment.userId);
              console.log("flag ", matchingStudent);
              if (matchingStudent) {
                payment.userName = matchingStudent.userName;
              }
            });
            console.log('Combined data:', this.payments);
          }
        );
      }
    );
    this.toastService.showSuccess("Payment Details");
    setTimeout(()=>{},3000)
  }

}

// payment -> userid ->username

