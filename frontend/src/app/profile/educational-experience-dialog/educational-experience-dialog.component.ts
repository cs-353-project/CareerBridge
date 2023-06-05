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
    // Convert dates to ISO format
    const a = new Date(this.data.experience.start_date);
    this.data.experience.start_date = a.toISOString().split('T')[0];
    const b = new Date(this.data.experience.end_date);
    this.data.experience.end_date = b.toISOString().split('T')[0];

    this.data.experience.current_status = 'Working'; // temp fix
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

  changeOngoing() {
    if (this.is_ongoing) {
      this.data.experience.end_date = '';
      this.end_date = 'Present';
    } else {
      this.end_date = 'End Date';
    }
  }
}
