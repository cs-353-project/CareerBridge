import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PolicyDialogComponent } from './policy-dialog/policy-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  requiredForm: FormGroup;
  hidePassword = true;
  hidePasswordConfirm: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  signUp() {
    /*
    if (this.requiredForm.valid) {
      this.authService.register(this.requiredForm.value).subscribe(
        (response: any) => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          const errorMsg = error.error ? error.error : error;
          this.toastr.error('Registration failed: ' + errorMsg);
        }
      );
    }
    */
  }

  buildForm() {
    this.requiredForm = this.formBuilder.group({
      //actorType: [ActorsEnum.Student.toString(), Validators.required],
      firstName: ['test', Validators.required],
      lastName: ['test', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.requiredForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.requiredForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  openPolicy() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(PolicyDialogComponent, dialogConfig);
  }
}
