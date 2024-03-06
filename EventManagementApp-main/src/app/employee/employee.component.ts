import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,private router:Router) { }

  saveEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe();
    this.router.navigate(['/employee-list']);
    console.log(this.employee.id)
  }
}