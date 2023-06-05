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

  addVoluntaryExperience() {}
}
