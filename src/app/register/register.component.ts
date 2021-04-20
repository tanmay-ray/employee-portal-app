import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  success = false;
  error = false;
  loading = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  createEmployee() {
    this.loading = true;
    this.resetFlags();
    const employee: Employee = this.registerForm.value;
    
    this.employeeService.register(employee)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        () => { this.success = true; this.registerForm.reset({}); },
        () => { this.error = true; }
      );
  }

  resetFlags() {
    this.success = this.error = false;
  }

}
