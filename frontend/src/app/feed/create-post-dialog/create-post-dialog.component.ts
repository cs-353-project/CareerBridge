import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css']
})
export class CreatePostDialogComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFileURL: string | ArrayBuffer | null = null;

  title_text: string;
  description_text: string;

  title = new FormControl('', [Validators.required]);
  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

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
    console.log(this.title_text);
    console.log(this.description_text);
    console.log(this.selectedFile);
  }
}
