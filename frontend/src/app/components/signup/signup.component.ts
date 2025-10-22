import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value.password;
  const confirmPassword = control.value.confirmPassword;
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  isSubmitted: boolean = false;
  successMessage = ''
  errorMessage = '';

  signup() {
    if (this.signupForm.valid) {
      const role = this.signupForm.get('role')?.value;

      this.authService.register(this.signupForm.value).subscribe(
        (result) => {
          console.log(this.signupForm.value);
          if (role === 'ADMIN') {
            this.successMessage = 'Admin Registration is Successful!';
          } else {
            this.successMessage = 'User Registration is Successful!';
          }
          this.isSubmitted = true;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage = 'User with this email already exists.';
            console.log(this.errorMessage);

          } else if (error.status === 400) {
            this.errorMessage = 'Bad request. Please check your input.';
          } else if (error.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please try again later.';
          } else {
            this.errorMessage =
              error.error?.message || 'Registration failed. Please try again.';
          }
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}