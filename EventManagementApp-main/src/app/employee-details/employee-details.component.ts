import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})export class EmployeeDetailsComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  employeeId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.employeeId;
    this.initForm();

    if (this.isEditMode) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (employee) => {
          this.employeeForm.patchValue(employee);
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    }
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      id: [null],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }


 

  saveEmployee(): void {
    const employeeData = this.employeeForm.value;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employeeData).subscribe(
        () => {
          console.log('Employee updated successfully.');
          this.router.navigate(['/employee-list']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(
        () => {
          console.log('Employee added successfully.');
          this.router.navigate(['/employee-list']);
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

 
}