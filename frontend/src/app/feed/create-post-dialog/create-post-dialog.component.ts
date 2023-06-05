import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostRequestModel } from 'src/app/_models/post_models';
import { EducationalExperienceModel } from 'src/app/_models/profile_models';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css']
})
export class CreatePostDialogComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFileURL: string | ArrayBuffer | null = null;

  title = new FormControl('', [Validators.required]);
  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required]
  });

  name: string;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostRequestModel,
    private authService: AuthenticationService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.name =
      this.authService.getCurrentUser().user.first_name +
      ' ' +
      this.authService.getCurrentUser().user.last_name;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.previewSelectedFile();
    }
  }

  previewSelectedFile(): void {
    const reader = new FileReader();
    reader.onload = e => {
      this.selectedFileURL = e.target?.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  post(): void {
    let date = new Date();
    this.data.post_date = date.toISOString().split('T')[0];
    this.postService.addPost(this.data).subscribe(
      response => {
        this.toastr.success('Post created successfully');
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Something went wrong');
      }
    );
  }
}
