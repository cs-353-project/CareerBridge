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
  EducationalExperienceStartDate: Date;
  EducationalExperienceEndDate: Date;

  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<EducationalExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EducationalExperienceModel
  ) {}

  ngOnInit(): void {}
}
