import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });

    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // fit('Frontend_should be created course service', () => {
  //   expect(service).toBeTruthy();
  // });

  fit('Frontend_should get all courses by admin', () => {
    (service as any).getAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/api/course`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
  });

  fit('Frontend_should post a course by admin', () => {
    const mockCourseData = {
      courseId: 1,
      courseName: 'C++',
      description: 'This is a test Course.',
      duration: 'Sample Course',
      cost: 500,
    };


    (service as any).saveCourseByAdmin(mockCourseData).subscribe();

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/api/course`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeTruthy();

    // provide a mock response
    req.flush(mockCourseData);
  });

  fit('Frontend_should update a course by admin', () => {
    const courseId = 1;

    const updatedCourseData = {
      courseId: 1,
      courseName: 'Java', // Updated course name
      description: 'Updated description',
      duration: 'Updated duration',
      cost: 600, // Updated cost
    };

    (service as any).updateCourseByAdmin(courseId, updatedCourseData).subscribe();

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/api/course/${courseId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.has('Authorization')).toBeTruthy();

    // provide a mock response
    req.flush(updatedCourseData);
  });

  fit('Frontend_should delete a course by admin', () => {
    const courseId = 1;

    (service as any).deleteCourseByAdmin(courseId).subscribe();

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/api/course/${courseId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.has('Authorization')).toBeTruthy();

  });

  fit('Frontend_should get courses by student', () => {

    const expectedCourses = [
      {
        courseId: 1,
        courseName: 'C++',
        description: 'This is a test Course.',
        duration: 'Sample Course',
        cost: 500,
      },
    ];

    (service as any).getStudentCourses().subscribe((courses) => {
      expect(courses).toEqual(expectedCourses);
    });

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/api/student/course`);
    expect(req.request.method).toBe('GET');

    // provide a mock response
    req.flush(expectedCourses);
  });
});
