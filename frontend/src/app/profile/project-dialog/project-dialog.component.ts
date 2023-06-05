import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel
  ) {}

  ngOnInit(): void {}

  addProject() {
    if (!this.isErrorExists()) {
      // Convert dates to ISO format
      const a = new Date(this.data.start_date);
      this.data.start_date = a.toISOString().split('T')[0];
      const b = new Date(this.data.end_date);
      this.data.end_date = b.toISOString().split('T')[0];

      console.log(this.data);
      this.profileService.addProject(this.data).subscribe(
        response => {
          this.toastr.success('Project added successfully');
          this.dialogRef.close(this.data);
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Error adding project');
        }
      );
    }
  }

  isErrorExists() {
    let flag = false;
    if (!this.data.title) {
      this.toastr.error('Title is required');
      flag = true;
    }
    if (!this.data.project_url) {
      this.toastr.error('Project URL is required');
      flag = true;
    }
    if (!this.data.start_date) {
      this.toastr.error('Start Date is required');
      flag = true;
    }
    if (!this.data.end_date) {
      this.toastr.error('End Date is required');
      flag = true;
    }

    return flag;
  }
}
