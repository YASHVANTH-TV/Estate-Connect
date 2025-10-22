import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuidler: FormBuilder, private router: Router, private authService: AuthService) { }

  loginForm: FormGroup;
  loginFormData: any;

  ngOnInit(): void {
    this.loginForm = this.formBuidler.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  incorrectPassword: boolean = false;

  login() {
    if (this.loginForm.valid) {
      this.loginFormData = this.loginForm.value;
      this.authService.login(this.loginFormData).subscribe((result) => {
        this.router.navigate(['/home']);
      }, (error) => {
        this.incorrectPassword = true;
        console.log(error);
      })
    }
  }
}