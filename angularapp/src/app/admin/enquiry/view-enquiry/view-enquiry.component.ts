import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { Enquiry } from 'src/models/enquiry.model'; // Assuming enquiry.model.ts contains the Enquiry interface
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-view-enquiry',
  templateUrl: './view-enquiry.component.html',
  styleUrls: ['./view-enquiry.component.css']
})
export class ViewEnquiryComponent implements OnInit {

  //custom join list enquiry and course for display : review by manish sir 
  enquiryList: any = [];

  //creating custom enquiryDetails 
  enquiryDetails: any = {
    enquiryID: 0,
    enquiryDate:"",
    userId: 0,
    courseName: '',
    Description: '',
    Email: '',
    courseID:0,
    Title: '',
    EnquiryStatus: '',
    EnquiryType: ''
  }
  courses: any = []
  selectedEnquiry: any = {};
  // selectedEnquiry: any = '';
  deleteToggle: boolean = false;
  replyText: string = '';
  showReplyBox: boolean = false;

  constructor(private enquiryService: EnquiryService, private courseService: CourseService, private toastService:ToastService) { }

  ngOnInit(): void {
    this.listEnquiry();
    this.toastService.showSuccess("Enquiry Details");
    setTimeout(()=>{},3000)
  }
    
  async listEnquiry(): Promise<void> { // using async/await for clarity
    try {
      // Fetch courses first
      this.courses = await this.courseService.getAllCourses().toPromise();

      // Fetch enquiries with knowledge of courses
      const enquiries = await this.enquiryService.getAllEnquiriesByAdmin().toPromise();

      // Map enquiries and assign course names
      this.enquiryList = enquiries.map(edata => {
        const enquiryDetails = {
          enquiryID: edata.enquiryID,
          enquiryDate:edata.enquiryDate,
          userId: edata.userId,
          courseName: '',
          courseID: edata.courseID,
          Description: edata.description,
          Email: edata.emailID,
          Title: edata.title,
          EnquiryStatus: edata.enquiryStatus,
          EnquiryType: edata.enquiryType
        };

        this.courses.forEach(c => {
          if (c.courseID === edata.courseID) {
            enquiryDetails.courseName = c.courseName;
          }
        });

        return enquiryDetails;
      });
    } catch (error) {
      // Handle errors appropriately, e.g., display error messages
      console.error('Error fetching data:', error);
    }
  }

  // Function to handle changing the status of an enquiry (replace with your actual implementation)
  changeStatus(enquiry: Enquiry): void {
    console.log(`Changing status of enquiry for "${enquiry.emailID}" to "${enquiry.enquiryStatus}"`);
    // Consider error handling and informing the user of the outcome
  }

  submitReply(): any {
    console.log(this.replyText);
    console.log(this.selectedEnquiry);
    /*   enquiryDetails: any = {
    enquiryID: 0,
    userId: 0,
    courseName: '',
    Description: '',
    Email: '',
    Title: '',
    EnquiryType: ''
  } */
    var updateEnquiry: any = {
      enquiryID: this.selectedEnquiry.enquiryID,
      enquiryDate: this.selectedEnquiry.enquiryDate,
      userId: this.selectedEnquiry.userId,
      title: this.selectedEnquiry.Title,
      description: this.selectedEnquiry.Description,
      emailID: this.selectedEnquiry.Email,
      enquiryType: this.selectedEnquiry.EnquiryType,
      courseID: this.selectedEnquiry.courseID,
      enquiryStatus: 'responded',
      adminResponse: this.replyText
    }
    console.log(updateEnquiry);
    
    this.enquiryService.updateEnquiry(this.selectedEnquiry.enquiryID, updateEnquiry).subscribe(
      (response)=>{
        this.listEnquiry();
        this.showReplyBox = false;
      }
    );
    this.toastService.showSuccess("Enquiry Replied");
    setTimeout(()=>{},3000)
  }


  // Function to close the reply modal
  closeModal(): void {
    const editEnquiryModal = document.getElementById('editEnquiryModal');
    if (editEnquiryModal) {
      editEnquiryModal.classList.remove('show'); // Assuming Bootstrap is used
    }
  }

  // Function to handle showing the confirmation dialog for deletion
  showConfirmDelete(enquiry: Enquiry): void {
    this.selectedEnquiry = enquiry;
    this.deleteToggle = !this.deleteToggle;
  }

  // Function to delete an enquiry (replace with your actual implementation)
  deleteEnquiry(enquiry: Enquiry): void {
    console.log('Deleting enquiry:', enquiry);
    this.enquiryService.deleteEnquiry(this.selectedEnquiry.enquiryID).subscribe(
      (response) => {
        this.listEnquiry();
        this.deleteToggle = false;
      }
    )
    this.toastService.showSuccess("Enquiry Deleted");
    setTimeout(()=>{},3000)
    // Consider using immutable data practices if applicable in your project
    // const updatedEnquirys = this.enquirys.filter(c => c !== enquiry);
    // this.enquirys = updatedEnquirys;
    // Consider error handling and informing the user of the outcome
  }

  // Function to handle opening the reply modal
  toggleReplyBox(enquiry: Enquiry) {
    this.showReplyBox = true;
    this.selectedEnquiry = enquiry; // Assign the selected enquiry for display in the modal
  }
}
