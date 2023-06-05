import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestScoreModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-test-score-dialog',
  templateUrl: './test-score-dialog.component.html',
  styleUrls: ['./test-score-dialog.component.css']
})
export class TestScoreDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<TestScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TestScoreModel
  ) {}

  ngOnInit(): void {}

  addTestScore() {
    if (!this.isErrorExists()) {
      // Convert dates to ISO format
      const a = new Date(this.data.test_date);
      this.data.test_date = a.toISOString().split('T')[0];

      this.profileService.addTestScore(this.data).subscribe(
        response => {
          this.toastr.success('Test score added successfully');
          this.dialogRef.close(this.data);
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Error adding test score');
        }
      );
    }
  }

  isErrorExists() {
    let flag = false;
    if (!this.data.test_name) {
      this.toastr.error('Test Name is required');
      flag = true;
    }
    if (!this.data.score) {
      this.toastr.error('Score is required');
      flag = true;
    }
    if (!this.data.test_date) {
      this.toastr.error('Test Date is required');
      flag = true;
    }

    return flag;
  }
}
