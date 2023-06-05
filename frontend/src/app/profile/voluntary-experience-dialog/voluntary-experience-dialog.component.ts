import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EducationalExperienceModel,
  VoluntaryExperienceModel
} from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-voluntary-experience-dialog',
  templateUrl: './voluntary-experience-dialog.component.html',
  styleUrls: ['./voluntary-experience-dialog.component.css']
})
export class VoluntaryExperienceDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<VoluntaryExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VoluntaryExperienceModel
  ) {}

  ngOnInit(): void {}

  addVoluntaryExperience() {
    // Convert dates to ISO format
    const a = new Date(this.data.experience.start_date);
    this.data.experience.start_date = a.toISOString().split('T')[0];
    const b = new Date(this.data.experience.end_date);
    this.data.experience.end_date = b.toISOString().split('T')[0];

    this.data.experience.current_status = 'Working'; // temp fix
    console.log(this.data);
    this.profileService.addVoluntaryExperience(this.data).subscribe(
      response => {
        this.toastr.success('Voluntary experience added successfully');
        this.dialogRef.close(this.data);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding voluntary experience');
      }
    );
  }
}
