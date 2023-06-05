import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkExperienceModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-work-experience-dialog',
  templateUrl: './work-experience-dialog.component.html',
  styleUrls: ['./work-experience-dialog.component.css']
})
export class WorkExperienceDialogComponent implements OnInit {
  userName: string;

  is_ongoing = false;
  end_date = 'End Date';

  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<WorkExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkExperienceModel
  ) {}

  ngOnInit(): void {}

  addWorkExperience() {
    // Convert dates to ISO format
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
      this.profileService.addWorkExperience(this.data).subscribe(
        response => {
          this.toastr.success('Work experience added successfully');
          this.dialogRef.close(this.data);
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Error adding work experience');
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
    if (!this.data.company_name) {
      this.toastr.error('Company is required');
      flag = true;
    }
    if (!this.data.setting) {
      this.toastr.error('Setting is required');
      flag = true;
    }
    if (!this.data.type) {
      this.toastr.error('Type is required');
      flag = true;
    }
    if (!this.data.experience.start_date) {
      this.toastr.error('Start Date is required');
      flag = true;
    }
    return flag;
  }
}
