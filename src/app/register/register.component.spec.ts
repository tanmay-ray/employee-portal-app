import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

import { RegisterComponent } from './register.component';

class EmployeeServiceMock {
  register(employee: Employee) { return of({}); }
}

const mockEmployee = {
  firstName: 'John',
  lastName: 'Doe',
  gender: 'Male',
  department: 'IT',
  dob: new Date()
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let createEmployeeSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: EmployeeService, useClass: EmployeeServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    createEmployeeSpy = spyOn(TestBed.inject(EmployeeService), 'register').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise register form', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should be able to reset success alert flag', () => {
    component.success = true;
    component.resetFlags();
    expect(component.success).toBeFalse();
  });

  it('should be able to reset failure alert flag', () => {
    component.error = true;
    component.resetFlags();
    expect(component.error).toBeFalse();
  });

  it('should be able to create employee', () => {
    component.registerForm.setValue(mockEmployee);
    component.createEmployee();
    expect(createEmployeeSpy).toHaveBeenCalledWith(mockEmployee);
  });

  describe('Employee creation success', () => {
    beforeEach(() => {
      component.registerForm.setValue(mockEmployee);
    });

    it('should display success message on employee creation', () => {
      component.createEmployee();
      expect(component.success).toBeTrue();
    });

    it('should clear registration form on employee creation', () => {
      component.createEmployee();
      expect(component.registerForm.value).toEqual({
        firstName: null,
        lastName: null,
        gender: null,
        department: null,
        dob: null
      });
    });

    it('should clear previous failure alert, if present, on employee creation', () => {
      component.success = false;
      component.error = true;
      component.createEmployee();
      expect(component.error).toBeFalse();
      expect(component.success).toBeTrue();
    });

  });

  describe('Employee creation failure', () => {
    beforeEach(() => {
      component.registerForm.setValue(mockEmployee);
      createEmployeeSpy.and.returnValue(throwError('error'));
    });

    it('should display error message on employee creation failure', () => {
      component.createEmployee();
      expect(component.error).toBeTrue();
    });

    it('should not clear registration form on employee creation failure', () => {
      component.createEmployee();
      expect(component.registerForm.value).toEqual(mockEmployee);
    });

    it('should clear previous success alert, if present, on employee creation failure', () => {
      component.success = true;
      component.error = false;
      component.createEmployee();
      expect(component.error).toBeTrue();
      expect(component.success).toBeFalse();
    });

  });

});
