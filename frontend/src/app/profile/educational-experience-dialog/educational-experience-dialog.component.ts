import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EducationalExperienceModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-educational-experience-dialog',
  templateUrl: './educational-experience-dialog.component.html',
  styleUrls: ['./educational-experience-dialog.component.css']
})
export class EducationalExperienceDialogComponent implements OnInit {
  is_ongoing = false;
  end_date = 'End Date';

  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<EducationalExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EducationalExperienceModel
  ) {}

  ngOnInit(): void {}

  addEducationalExperience() {
    if (!this.isErrorExists()) {
      const a = new Date(this.data.experience.start_date);
      this.data.experience.start_date = a.toISOString().split('T')[0];

      if (!this.data.experience.end_date && !this.is_ongoing) {
        this.toastr.error('End Date is required if not ongoing');
        return;
      }
      if (this.is_ongoing) {
        this.data.experience.end_date = new Date().toISOString().split('T')[0];
        this.data.experience.current_status = 'Working';
      } else {
        const b = new Date(this.data.experience.end_date);
        this.data.experience.end_date = b.toISOString().split('T')[0];
        this.data.experience.current_status = 'Past Working Experience';
      }
      console.log(this.data);
      this.profileService.addEducationalExperience(this.data).subscribe(
        response => {
          this.toastr.success('Educational experience added successfully');
          this.dialogRef.close(this.data);
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Error adding educational experience');
        }
      );
    }
  }

  changeOngoing() {
    if (this.is_ongoing) {
      this.data.experience.end_date = '';
      this.end_date = 'Present';
    } else {
      this.end_date = 'End Date';
    }
  }

  isErrorExists() {
    let flag = false;

    if (!this.data.experience.title) {
      this.toastr.error('Title is required');
      flag = true;
    }
    if (!this.data.school_name) {
      this.toastr.error('School Name is required');
      flag = true;
    }
    if (!this.data.field_of_study) {
      this.toastr.error('Field of Study is required');
      flag = true;
    }
    if (!this.data.degree.name) {
      this.toastr.error('Degree is required');
      flag = true;
    }
    if (!this.data.experience.start_date) {
      this.toastr.error('Start Date is required');
      flag = true;
    }
    return flag;
  }
}
