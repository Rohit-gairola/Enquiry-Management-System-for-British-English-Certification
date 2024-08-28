import { Component, OnInit } from '@angular/core';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-student-view-enquiries',
  templateUrl: './student-view-enquiries.component.html',
  styleUrls: ['./student-view-enquiries.component.css']
})
export class StudentViewEnquiriesComponent implements OnInit {
  showConfirmDeleteModal = false; // Initialize modal state to hidden
  selectedEnquiryID: any; // Store the ID of the enquiry to be deleted

  constructor(private enquiryService: EnquiryService) { }

  enquiries: any = [];

  ngOnInit(): void {
    this.viewEnquiries();
  }
  viewEnquiries() {
    this.enquiryService.getAllEnquiriesByAdmin().subscribe((data) => {
      var tmp = data;
      var tmpID = Number(localStorage.getItem('userId'));
      console.log("user ID from service ", tmpID);
      console.log(data);
  
      // Filter the data by userID, assuming it is a property of each object
      this.enquiries = data.filter((enquiry) => enquiry.userId === tmpID);
      console.log("filtered data", this.enquiries);
    });
  }
  


  showConfirmDelete(id: any) {
    this.showConfirmDeleteModal = true; // Show the modal
    this.selectedEnquiryID = id; // Store the enquiry ID for deletion
  }

  deleteEnquiry() {
    /*     // Confirmation check for user action
        if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
          return; // User canceled deletion
        }
     */
    this.enquiryService.deleteEnquiry(this.selectedEnquiryID).subscribe((response) => {
      console.log(response);
      this.showConfirmDeleteModal = false; // Hide the modal after successful deletion
      this.viewEnquiries(); // Refresh the enquiry list
    }, (err) => {
      console.error(err);
      // Handle any errors during deletion (optional: display error message to user)
    });
  }
}
