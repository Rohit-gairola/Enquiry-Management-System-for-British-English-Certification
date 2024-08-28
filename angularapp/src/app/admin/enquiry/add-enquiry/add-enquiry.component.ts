import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.css']
})
export class AddEnquiryComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  
  this.toastService.showSuccess("Enquiry Details");
  setTimeout(()=>{},3000)
  }
}
