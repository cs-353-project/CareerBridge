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
    console.log(this.data);
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
