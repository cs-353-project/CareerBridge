import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
    console.log(this.rememberMe)
    console.log('login');
  }

  goForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goSignUp() {
    this.router.navigate(['/signup']);
  }

  rememberMeToggle(){
    this.rememberMe = !this.rememberMe;
  }
}
