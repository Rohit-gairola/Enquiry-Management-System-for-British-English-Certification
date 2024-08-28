import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnquiryService } from './enquiry.service';


describe('EnquiryService', () => {
  let service: EnquiryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnquiryService],
    });

    service = TestBed.inject(EnquiryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('Frontend_should get all enquiries by admin', () => {

    (service as any).getAllEnquiriesByAdmin().subscribe((enquiries) => {
      expect(enquiries).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/enquiry`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTruthy();

  });

  fit('Frontend_should get an enquiry by ID admin', () => {
    const enquiryId = 1;

    (service as any).getEnquiryByAdmin(enquiryId).subscribe((enquiry) => {
      expect(enquiry).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/enquiry/${enquiryId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTruthy();

  });

  fit('Frontend_should get enquiries by user', () => {
    const userId = 1;
    
    (service as any).getEnquiriesByUser(userId).subscribe((enquiries) => {
      expect(enquiries).toBeTruthy();
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/api/user/${userId}`);
    expect(req.request.method).toBe('GET');
  });
});
