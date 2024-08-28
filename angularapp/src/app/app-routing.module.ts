import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentHomePageComponent } from './student/student-home-page/student-home-page.component';
import { StudentViewCoursesComponent } from './student/student-view-courses/student-view-courses.component';
import { StudentViewEnquiriesComponent } from './student/student-view-enquiries/student-view-enquiries.component';
import { AddCourseComponent } from './admin/course/add-course/add-course.component';
import { ViewCourseComponent } from './admin/course/view-course/view-course.component';
import { ViewEnquiryComponent } from './admin/enquiry/view-enquiry/view-enquiry.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { StudentAddEnquiryComponent } from './student/student-add-enquiry/student-add-enquiry.component';
import { AuthGuard } from './services/auth.guard';
import { PagenotfoundComponent } from './error/pagenotfound/pagenotfound.component';
import { AccessdeniedpageComponent } from './error/accessdeniedpage/accessdeniedpage.component';
import { AdminViewStudentComponent } from './admin/students/admin-view-student/admin-view-student.component';
import { StudentAddPaymentComponent } from './student/student-add-payment/student-add-payment.component';
//import { StudentViewPaymentsComponent } from './student/student-view-payments/student-view-payments.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminHomePage', component: AdminHomePageComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: 'AdminAddCourse', component: AddCourseComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: 'AdminViewCourse', component: ViewCourseComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: 'AdminViewEnquiry', component: ViewEnquiryComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: "AdminPayment", component: PaymentComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: "studentDashboard", component: StudentDashboardComponent, canActivate: [AuthGuard], data: { allowedRole: 'Student' } },
  { path: "studentHomePage", component: StudentHomePageComponent, canActivate: [AuthGuard], data: { allowedRole: 'Student' } },
  { path: "studentViewCourses", component: StudentViewCoursesComponent, canActivate: [AuthGuard], data: { allowedRole: 'Student' } },
  { path: 'studentAddEnquiry', component: StudentAddEnquiryComponent, canActivate: [AuthGuard], data: { allowedRole: 'Student' } },
  { path: "studentViewEnquiries", component: StudentViewEnquiriesComponent, canActivate: [AuthGuard], data: { allowedRole: 'Student' } },
  { path: "viewStudent", component: AdminViewStudentComponent, canActivate: [AuthGuard], data: { allowedRole: 'Admin' } },
  { path: "addpayment", component: StudentAddPaymentComponent, canActivate: [AuthGuard], data: { allowedRole: 'Student' } },
  { path: 'adpc', component: AccessdeniedpageComponent },
  //{path: 'studentViewPayments', component:StudentViewPaymentsComponent, canActivate: [AuthGuard], data: {allowedRole: 'Student'}},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }





