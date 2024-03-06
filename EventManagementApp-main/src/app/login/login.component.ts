import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login(): void {
    // Simulate a backend authentication check
    if (this.isValidUser(this.username, this.password)) {
      // Navigate to the employee list page on successful login
      this.router.navigate(['/employee-list']);
    } else {
      // Handle login failure
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  }

  private isValidUser(username: string, password: string): boolean {
    // In a real application, you would make an API call to a server for authentication
    // For simplicity, let's hardcode valid credentials here
    const validUsername = 'admin';
    const validPassword = 'password';

    return username === validUsername && password === validPassword;
  }
}
