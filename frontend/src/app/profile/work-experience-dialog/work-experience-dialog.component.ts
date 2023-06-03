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

  workExperienceStartDate: Date;
  workExperienceEndDate: Date;

  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<WorkExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkExperienceModel
  ) {}

  ngOnInit(): void {}

  addWorkExperience() {
    // Convert dates to ISO format
    const a = new Date(this.data.experience.start_date);
    this.data.experience.start_date = a.toISOString().split('T')[0];
    const b = new Date(this.data.experience.end_date);
    this.data.experience.end_date = b.toISOString().split('T')[0];

    this.data.experience.current_status = 'Working'; // temp fix

    this.profileService.addWorkExperience(this.data).subscribe(
      response => {
        this.toastr.success('Work experience added successfully');
        this.dialogRef.close();
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding work experience');
      }
    );
  }
}
