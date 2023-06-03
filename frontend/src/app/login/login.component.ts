import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  requiredForm: FormGroup;
  loading = false;
  hidePassword = true;
  rememberMe = false;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.requiredForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.loading = true;
    if (this.requiredForm.valid) {
      this.authenticationService
        .login(this.requiredForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.success('Login successful');
            this.router.navigate(['/feed']);
          },
          error => {
            this.toastr.error('Login failed');
            this.loading = false;
          }
        );
    }
  }

  goForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goSignUp() {
    this.router.navigate(['/signup']);
  }

  rememberMeToggle() {
    this.rememberMe = !this.rememberMe;
  }
}
