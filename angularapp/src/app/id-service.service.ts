import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class IdServiceService {
    private courseId: string = null;
    private EnquiryId: number = null;
    private studentId: number = null;

    setCourseId(id: string) {
        this.courseId = id;
    }

    getCourseId(): string {
        return this.courseId;
    }
    setEnquiryId(id: number) {
        this.EnquiryId = id;
    }

    getEnquiryId(): number {
        return this.EnquiryId;
    }
    getStudentId(): any {
        return this.studentId;
    }
    setStudentId(studentId: number): any {
        this.studentId = studentId;
    }
}
