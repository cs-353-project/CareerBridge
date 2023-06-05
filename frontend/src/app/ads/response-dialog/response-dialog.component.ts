import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JobAdService } from 'src/app/_services/job_ad.service';
import { Candidate } from 'src/app/view-ad-details/view-ad-details.component';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.css']
})
export class ResponseDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate,
    private adService: JobAdService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.adService
      .respondToCandidate(this.data.application_id, {
        response: this.data.status
      })
      .subscribe(
        res => {
          this.toastr.success('Response sent successfully');
          this.dialogRef.close(this.data.status);
        },
        err => {
          this.toastr.error('Error sending response');
        }
      );
  }
}
