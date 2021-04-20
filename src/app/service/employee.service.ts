import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  register(employee: Employee) {
    const url = `${this.baseUrl}/employee-service/employee`;
    return this.httpClient.post<Employee>(url, employee);
  }

  getEmployees() {
    const url = `${this.baseUrl}/employee-service/employees`;
    return this.httpClient.get<Employee[]>(url);
  }
}
