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
    console.log('login');
  }

  goForgotPassword() {
    // this.currentScene = AppScene.ForgotPassword;
    // this.currentSceneChange.emit(this.currentScene);
  }

  goSignUp() {
    this.router.navigate(['/signup']);
  }
}
