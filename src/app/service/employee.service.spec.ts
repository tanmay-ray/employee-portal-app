import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { environment } from 'src/environments/environment';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to fetch employees', () => {
    const url = `${baseUrl}/employee-service/employees`;
    service.getEmployees().subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('should send a POST request register employee', () => {
    const url = `${baseUrl}/employee-service/employee`;
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      department: 'IT',
      dob: new Date()
    };
    service.register(employee).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(employee);
  });
});
