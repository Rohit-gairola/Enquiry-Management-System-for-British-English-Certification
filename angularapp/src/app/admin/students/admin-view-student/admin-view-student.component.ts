import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-admin-view-student',
  templateUrl: './admin-view-student.component.html',
  styleUrls: ['./admin-view-student.component.css']
})
export class AdminViewStudentComponent implements OnInit {
  students: any = [];

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getStudent(); 
  }

  getStudent(): void {
    this.userService.getUser().subscribe(
      (data) => {
        // Filter out students
        this.students = data?.filter((user) => user.userRole.toLowerCase() == 'student');
      }
    );
    this.toastService.showSuccess("Student Details");
    setTimeout(()=>{},3000)
  }
}
