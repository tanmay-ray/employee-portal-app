import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  loading = true;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees()
      .pipe(finalize(() => this.loading = false))
      .subscribe(employees => this.employees = employees);
  }

}
