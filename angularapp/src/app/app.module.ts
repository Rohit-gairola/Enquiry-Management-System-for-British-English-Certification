import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentHomePageComponent } from './student/student-home-page/student-home-page.component';
import { StudentViewCoursesComponent } from './student/student-view-courses/student-view-courses.component';
import { StudentViewEnquiriesComponent } from './student/student-view-enquiries/student-view-enquiries.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { AddCourseComponent } from './admin/course/add-course/add-course.component';
import { ViewCourseComponent } from './admin/course/view-course/view-course.component';
import { ViewEnquiryComponent } from './admin/enquiry/view-enquiry/view-enquiry.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { StudentAddEnquiryComponent } from './student/student-add-enquiry/student-add-enquiry.component';
import { StudentAddPaymentComponent } from './student/student-add-payment/student-add-payment.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
import { PagenotfoundComponent } from './error/pagenotfound/pagenotfound.component';
import { AccessdeniedpageComponent } from './error/accessdeniedpage/accessdeniedpage.component';
import { AdminViewStudentComponent } from './admin/students/admin-view-student/admin-view-student.component';
import { RegistrationComponent } from './components/registration/registration.component';
//import { StudentViewPaymentsComponent } from './student-view-payments/student-view-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashboardComponent,
    NavbarComponent,
    StudentViewCoursesComponent,
    StudentViewEnquiriesComponent,
    StudentDashboardComponent,
    StudentHomePageComponent,
    AdminHomePageComponent,
    AddCourseComponent,
    ViewCourseComponent,
    ViewEnquiryComponent,
    PaymentComponent,
    StudentAddEnquiryComponent,
    StudentAddPaymentComponent,
    PagenotfoundComponent,
    AccessdeniedpageComponent,
    AdminViewStudentComponent,
    RegistrationComponent
  ],
  imports: [BrowserModule, FormsModule,AppRoutingModule, HttpClientModule,BrowserAnimationsModule],
  providers: [
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
