import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LanguageProficiencyModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.css']
})
export class LanguageDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<LanguageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LanguageProficiencyModel
  ) {}

  ngOnInit(): void {}

  addLanguage() {
    if (!this.isErrorExists()) {
      this.profileService.addLanguage(this.data).subscribe(
        response => {
          this.toastr.success('Language added successfully');
          this.dialogRef.close(this.data);
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Error adding language');
        }
      );
    }
  }

  isErrorExists() {
    let flag = false;
    if (!this.data.language_name) {
      this.toastr.error('Language Name is required');
      flag = true;
    }
    if (!this.data.proficiency) {
      this.toastr.error('Proficiency is required');
      flag = true;
    }

    return flag;
  }
}
