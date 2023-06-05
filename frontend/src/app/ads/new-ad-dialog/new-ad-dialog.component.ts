import { Component, Inject, OnInit } from '@angular/core';
import { JobAdvertisementRequestModel } from 'src/app/_models/job_ad_models';
import { JobAdService } from '../../_services/job_ad.service';

import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-ad-dialog',
  templateUrl: './new-ad-dialog.component.html',
  styleUrls: ['./new-ad-dialog.component.css']
})
export class NewAdDialogComponent implements OnInit {
  degrees: string;
  skills: string;

  constructor(
    private toastr: ToastrService,
    private jobAdService: JobAdService,
    public dialogRef: MatDialogRef<NewAdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobAdvertisementRequestModel
  ) {}

  ngOnInit(): void {}

  postAd() {
    const skillsList = this.skills.split(',');
    const degreesList = this.degrees.split(',');
    for (let i = 0; i < skillsList.length; i++) {
      this.data.skills.push({ skill_name: skillsList[i].trim() });
    }
    for (let i = 0; i < degreesList.length; i++) {
      this.data.required_degrees.push({ degree_name: degreesList[i].trim() });
    }

    this.data.is_open = true;
    console.log(this.data);
    this.jobAdService.addJobAd(this.data).subscribe(
      res => {
        this.toastr.success('Job Ad Posted Successfully');
        this.dialogRef.close();
      },
      err => {
        this.toastr.error('Error Occured');
        console.log(err);
      }
    );
  }
}
