import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AwardModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-award-dialog',
  templateUrl: './award-dialog.component.html',
  styleUrls: ['./award-dialog.component.css']
})
export class AwardDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<AwardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AwardModel
  ) {}

  ngOnInit(): void {}

  addAward() {
    // Convert dates to ISO format
    const a = new Date(this.data.issue_date);
    this.data.issue_date = a.toISOString().split('T')[0];

    this.profileService.addAward(this.data).subscribe(
      response => {
        this.toastr.success('Award added successfully');
        this.dialogRef.close(this.data);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding award');
      }
    );
  }
}
