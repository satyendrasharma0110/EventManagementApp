import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: any[] = [];


  constructor(private employeeService: EmployeeService,private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  viewEmployee(id: number): void {
    // Implement logic to navigate to the employee details page
    // You may use router.navigate(['/employee-details', id]) for this
    this.router.navigate(['/employee-details',id])
    console.log('View Employee with ID:', id);
  }


  deleteEmployee(id: number): void {
       this.employeeService.deleteEmployee(id).subscribe(
      () => {
        console.log('Employee deleted successfully.');
        this.fetchEmployees();
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}