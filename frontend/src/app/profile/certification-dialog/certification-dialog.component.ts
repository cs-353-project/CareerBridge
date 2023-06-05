import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CertificationModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-certification-dialog',
  templateUrl: './certification-dialog.component.html',
  styleUrls: ['./certification-dialog.component.css']
})
export class CertificationDialogComponent implements OnInit {
  is_expirable = false;
  expiration_date = 'End Date';
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<CertificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CertificationModel
  ) {}

  ngOnInit(): void {}

  addCertification() {
    // Convert dates to ISO format
    const a = new Date(this.data.issue_date);
    this.data.issue_date = a.toISOString().split('T')[0];
    const b = new Date(this.data.expiration_date);
    this.data.expiration_date = b.toISOString().split('T')[0];

    this.profileService.addCertification(this.data).subscribe(
      response => {
        this.toastr.success('Certificate added successfully');
        this.dialogRef.close(this.data);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding certificate');
      }
    );
  }

  changeExpirable() {
    if (this.is_expirable) {
      this.data.expiration_date = '';
      this.expiration_date = 'Not Expirable';
    } else {
      this.expiration_date = 'Expiration Date';
    }
  }
}
