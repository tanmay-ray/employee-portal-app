import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

import { EmployeeListComponent } from './employee-list.component';

class EmployeeServiceMock {
  getEmployees() { return of(Array(10).fill(mockEmployee)); }
}

const mockEmployee: Employee = {
  firstName: 'John',
  lastName: 'Doe',
  gender: 'Male',
  department: 'IT',
  dob: new Date()
};

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeesSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      providers: [
        { provide: EmployeeService, useClass: EmployeeServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeesSpy = spyOn(TestBed.inject(EmployeeService), 'getEmployees').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch list of employees', () => {
    expect(employeesSpy).toHaveBeenCalled();
  });

  it('should display list of employees', () => {
    const count = fixture.debugElement.queryAll(By.css('.card.content')).length;
    expect(count).toBe(10);
  });

  it('should display appropiate message when no employees are there', () => {
    employeesSpy.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    
    const count = fixture.debugElement.queryAll(By.css('.card.content')).length;
    expect(count).toBe(0);
    expect(fixture.debugElement.query(By.css('#no-employee'))).toBeTruthy();
  });

});
